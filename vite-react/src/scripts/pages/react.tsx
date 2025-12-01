/**
 * React
 */

const initReact = () => {
  const obj = { a: 'これが出力されれば', b: 'Babelを通じて' };
  const newObj = { ...obj, c: '正常に変換されてます' };

  console.log('react.ts 動いてます', newObj);
};

export { initReact };
