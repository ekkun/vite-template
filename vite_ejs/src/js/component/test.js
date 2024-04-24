/**
 * TEST
 */
import $ from 'jquery';
// import $ from 'https://esm.sh/jquery@3.7.1';

(() => {
  // Babelで変換されるかどうかのテストコード
  const modernFunction = () => {
    const obj = { a: 'これが出力されれば', b: 'Babelを通じて' };
    const newObj = { ...obj, c: '正常に変換されてます' };
    console.log('Index.jsを読み込んでいます', newObj);
  };

  document.addEventListener('DOMContentLoaded', () => {
    modernFunction();
  });

  // jQuery
  console.info($('header'), $('main'), $('footer'));
})();
