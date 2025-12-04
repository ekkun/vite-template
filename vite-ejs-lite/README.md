# Vite + EJS Lite Template

Vite + ejs + Sass + Babel を使用したビルドツールのスターターキット。

(macOS 26.1 / node v25.2.1 / pnpm v10.24.0 / Yarn v4.12.0 / 検証済み)

- html, ejs -> html
- Sass -> css
- Babel -> js

## パッケージをインストール

プロジェクトのディレクトリに移動して実行

```
$ pnpm install / yarn install
```

### VS Code 用 SDK のセットアップ (Yarn PnP)

Yarn Plug’n’Play (PnP) 環境で VS Code が Prettier や TypeScript などの開発ツールを正しく認識できるように、.yarn/sdks/ 以下に必要な SDK ファイルを生成します。  
これにより、補完・フォーマット・Lint などのエディタ連携がスムーズになります。  
(※ VS Code バージョン 1.77 以降推奨)

```
$ yarn dlx @yarnpkg/sdks vscode
```

## Vite の監視

監視開始
ローカルサーバーが立ち上がり確認可能（[localhost:4000](http://localhost:4000)）  
/dist/ には書き出されないので注意

```
$ pnpm start / yarn start
```

## 開発用ファイル生成

開発用のファイル一式を生成

```
$ pnpm dev / yarn dev
```

## Vite のプレビュー

公開用ファイルの確認
ローカルサーバーが立ち上がり確認可能（[localhost:8080](http://localhost:8080)）  
/dist/ には書き出されないので注意

```
$ pnpm preview / yarn preview
```

## 納品／アップロード用ファイル生成

公開用ファイル一式を生成

```
$ pnpm build / yarn build
```

## EJS 設定

設定用の EJS に初期の値を入力してください

```
./src/_templates/_config.ejs
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
├─ .babelrc
├─ .env.development
├─ .env.production
├─ .env.watch
├─ .gitignore
├─ .prettierrc
├─ htmlBeautify.mjs
├─ mediaQueries.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
└─ vite.config.js
```

## 再インストール

`yarn` でエラーが出た場合は再インストールをしてください。

```
$ rm -rf node_modules
$ pnpm cache clean / yarn cache clean
$ pnpm install / yarn install
```
