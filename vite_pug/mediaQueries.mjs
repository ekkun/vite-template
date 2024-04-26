import postcss from 'postcss';
import fs from 'fs-extra';
import path from 'path';

const modifyMediaQueries = postcss.plugin('modify-media-queries', () => {
  return (root) => {
    root.walkAtRules('media', (rule) => {
      const params = rule.params;
      if (!params.includes('print, screen and (')) {
        const newParams = params.replace(/screen\s+and\s+\(/g, 'print, screen and (');
        rule.params = newParams;
      }
    });
  };
});

const inputDir = './dist/assets/css';

fs.readdirSync(inputDir).forEach((file) => {
  if (file.endsWith('.css')) {
    const filePath = path.join(inputDir, file);

    const css = fs.readFileSync(filePath, 'utf8');

    postcss([modifyMediaQueries])
      .process(css, { from: filePath, to: filePath })
      .then((result) => {
        fs.writeFileSync(filePath, result.css);
      });
  }
});
