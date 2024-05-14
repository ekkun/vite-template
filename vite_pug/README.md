# Vite + Pug Template

Vite + Pug + Sass + Babel を使用したビルドツールのスターターキット。

(macOS14.4.1 / node v21.6.2 / Yarn v4.1.1 / 検証済み)

- Pug -> html
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
[package.json: 61 行目を削除](https://github.com/ekkun/vite-template/blob/main/vite_pug/package.json#L61)

```
$ yarn add --dev @img/sharp-win32-x64
```
-->

[convertImage.mjs: 14行目をコメントアウト、15行目をコメント削除](https://github.com/ekkun/vite-template/blob/main/vite_pug/convertImage.mjs#L14-L15)

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
  "images": "node convertImage.mjs -i ./src/public/assets/images -o ./dist/assets/images -m -w -t -v",
}
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
├─ .yarnrc.yml
├─ babel.babelrc
├─ convertImage.mjs
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

- [Vite で開発環境構築〜Pug・Sass・JS〜](https://yuito-blog.com/vite-develop/)
- [Vite で純粋な Pug を使う](https://zenn.dev/yend724/articles/20220408-tfq16buha8ctdzp7)
- [Vite で Pug + Sass の静的 Web 開発環境を整えた](https://zenn.dev/sutobu000/articles/fef3959195cda5)
