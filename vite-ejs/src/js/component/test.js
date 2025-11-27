/**
 * TEST
 */
import * as jQuery from 'jquery';
//import * as jQuery from 'https://esm.sh/jquery@3.7.1';
const $ = jQuery.default || jQuery;

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
