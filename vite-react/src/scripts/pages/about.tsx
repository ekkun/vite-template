/**
 * About
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from '../components/Button';

const initAbout = () => {
  const obj = { a: 'これが出力されれば', b: 'Babelを通じて' };
  const newObj = { ...obj, c: '正常に変換されてます' };
  console.log('about.ts 動いてます', newObj);
};
export { initAbout };

const aboutButton = () => {
  const buttonEl = document.getElementById('button');
  if (buttonEl) {
    ReactDOM.createRoot(buttonEl).render(
      <React.StrictMode>
        <Button />
      </React.StrictMode>
    );
  }
};
export { aboutButton };
