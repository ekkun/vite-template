// 参照: https://qiita.com/y_hokkey/items/6d5fbab7e8123d6f5d53

import fs from 'fs-extra';
import { globSync } from 'glob';
import beautify from 'js-beautify';

// HTMLファイルを検索するディレクトリ
const targetDirs = ['./dist'];

// 整形オプション
// https://www.npmjs.com/package/js-beautify
const beautifyOptions = {
  indent_size: 2,
  end_with_newline: true,
  preserve_newlines: false,
  max_preserve_newlines: 0,
  wrap_line_length: 0,
  wrap_attributes_indent_size: 0,
  unformatted: ['b', 'em'],
};

// すべての HTML ファイルを検索する
const htmlFiles = targetDirs.flatMap((targetDir) => {
  return globSync('**/*.html', { cwd: targetDir }).map((file) => ({
    targetDir,
    file,
  }));
});

// HTMLファイルの整形と保存を並列で行う関数
const formatAndSaveHTML = async ({ targetDir, file }) => {
  const filePath = `${targetDir}/${file}`;
  try {
    const html = await fs.readFile(filePath, 'utf8');
    const result = beautify.html(html, beautifyOptions);
    await fs.writeFile(filePath, result, 'utf8');
    console.log(`${filePath} を整形して保存しました。`);
  } catch (error) {
    console.error(`${filePath} の整形と保存中にエラーが発生しました:`, error);
  }
};

// 全てのHTMLファイルの整形と保存を並列で行う
Promise.all(htmlFiles.map(formatAndSaveHTML))
  .then(() => {
    console.log('すべてのHTMLファイルの整形と保存が完了しました。');
  })
  .catch((error) => {
    console.error('エラーが発生しました:', error);
  });
