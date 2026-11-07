const fs = require('node:fs');
const path = require('node:path');
let errors = 0;
for (const dir of ['.', 'dist']) {
  const pages = fs.readdirSync(dir).filter((file) => file.endsWith('.html'));
  for (const page of pages) {
    const html = fs.readFileSync(path.join(dir, page), 'utf8');
    if (html.includes('Swipe or use the arrows to explore. Images are illustrative; all itineraries are customisable.')) {
      errors++; console.error(`${dir}/${page}: old hint still present`);
    }
    for (const [, script] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
      if (!script.trim()) continue;
      try { new Function(script); } catch (error) { errors++; console.error(`${dir}/${page}: ${error.message}`); }
    }
    for (const [, ref] of html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)) {
      if (/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(ref)) continue;
      const target = ref.split(/[?#]/, 1)[0];
      if (target && !fs.existsSync(path.join(dir, target))) { errors++; console.error(`${dir}/${page}: missing ${target}`); }
    }
  }
  console.log(`${dir}: ${pages.length} pages checked`);
}
for (const page of ['index.html', 'destinations.html']) {
  const html = fs.readFileSync(page, 'utf8');
  const stripIds = [...html.matchAll(/<div class="travel-strip" id="([^"]+)"/g)].map((m) => m[1]);
  console.log(`${page}: strips ${stripIds.join(', ')}`);
}
console.log(errors ? `${errors} issue(s) found` : 'No old hint, local path, or inline script issues found.');
process.exitCode = errors ? 1 : 0;
