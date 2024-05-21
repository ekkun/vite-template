# Vite + EJS Template

Vite + ejs + Sass + Babel を使用したビルドツールのスターターキット。

(macOS14.4.1 / node v21.6.2 / Yarn v4.1.1 / 検証済み)

- html, ejs -> html
- Sass -> css
- Babel -> js
- png -> png, webp
- jpg -> jpg, webp
- svg -> minify

## パッケージをインストール

プロジェクトのディレクトリに移動して実行

```
$ yarn install
```

> [!WARNING]
> Windows 環境の方は必読ください！

### sharp のエラー解決方法

`yarn install` でコケるハズです  
そのため以下の設定をお願いします

<!--
[package.json: 61行目を削除](https://github.com/ekkun/vite-template/blob/main/vite_ejs/package.json#L61)

```
$ yarn add --dev @img/sharp-win32-x64
```
-->

[convertImage.mjs: 14行目をコメントアウト、15行目をコメント削除](https://github.com/ekkun/vite-template/blob/main/vite_ejs/convertImage.mjs#L14-L15)

```JavaScript
//import sharp from 'sharp';
import sharp from '@img/sharp-win32-x64';
```

参照: [sharp のエラー解決方法](https://qiita.com/taqumo/items/d1ccae13739e6627f7b5)

## Vite の監視

監視開始
ローカルサーバーが立ち上がり確認可能（[localhost:4000](http://localhost:4000)）  
/dist/ には書き出されないので注意

```
$ yarn start
```

## 開発用ファイル生成

開発用のファイル一式を生成

```
$ yarn dev
```

## Vite のプレビュー

公開用ファイルの確認
ローカルサーバーが立ち上がり確認可能（[localhost:8080](http://localhost:8080)）  
/dist/ には書き出されないので注意

```
$ yarn preview
```

## 納品／アップロード用ファイル生成

公開用ファイル一式を生成

```
$ yarn build
```

## EJS 設定

設定用の EJS に初期の値を入力してください

```
./src/_templates/_config.ejs
```

## 画像最適化＆webp 化

画像の画像最適化と webp 化を同時に実行します  
監視、公開用すべてのコマンドで実行します

```
$ yarn images
```

<span style="font-size: x-small;">※ 画像追加、修正時にこのコマンドを実行してください。</span>

### 設定変更

各種設定 package.json の script に記載されています

- 画像が出力されるディレクトリを変更する場合はパスを変更してください
- webp 化の際に png, jpeg など元ファイルを出力しない場合はオプション `-m` を外してください
- webp 化を行わない場合はオプション `-w` を外してください

```JSON
"scripts": {
  "images:build": "node convertImage.mjs -i ./src/public/assets/images -o ./dist/assets/images -m -v -t",
  "images:webp": "node convertImage.mjs -i ./src/public/assets/images -o ./src/public/assets/images -w",
}
```

## ディレクトリ構成

```
├─ .yarn/
│
├─ dist/ (ビルド後、納品ファイルがここに生成されます)
│  ├─ assets/
│  │  ├─ css/
│  │  ├─ fonts/
│  │  ├─ images/
│  │  └─ js/
│  └─ index.html 他、ファイル、ディレクトリ群...
│
├─ node_modules/
│  └─ パッケージ各種
│
├─ src/（ソース）
│  ├─ _templates/
│  ├─ about/
│  ├─ images/ (画像ファイル一式はコピーされます)
│  ├─ js/
│  ├─ news/
│  ├─ public/ (画像以外の静的ファイル一式はコピーされます)
│  ├─ scss/
│  └─ index.html
│
├─ .jsbeautifyrc
├─ .markuplintrc
├─ .prettierrc.json
├─ .yarnrc.yml
├─ babel.babelrc
├─ convertImage.mjs
├─ createSymlink.mjs
├─ eslint.config.mjs
├─ htmlBeautify.mjs
├─ package.json
├─ postcss.config.js
├─ README.md
├─ svgo.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## 再インストール

`yarn` でエラーが出た場合は再インストールをしてください。

```
$ rm -rf node_modules
$ yarn cache clean
$ yarn install
```

## 参考 <!-- Reference -->

- [Viteで開発環境構築〜Pug・Sass・JS〜](https://yuito-blog.com/vite-develop/)
- [Vite と Docker にてシンプルな HTML(EJS)/CSS(Sass)/JS コーディング環境を構築する方法](https://qiita.com/soundweaver/items/78bd6a62263c397f43f5)
- [【詳細版】Vite でコーダーのコーディング環境（HTML（ejs ライク：ハンドルバー化）・Sass・JS）を作る](https://coding-memo.work/development/1274/)
