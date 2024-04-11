# Vite + EJS Template

Vite + ejs + Sass + Babel を使用したビルドツールのスターターキット。

(macOS14.4.1 / node v21.6.2 / npm v10.5.0 / Yarn v4.1.1 / 検証済み)

- html, ejs -> html
- Sass -> css
- Babel -> js

## npm パッケージをインストール

プロジェクトのディレクトリに移動して実行

```
$ yarn install
```

## Vite の監視

```
$ yarn dev
```

## 納品／アップロード用ファイル生成

ファイル一式を生成

```
$ yarn build
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
├─ .yarnrc.yml
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
$ yarn cache clean --force
$ yarn install
```

## 参考 <!-- Reference -->

- [Vite と Docker にてシンプルな HTML(EJS)/CSS(Sass)/JS コーディング環境を構築する方法](https://qiita.com/soundweaver/items/78bd6a62263c397f43f5)
- [【詳細版】Vite でコーダーのコーディング環境（HTML（ejs ライク：ハンドルバー化）・Sass・JS）を作る](https://coding-memo.work/development/1274/)
