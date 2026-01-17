# Vite + Pug Template

Vite + Pug + Sass を使用したビルドツールのスターターキット。

(macOS 26.1 / node v25.2.1 / pnpm v10.24.0 / 検証済み)

- Pug -> html
- Sass -> css
- js -> js
- png -> png, webp
- jpg -> jpg, webp
- svg -> minify

## パッケージをインストール

プロジェクトのディレクトリに移動して実行

```
$ pnpm i
```

> [!WARNING]
> Windows 環境の方は必読ください！

### 🧯 Windows + sharp 使用時の注意

Windows 環境で `pnpm install` を実行すると、画像処理ライブラリ `sharp` に関するビルドエラーが発生する可能性があります。  
以下の手順で回避できます。

### sharp のエラー解決方法

`pnpm install` でコケるハズです  
そのため以下の設定をお願いします

[convertImage.mjs: 14行目をコメントアウト、15行目をコメント削除](https://github.com/ekkun/vite-template/blob/main/vite_pug/convertImage.mjs#L14-L15)

```JavaScript
//import sharp from 'sharp';
import sharp from '@img/sharp-win32-x64';
```

参照: [sharp のエラー解決方法](https://qiita.com/taqumo/items/d1ccae13739e6627f7b5)

### 画像ディレクトリを作成

監視時のテンポラリー画像ディレクトリを作成します

[createSymlink.mjs: ディレクトリ構成の変更は16行目、17行目のパス変更](https://github.com/ekkun/vite-template/blob/main/vite_pug/createSymlink.mjs#L16-L17)

```
$ pnpm symlink
```

## Vite の監視

監視開始
ローカルサーバーが立ち上がり確認可能（[localhost:4000](http://localhost:4000)）  
/dist/ には書き出されないので注意

```
$ pnpm dev
```

## 開発用ファイル生成

開発用のファイル一式を生成

```
$ pnpm build:dev
```

## Vite のプレビュー

公開用ファイルの確認
ローカルサーバーが立ち上がり確認可能（[localhost:8080](http://localhost:8080)）  
/dist/ には書き出されないので注意

```
$ pnpm preview
```

## 納品／アップロード用ファイル生成

公開用ファイル一式を生成

```
$ pnpm build:prod
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
$ pnpm images
```

<span style="font-size: x-small;">※ 画像追加、修正時にこのコマンドを実行してください。</span>

### 設定変更

各種設定 package.json の script に記載されています

- 画像が出力されるディレクトリを変更する場合はパスを変更してください
- webp 化の際に png, jpeg など元ファイルを出力しない場合はオプション `-m` を外してください
- webp 化を行わない場合はオプション `-w` を外してください

```JSON
"scripts": {
  "images:build": "node convertImage.mjs -i ./src/images -o ./dist/assets/images -m -w -t -v",
  "images:start": "node convertImage.mjs -i ./src/images -o ./src/public/assets/images -m -w -t -v",
}
```

## ディレクトリ構成

```
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
├─ plugins/（プラグイン）
│  ├─ vite-plugin-pug-build.ts
│  ├─ vite-plugin-pug-serve.ts
│  └─ vite-plugin-pug.ts
│
├─ src/（ソース）
│  ├─ _templates/
│  ├─ about/
│  ├─ images/ (画像ファイル一式はコピーされます)
│  ├─ js/
│  ├─ news/
│  ├─ public/ (画像以外の静的ファイル一式はコピーされます)
│  ├─ scss/
│  └─ index.pug
│
├─ temp/public/assets/images (監視時の画像ファイル一式がコピーされます)
│
├─ .env.development
├─ .env.production
├─ .env.watch
├─ .jsbeautifyrc
├─ .markuplintrc
├─ .ncurc.json
├─ .prettierrc.json
├─ convertImage.mjs
├─ createSymlink.mjs
├─ eslint.config.mjs
├─ postcss.config.mjs
├─ htmlBeautify.mjs
├─ mediaQueries.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.js
├─ processCssFiles.mjs
├─ README.md
├─ svgo.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## 再インストール

`pnpm` でエラーが出た場合は再インストールをしてください。

```
$ rm -rf node_modules
$ pnpm cache clean
$ pnpm install
```

## 参考 <!-- Reference -->

- [Vite で開発環境構築〜Pug・Sass・JS〜](https://yuito-blog.com/vite-develop/)
- [Vite で純粋な Pug を使う](https://zenn.dev/yend724/articles/20220408-tfq16buha8ctdzp7)
- [Vite で Pug + Sass の静的 Web 開発環境を整えた](https://zenn.dev/sutobu000/articles/fef3959195cda5)
