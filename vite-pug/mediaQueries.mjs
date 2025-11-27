import postcss from 'postcss';
import fs from 'fs-extra';
import path from 'path';

const modifyMediaQueries = () => {
  return {
    postcssPlugin: 'modify-media-queries',
    AtRule: {
      media: (atRule) => {
        const params = atRule.params;
        if (!params.includes('print, screen and (')) {
          const newParams = params.replace(/screen\s+and\s+\(/g, 'print, screen and (');
          atRule.params = newParams;
        }
      }
    }
  };
};
modifyMediaQueries.postcss = true;

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
