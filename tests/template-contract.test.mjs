import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const templates = ['vite-react', 'vite-ejs-lite', 'vite-ejs', 'vite-pug'];
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const readProjectFile = (file) => readFile(path.join(root, file), 'utf8');
const readJson = async (file) => JSON.parse(await readProjectFile(file));

for (const template of templates) {
  test(`${template}: Vite 8と共通ツールチェーンを使う`, async () => {
    const packageJson = await readJson(`${template}/package.json`);

    assert.equal(packageJson.version, '1.5.0');
    assert.match(packageJson.devDependencies.vite, /^\^8\./);
    assert.equal(packageJson.packageManager, 'pnpm@10.32.1');
    assert.equal(packageJson.engines.node, '^20.19.0 || >=22.12.0');
    assert.match(packageJson.scripts.test, /node --test .*\.test\.mjs/);
  });

  test(`${template}: Vite 8の標準Oxc minifierを使う`, async () => {
    const packageJson = await readJson(`${template}/package.json`);
    const configName = template === 'vite-react' ? 'vite.config.ts' : 'vite.config.mjs';
    const config = await readProjectFile(`${template}/${configName}`);

    assert.equal(packageJson.devDependencies.esbuild, undefined);
    assert.doesNotMatch(config, /minify:\s*['"]esbuild['"]/);
    assert.doesNotMatch(config, /cssMinify:\s*['"]esbuild['"]/);
    assert.match(config, /server:\s*{[\s\S]*?port:\s*5173/);
  });
}

test('Pugは最終採用版に完全固定する', async () => {
  const packageJson = await readJson('vite-pug/package.json');
  const config = await readProjectFile('vite-pug/vite.config.mjs');
  const layout = await readProjectFile('vite-pug/src/_templates/_layout.pug');

  assert.equal(packageJson.devDependencies.pug, '3.0.4');
  assert.match(layout, /http:\/\/localhost:5173/);
});

test('ルート資料がVite 8と資料ファースト開発を定義する', async () => {
  const [readme, requirements, agents] = await Promise.all([
    readProjectFile('README.md'),
    readProjectFile('REQUIREMENTS.md'),
    readProjectFile('AGENTS.md'),
  ]);

  assert.match(readme, /Vite 8/);
  assert.match(requirements, /資料.*テスト.*実装.*整理/s);
  assert.match(agents, /実装より先に資料を更新/);
});
