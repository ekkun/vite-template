# Vite + Pug Template

Vite + Pug + Sass + Babel を使用したビルドツールのスターターキット。

(macOS14.4.1 / node v21.6.2 / npm v10.5.0 / Yarn v4.1.1 / 検証済み)

- Pug -> html
- Sass -> css
- Babel -> js
- png -> png, webp
- jpg -> jpg, webp
- svg -> minify

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

公開用ファイル一式を生成

```
$ yarn build
```

## 画像最適化＆webp 化

画像の画像最適化と webp 化を同時に実行します  
監視、公開用すべてのコマンドで実行します

```
$ yarn images
```

<span style="font-size: x-small;">※ 画像追加、修正時にこのコマンドを実行してください。</span>

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
├─ .yarnrc.yml
├─ babel.babelrc
├─ convertImage.mjs
├─ package.json
├─ postcss.config.js
├─ README.md
├─ tailwind.config.js
└─ vite.config.js
```

## 再インストール

`yarn` でエラーが出た場合は再インストールをしてください。

```
$ rm -rf node_modules
$ yarn cache clean --force
$ yarn install
```

## 参考 <!-- Reference -->

- [Vite で純粋な Pug を使う](https://zenn.dev/yend724/articles/20220408-tfq16buha8ctdzp7)
- [Vite で Pug + Sass の静的 Web 開発環境を整えた](https://zenn.dev/sutobu000/articles/fef3959195cda5)
