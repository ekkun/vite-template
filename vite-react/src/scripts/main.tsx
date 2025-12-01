// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components
import { Main } from './components/Main';

// Pages
import { initAbout, aboutButton } from './pages/about';
import { initReact } from './pages/react';

const body = document.body;
const page = body.dataset.page;

// index ページ用
if (page === 'index') {
  const el = document.getElementById('message');
  if (el) el.textContent = 'Hello from index page!';
  console.log('Index page script');
}

// about ページ用
if (page === 'about') {
  console.log('About page script');

  // DOM はもう読み込み済み想定なので、直接 initAbout を呼ぶ
  /*import('./pages/about').then(({ initAbout }) => {
    initAbout();
  });*/
  initAbout();
  aboutButton();
}

// react ページ用
if (page === 'react') {
  console.log('React page script');
  const mainEl = document.getElementById('main');
  if (mainEl) {
    ReactDOM.createRoot(mainEl).render(
      <React.StrictMode>
        <Main />
      </React.StrictMode>
    );
  }

  initReact();
}
