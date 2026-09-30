import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const localWikiDir = path.resolve('./wiki');
const rawWikiDir = path.resolve('./wiki-raw');
const rawDir = fs.existsSync(localWikiDir) ? localWikiDir : rawWikiDir;
const contentDir = path.resolve('./src/content/wiki');
const destAssetsDir = path.resolve('./public/wiki-assets');

// Clear existing normalized files and assets to prevent stale content
if (fs.existsSync(contentDir)) {
  fs.rmSync(contentDir, { recursive: true, force: true });
}
if (fs.existsSync(destAssetsDir)) {
  fs.rmSync(destAssetsDir, { recursive: true, force: true });
}

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(destAssetsDir, { recursive: true });

let pagesProcessed = 0;
let linksConverted = 0;
let assetsCopied = 0;
const generatedSlugs = new Set();
const slugLookup = {};

function slugify(text) {
  return text
    .split('/')
    .map(part => part
      .toLowerCase()
      .replace(/[^a-z0-9\s-_]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    )
    .join('/');
}

// Recursively find files in a directory
function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap((entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? getFiles(res) : res;
  });
  return files;
}

// Copy all static assets first
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.pdf']);

function copyAssets() {
  if (!fs.existsSync(rawDir)) return;
  const allFiles = getFiles(rawDir);
  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.has(ext)) {
      const relativePath = path.relative(rawDir, file);
      const destPath = path.join(destAssetsDir, relativePath);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(file, destPath);
      assetsCopied++;
    }
  }
}

function isRelativeWikiLink(href) {
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('/')) {
    return false;
  }
  const ext = path.extname(href).toLowerCase();
  if (ext && ext !== '.md') {
    return false;
  }
  return true;
}

function resolveTargetSlug(target) {
  const targetSlug = slugify(target);
  const simplifiedTarget = targetSlug.replace(/[^a-z0-9/]/g, '');
  
  if (slugLookup[simplifiedTarget]) {
    return slugLookup[simplifiedTarget];
  }
  
  const keys = Object.keys(slugLookup);
  for (const key of keys) {
    if (key.endsWith(simplifiedTarget) || simplifiedTarget.endsWith(key)) {
      return slugLookup[key];
    }
  }
  
  return targetSlug;
}

// Build a meta description from the first real prose paragraph of the body.
// Skips headings, lists, tables, code fences, blockquotes, rules, and
// italic-only footer lines. Strips inline markdown only, so hyphenated words
// such as "open-source" and snake_case identifiers survive intact.
function stripInlineMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links, keep labels
    .replace(/`([^`]*)`/g, '$1') // inline code
    .replace(/(\*\*|__)(.+?)\1/g, '$2') // bold
    .replace(/(^|[\s(])[*_]([^*_\s][^*_]*?)[*_](?=[\s).,;:!?]|$)/g, '$1$2') // italics
    .replace(/<[^>]+>/g, '') // inline HTML
    .replace(/\s+/g, ' ')
    .trim();
}

function firstProseParagraph(content) {
  const blocks = content.split(/\n\s*\n/);
  let inFence = false;
  for (const raw of blocks) {
    const block = raw.trim();
    const fenceCount = (block.match(/^```/gm) || []).length;
    if (inFence) {
      if (fenceCount % 2 === 1) inFence = false;
      continue;
    }
    if (fenceCount % 2 === 1) { inFence = true; continue; }
    if (!block || fenceCount) continue;
    if (/^(#{1,6}\s|[-*+]\s|\d+[.)]\s|>|\||-{3,}|\*{3,}|_{3,}|<)/.test(block)) continue;
    if (/^[*_][^*_].*[*_]$/.test(block)) continue; // italic-only note
    const text = stripInlineMarkdown(block);
    if (text.length >= 20) return text;
  }
  return '';
}

// Pages whose body is only a list of links get a written description.
const coreDescriptions = {
  individuals: "Profiles of people who work in data and AI, from Alex Merced's Data & AI Wiki.",
};

function describeFromBody(content, title) {
  const plainText = firstProseParagraph(content);
  if (!plainText) return `${title}: a short definition from Alex Merced's Data & AI Wiki.`;
  if (plainText.length <= 165) return plainText;
  // Prefer whole sentences within ~165 chars; never cut mid-word.
  const sentences = plainText.split(/(?<=[.!?])\s+/);
  let out = sentences[0];
  for (const s of sentences.slice(1)) {
    if ((out + ' ' + s).length <= 165) out += ' ' + s;
    else break;
  }
  if (out.length > 170) {
    out = out.slice(0, 158).replace(/\s+\S*$/, '').replace(/[,;:]$/, '') + '…';
  }
  return out;
}

