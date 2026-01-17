import * as r from 'https://esm.sh/jquery@3.7.1';
function u(e, t = 300) {
  let n;
  return function (...c) {
    clearTimeout(n),
      (n = setTimeout(() => {
        e.apply(this, c);
      }, t));
  };
}
var s = u,
  i = !1,
  d = () => {
    if (i) return;
    const e = 375,
      t = document.querySelector('meta[name="viewport"]');
    if (!t) return;
    const n = (document.documentElement.clientWidth || window.innerWidth) < e ? `width=${e}, initial-scale=1` : 'width=device-width, initial-scale=1';
    t.getAttribute('content') !== n &&
      ((i = !0),
      t.setAttribute('content', n),
      setTimeout(() => {
        i = !1;
      }, 400));
  },
  a = s(d, 150);
window.addEventListener('resize', a, { passive: !0 });
window.addEventListener('orientationchange', a, !1);
d();
var o = r.default || r;
(() => {
  const e = () => {
    console.log('Index.jsを読み込んでいます', { a: 'これが出力されれば', b: 'Babelを通じて', c: '正常に変換されてます' });
  };
  document.addEventListener('DOMContentLoaded', () => {
    e();
  }),
    console.info(o('header'), o('main'), o('footer'));
})();
