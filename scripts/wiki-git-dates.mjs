// Per-file dates for the cloned GitHub wiki, used for sitemap <lastmod>.
//
// The wiki is cloned at build time (npm run sync:wiki). With full history in
// that clone, dates come straight from git. If the clone is shallow or has no
// git data, fall back to src/data/wiki-git-dates.json, a snapshot committed by
// `npm run dates`. Files with no date in either source get no <lastmod>.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export const SNAPSHOT = path.resolve('./src/data/wiki-git-dates.json');

function git(dir, args) {
  return execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 }).trim();
}

/** Walk `git log` once; first and last commit dates per path, relative to the wiki root. */
export function readGitHistory(dir) {
  const out = git(dir, ['log', '--format=@%cI', '--name-only', '--no-renames']);
  const files = {};
  let date = null;
  for (const line of out.split('\n')) {
    if (line.startsWith('@')) { date = line.slice(1); continue; }
    if (!line || !date) continue;
    // Newest first: the first sighting is the last modification.
    const f = (files[line] ??= { modified: date, created: date });
    f.created = date;
  }
  return files;
}

export function isFullClone(dir) {
  try {
    return git(dir, ['rev-parse', '--show-toplevel']) === path.resolve(dir)
      && git(dir, ['rev-parse', '--is-shallow-repository']) === 'false';
  } catch {
    return false;
  }
}

export function wikiDates(dir) {
  if (isFullClone(dir)) return { source: 'git', files: readGitHistory(dir) };
  if (existsSync(SNAPSHOT)) return { source: 'snapshot', files: JSON.parse(readFileSync(SNAPSHOT, 'utf8')).files };
  return { source: 'none', files: {} };
}
