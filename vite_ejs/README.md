# Vite + EJS Template

Vite + ejs + Sass + Babel を使用したビルドツールのスターターキット。

(macOS13.2.1 / node v18.19.0 / npm v8.19.4 検証済み)

- html, ejs -> html
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
│  └─ index.html
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

- [Vite と Docker にてシンプルな HTML(EJS)/CSS(Sass)/JS コーディング環境を構築する方法](https://qiita.com/soundweaver/items/78bd6a62263c397f43f5#%E5%87%BA%E5%8A%9B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%90%8D%E3%81%AA%E3%81%A9%E3%82%92%E9%96%8B%E7%99%BA%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AAsrc%E5%86%85%E3%81%AE%E3%82%82%E3%81%AE%E3%81%A8%E5%90%88%E3%82%8F%E3%81%9B%E3%82%8B%E8%A8%AD%E5%AE%9A)
- [【詳細版】Vite でコーダーのコーディング環境（HTML（ejs ライク：ハンドルバー化）・Sass・JS）を作る](https://coding-memo.work/development/1274/)
