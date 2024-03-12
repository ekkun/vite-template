/**
 * TEST
 */
import $ from 'jquery';
//import $ from 'https://esm.sh/jquery@3.7.1';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    modernFunction();
  });

  // Babelで変換されるかどうかのテストコード
  const modernFunction = () => {
    const obj = { a: 'これが出力されれば', b: 'Babelを通じて' };
    const newObj = { ...obj, c: '正常に変換されてます' };
    console.log('Index.jsを読み込んでいます', newObj);
  };

  // jQuery
  console.info($('header'), $('main'), $('footer'));
})();
