import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

const source = new URL('./', import.meta.url);
const output = new URL('./dist/', source);
const pageNames = ['index', 'about', 'academics', 'school-life', 'joining', 'resources', 'visit', 'staff'];
const assets = [
  'admin.html', 'admin-publish.js', 'content.js', 'site.js', 'styles.css', 'school-content.json',
  'school-crest.png', 'favicon.ico', 'lake-nakuru-group.webp',
  'lake-nakuru-students.webp', 'school-hero.webp', 'school-learning.webp',
];

const [header, footer] = await Promise.all(
  ['site-header.html', 'site-footer.html'].map(file => readFile(new URL(file, source), 'utf8')),
);
await mkdir(output, { recursive: true });

for (const name of pageNames) {
  const filename = name + '.html';
  const page = await readFile(new URL(filename, source), 'utf8');
  const activeHeader = header.replace(
    new RegExp(`(<a href="/${name}"[^>]*)(>)`),
    '$1 aria-current="page"$2',
  );
  const sections = { header: activeHeader, footer };
  for (const section of Object.keys(sections)) {
    if (page.split(`  <!-- shared:${section} -->`).length !== 2) {
      throw new Error(`${filename} requires one shared ${section} placeholder`);
    }
  }
  const html = page.replace(
    /^  <!-- shared:(header|footer) -->$/gm,
    (_, section) => sections[section].trimEnd(),
  );
  await writeFile(new URL(filename, output), html);
}

await Promise.all(assets.map(file => copyFile(new URL(file, source), new URL(file, output))));
