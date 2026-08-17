/**
 * Force every AdSense client ID to the real publisher ID.
 * Real: ca-pub-8332278519903196
 */
const fs = require('fs');
const path = require('path');

const REAL = 'ca-pub-8332278519903196';
const BAD = /ca-pub-83322785\d+/g;
const root = path.join(__dirname, '..');

let files = 0;
let hits = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      walk(p);
    } else if (/\.(html|js)$/.test(name)) {
      let text = fs.readFileSync(p, 'utf8');
      const matches = text.match(BAD);
      if (!matches) continue;
      const unique = [...new Set(matches)];
      if (unique.length === 1 && unique[0] === REAL) continue;
      const next = text.replace(BAD, REAL);
      if (next !== text) {
        fs.writeFileSync(p, next);
        files++;
        hits += matches.length;
        console.log(path.relative(root, p) + ':', unique.join(' | '), '=>', REAL);
      }
    }
  }
}

walk(root);
console.log('done —', files, 'files,', hits, 'replacements');
