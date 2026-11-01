// Writes dist/: the home page plus one pre-rendered HTML file per page (dist/<key>/index.html),
// so every page has its own address, title and description that search engines can read without JavaScript.
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const { PAGES, pageHTML } = createRequire(import.meta.url)('../pages.js');
const SITE = (process.env.URL || '').replace(/\/$/, ''); // Netlify sets URL to the site's primary address
const NOINDEX = new Set(['login', 'signup']);
const OG_IMAGE = 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&h=630&q=80';
const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const src = readFileSync('index.html', 'utf8');
const homeTitle = src.match(/<title>([^<]*)<\/title>/)[1];
const homeDesc = src.match(/<meta name="description" content="([^"]*)"/)[1];

function swap(html, from, to) {
  assert(typeof from === 'string' ? html.includes(from) : from.test(html), `index.html is missing: ${from}`);
  return html.replace(from, to);
}

function render(path, title, desc, body, noindex) {
  let html = src;
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${attr(title)}</title>`);
  html = swap(html, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${attr(desc)}"`);
  html = swap(html, '</head>', [
    `<link rel="canonical" href="${SITE}${path}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:site_name" content="이화국제결혼" />`,
    `<meta property="og:title" content="${attr(title)}" />`,
    `<meta property="og:description" content="${attr(desc)}" />`,
    `<meta property="og:url" content="${SITE}${path}" />`,
    `<meta property="og:image" content="${attr(OG_IMAGE)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : '',
    '</head>',
  ].filter(Boolean).join('\n'));
  if (body) {
    // Subpages carry only their own content, not a hidden copy of the home page.
    html = swap(html, /<main id="home">[\s\S]*?<\/main>\s*<main id="sub" hidden><\/main>/,
      `<main id="home" hidden></main>\n\n  <main id="sub">${body}</main>`);
  }
  return html;
}

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
writeFileSync('dist/index.html', render('/', homeTitle, homeDesc));
copyFileSync('pages.js', 'dist/pages.js');

const keys = Object.keys(PAGES);
for (const key of keys) {
  const p = PAGES[key];
  const html = render(`/${key}/`, `${p.title} | 이화국제결혼`, p.lead, pageHTML(key), NOINDEX.has(key));
  assert(html.includes('<h1>') && !html.includes('id="home">'), `page ${key} did not render`);
  mkdirSync(`dist/${key}`);
  writeFileSync(`dist/${key}/index.html`, html);
}

const listed = ['/', ...keys.filter(k => !NOINDEX.has(k)).map(k => `/${k}/`)];
writeFileSync('dist/sitemap.xml', [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...listed.map(path => `  <url><loc>${SITE}${path}</loc></url>`),
  '</urlset>',
  '',
].join('\n'));
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n${SITE ? `Sitemap: ${SITE}/sitemap.xml\n` : ''}`);

console.log(`Built ${keys.length + 1} pages into dist/ (${listed.length} in sitemap)${SITE ? ` for ${SITE}` : ' — set URL for absolute links'}`);