function processWiki() {
  if (!fs.existsSync(rawDir)) {
    console.error(`Error: Raw wiki directory not found at ${rawDir}. Run 'npm run sync:wiki' first.`);
    process.exit(1);
  }

  // Copy all assets
  copyAssets();

  const allFiles = getFiles(rawDir);
  const mdFiles = allFiles.filter(file => path.extname(file).toLowerCase() === '.md');

  // Build the lookup map for resolving relative wiki links
  for (const filePath of mdFiles) {
    const relativePath = path.relative(rawDir, filePath);
    if (path.basename(relativePath).startsWith('_')) continue;
    
    const pathWithoutExt = relativePath.slice(0, -3);
    const slug = slugify(pathWithoutExt);
    const simplifiedKey = pathWithoutExt.toLowerCase().replace(/[^a-z0-9/]/g, '');
    slugLookup[simplifiedKey] = slug;
  }

  const wikiPagesForLLM = [];

  for (const filePath of mdFiles) {
    const relativePath = path.relative(rawDir, filePath);
    if (path.basename(relativePath).startsWith('_')) {
      console.log(`Skipping special wiki file: ${relativePath}`);
      continue;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent);

    let title = parsed.data.title;
    let content = parsed.content;
    const h1Regex = /^#\s+(.+)$/m;
    const h1Match = content.match(h1Regex);
    
    if (!title) {
      if (h1Match) {
        title = h1Match[1].trim();
      } else {
        const basename = path.basename(filePath, '.md');
        title = basename
          .replace(/[-_]+/g, ' ')
          .trim()
          .replace(/\b\w/g, c => c.toUpperCase());
      }
    }

    if (h1Match) {
      content = content.replace(h1Regex, '').trim();
    }

    const pathWithoutExt = relativePath.slice(0, -3);
    const slug = slugify(pathWithoutExt);

    if (generatedSlugs.has(slug)) {
      console.warn(`Warning: Duplicate slug detected: "${slug}" for file "${relativePath}"`);
    } else {
      generatedSlugs.add(slug);
    }

    // Convert double-bracket wiki links: [[Page Name]] or [[Page Name|Custom Label]]
    content = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, target, label) => {
      const cleanTarget = target.trim();
      const cleanLabel = label ? label.trim() : cleanTarget;
      const targetSlug = resolveTargetSlug(cleanTarget);
      const href = targetSlug === 'home' ? '/wiki/' : `/wiki/${targetSlug}/`;
      linksConverted++;
      return `[${cleanLabel}](${href})`;
    });

    // Convert relative standard markdown links: [Label](RelativeURL)
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
      if (!isRelativeWikiLink(href)) {
        return match;
      }
      let target = href.trim();
      if (target.endsWith('.md')) {
        target = target.slice(0, -3);
      }
      const targetSlug = resolveTargetSlug(target);
      const newHref = targetSlug === 'home' ? '/wiki/' : `/wiki/${targetSlug}/`;
      linksConverted++;
      return `[${label}](${newHref})`;
    });

    // Resolve local relative images
    content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
      if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//') || src.startsWith('/')) {
        return match;
      }
      const dirOfFile = path.dirname(filePath);
      const absoluteImgPath = path.resolve(dirOfFile, src);
      if (fs.existsSync(absoluteImgPath)) {
        const relativeToWikiRaw = path.relative(rawDir, absoluteImgPath);
        return `![${alt}](/wiki-assets/${relativeToWikiRaw.replace(/\\/g, '/')})`;
      }
      return match;
    });

    let description = parsed.data.description || coreDescriptions[slug] || describeFromBody(content, title);

    const frontmatter = {
      ...parsed.data,
      title,
      description,
      sourceFile: relativePath,
      slug,
      updatedFromWiki: true
    };

    const destFilePath = path.join(contentDir, `${slug}.md`);
    fs.mkdirSync(path.dirname(destFilePath), { recursive: true });
    
    const output = matter.stringify(content, frontmatter);
    fs.writeFileSync(destFilePath, output, 'utf-8');

    // Add page details to the LLM index
    const coreSlugs = new Set(['home', 'terms', 'individuals', 'vendor-platforms']);
    if (!coreSlugs.has(slug)) {
      wikiPagesForLLM.push({
        title,
        slug,
        description,
        content
      });
    }

    pagesProcessed++;
  }

  // Sort articles alphabetically
  wikiPagesForLLM.sort((a, b) => a.title.localeCompare(b.title));

  // Write llms.txt
  let llmsTxt = `# Data & AI Wiki\n\n`;
  llmsTxt += `> Alex Merced's short-definition wiki for AI and data terms: agents, LLMs, retrieval, semantic layers, lakehouses, and the platforms around them. Each page gives a brief definition of one term. Long-form guides live on DataEngnr (https://dataengnr.com).\n\n`;
  llmsTxt += `## Core Pages\n\n`;
  llmsTxt += `- [Home](https://dataaiwiki.com/wiki/) - Main entry point and directory list.\n`;
  llmsTxt += `- [Terms](https://dataaiwiki.com/wiki/terms/) - Complete list of Data & AI terms.\n`;
  llmsTxt += `- [Individuals](https://dataaiwiki.com/wiki/individuals/) - Key individuals in the Data & AI space.\n`;
  llmsTxt += `- [Vendor Platforms](https://dataaiwiki.com/wiki/vendor-platforms/) - Overview of vendor platforms.\n\n`;
  llmsTxt += `## Wiki Articles\n\n`;

  for (const page of wikiPagesForLLM) {
    const cleanDesc = page.description.replace(/\s+/g, ' ').trim();
    llmsTxt += `- [${page.title}](https://dataaiwiki.com/wiki/${page.slug}/) - ${cleanDesc}\n`;
  }

  const publicDir = path.resolve('./public');
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');

  // Write llms-full.txt
  let llmsFullTxt = `# Data & AI Wiki - Full Contents\n\n`;
  llmsFullTxt += `This file contains the complete consolidated contents of the Data & AI Wiki.\n\n`;
  llmsFullTxt += `---\n\n`;

  for (const page of wikiPagesForLLM) {
    llmsFullTxt += `# ${page.title}\n`;
    llmsFullTxt += `URL: https://dataaiwiki.com/wiki/${page.slug}/\n`;
    llmsFullTxt += `Description: ${page.description}\n\n`;
    llmsFullTxt += `${page.content}\n\n`;
    llmsFullTxt += `---\n\n`;
  }

  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');

  console.log('\n--- Wiki Normalization Complete ---');
  console.log(`Pages processed: ${pagesProcessed}`);
  console.log(`Links converted: ${linksConverted}`);
  console.log(`Assets copied:   ${assetsCopied}`);
  console.log('-----------------------------------\n');
}

processWiki();
