// Writes src/data/wiki-git-dates.json: first and last commit date for every
// file in the GitHub wiki, from full history. The build reads git directly
// when its wiki clone has full history and uses this snapshot only when it
// does not (see scripts/wiki-git-dates.mjs). Run `npm run dates` after the
// wiki changes and commit the result.
import { writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { SNAPSHOT, isFullClone, readGitHistory } from './wiki-git-dates.mjs';

const dir = ['./wiki', './wiki-raw'].map((d) => path.resolve(d)).find((d) => existsSync(d));
if (!dir || !isFullClone(dir)) {
  console.error('wiki-git-dates: no full wiki clone found. Run `npm run sync:wiki` first.');
  process.exit(1);
}
const files = readGitHistory(dir);
const sorted = Object.fromEntries(Object.keys(files).sort().map((k) => [k, files[k]]));
writeFileSync(SNAPSHOT, JSON.stringify({ generatedBy: 'scripts/build-wiki-git-dates.mjs', source: path.basename(dir), files: sorted }, null, 2) + '\n');
console.log(`wiki-git-dates: wrote ${Object.keys(sorted).length} entries from ${path.basename(dir)}`);
