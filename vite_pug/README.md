# Vite + Pug Template

Vite + Pug + Sass + Babel を使用したビルドツールのスターターキット。

(macOS14.2.1 / node v18.19.0 / npm v8.19.4 検証済み)

- Pug -> html
- Sass -> css
- Babel -> js

## npm パッケージをインストール

プロジェクトのディレクトリに移動して実行

```
$ npm install
```

## Vite の監視

```
$ npm run dev
```

## 納品／アップロード用ファイル生成

ファイル一式を生成

```
$ npm run build
```

## ディレクトリ構成

```
├─ node_modules/
│  └─ パッケージ各種
│
├─ dist/ (ビルド後、納品ファイルがここに生成されます)
│  ├─ assets/
│  │  ├─ css/
│  │  ├─ fonts/
│  │  ├─ images/
│  │  └─ js/
│  └─ index.html 他、ファイル、ディレクトリ群...
│
├─ src/（ソース）
│  ├─ _templates/
│  ├─ about/
│  ├─ js/
│  ├─ news/
│  ├─ public/ (静的ファイル一式はコピーされます)
│  ├─ scss/
│  └─ index.pug
│
├─ plugins/（プラグイン）
│  ├─ vite-plugin-pug-build.ts
│  ├─ vite-plugin-pug-serve.ts
│  └─ vite-plugin-pug.ts
│
├─ .eslintrc.js
├─ .jsbeautifyrc
├─ babel.babelrc
├─ package.json
├─ postcss.config.js
├─ README.md
├─ tailwind.config.js
└─ vite.config.js
```

## 再インストール

`npm` でエラーが出た場合は再インストールをしてください。

```
$ rm -rf node_modules
$ npm cache clean --force
$ npm install
```

## 参考 <!-- Reference -->

- [Vite で純粋な Pug を使う](https://zenn.dev/yend724/articles/20220408-tfq16buha8ctdzp7)
- [Vite で Pug + Sass の静的 Web 開発環境を整えた](https://zenn.dev/sutobu000/articles/fef3959195cda5)
