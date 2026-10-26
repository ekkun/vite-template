import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readProjectFile = (file) => readFile(path.join(root, file), 'utf8');

test('Astro 7を使い、共通ポートで静的HTMLを生成する', async () => {
  const packageJson = JSON.parse(await readProjectFile('package.json'));
  const config = await readProjectFile('astro.config.mjs');

  assert.match(packageJson.devDependencies.astro, /^\^7\./);
  assert.equal(packageJson.packageManager, 'pnpm@10.32.1');
  assert.equal(packageJson.engines.node, '>=22.23.4');
  assert.match(config, /output:\s*['"]static['"]/);
  assert.match(config, /format:\s*['"]preserve['"]/);
  assert.match(config, /server:\s*{[\s\S]*?port:\s*5173/);
  assert.match(config, /preview:\s*{[\s\S]*?port:\s*8080/);
  assert.match(config, /build:\s*{[\s\S]*?assets:\s*['"]assets['"]/);
  assert.match(config, /entryFileNames:\s*['"]assets\/js\/main\.js['"]/);
  assert.match(config, /chunkFileNames:\s*['"]assets\/js\/\[name\]\.js['"]/);
  assert.match(config, /['"]assets\/css\/style\.css['"]/);
});

test('HTML出力形式の選択方法を資料化する', async () => {
  const guide = await readProjectFile('docs/build-formats.md');

  assert.match(guide, /directory/);
  assert.match(guide, /file/);
  assert.match(guide, /preserve/);
  assert.match(guide, /company\/index\.astro/);
  assert.match(guide, /company\/message\.astro/);
  assert.match(guide, /company\/index\.html/);
  assert.match(guide, /company\/message\.html/);
  assert.match(guide, /このテンプレート.*preserve/s);
});

test('SCSSとJavaScriptはvite-ejs-liteの構成を継承する', async () => {
  const sourceRoot = path.resolve(root, '../vite-ejs-lite/src');
  const packageJson = JSON.parse(await readProjectFile('package.json'));
  const listFiles = async (directory, base = directory) => {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(
      entries
        .filter((entry) => entry.name !== '.DS_Store')
        .map((entry) => {
          const target = path.join(directory, entry.name);
          return entry.isDirectory() ? listFiles(target, base) : path.relative(base, target);
        })
    );
    return files.flat().sort();
  };

  for (const directory of ['scss', 'js']) {
    assert.deepEqual(await listFiles(path.join(root, 'src', directory)), await listFiles(path.join(sourceRoot, directory)));
  }

  assert.match(packageJson.dependencies['kiso.css'], /^\^1\./);

  const layout = await readProjectFile('src/layouts/BaseLayout.astro');
  assert.match(layout, /import ['"]\.\.\/scss\/style\.scss['"]/);
  assert.match(layout, /import ['"]\.\.\/js\/main\.js['"]/);
});

test('画像、PDF、フォントを種類別のassetsディレクトリへ出力する', async () => {
  const config = await readProjectFile('astro.config.mjs');
  const home = await readProjectFile('src/pages/index.astro');
  const homeStyle = await readProjectFile('src/scss/project/_home.scss');

  await Promise.all([
    access(path.join(root, 'src/assets/images/sample.png')),
    access(path.join(root, 'src/assets/pdf/sample.pdf')),
    access(path.join(root, 'src/assets/fonts/blank.woff2'))
  ]);

  assert.match(config, /assets\/images\/\[name\]\[extname\]/);
  assert.match(config, /assets\/pdf\/\[name\]\[extname\]/);
  assert.match(config, /assets\/fonts\/\[name\]\[extname\]/);
  assert.match(config, /assetsInlineLimit:\s*0/);
  assert.match(home, /sample\.png/);
  assert.match(home, /sample\.pdf\?url/);
  assert.match(homeStyle, /blank\.woff2/);
});

test('3ページが共通レイアウト、Header、Footerを使う', async () => {
  const pages = ['index.astro', 'about/index.astro', 'news/index.astro'];

  await Promise.all([
    access(path.join(root, 'src/components/Header.astro')),
    access(path.join(root, 'src/components/Footer.astro')),
    access(path.join(root, 'src/layouts/BaseLayout.astro'))
  ]);

  for (const page of pages) {
    const source = await readProjectFile(`src/pages/${page}`);
    assert.match(source, /import BaseLayout from/);
    assert.match(source, /<BaseLayout/);
  }
});

test('Headerは配列をmapしてナビゲーションを生成する', async () => {
  const header = await readProjectFile('src/components/Header.astro');

  assert.match(header, /navigation\.map/);
  assert.match(header, /href:\s*['"]\/about\/['"]/);
  assert.match(header, /href:\s*['"]\/news\/['"]/);
});
