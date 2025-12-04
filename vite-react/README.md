# Vite + React Template

Vite + React + Sass + Babel を使用したビルドツールのスターターキット。

(macOS 26.1 / node v25.2.1 / pnpm v10.24.0 / Yarn v4.12.0 / 検証済み)

- HTML -> HTML
- SCSS (Sass) -> CSS
- JS / JSX / TS / TSX -> JS

## パッケージをインストール

プロジェクトのディレクトリに移動して実行

```
$ pnpm install / yarn install
```

## Vite の監視

監視開始
ローカルサーバーが立ち上がり確認可能（[localhost:4000](http://localhost:4000)）  
/dist/ には書き出されないので注意

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
│  ├─ about/index.html
│  ├─ public/
│  │  ├─ fonts/
│  │  └─ images/
│  ├─ react/index.html
│  ├─ scripts/
│  ├─ styles/
│  └─ index.html
│
├─ .babelrc
├─ eslint.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.cjs
├─ README.md
├─ tsconfig.json
├─ vite.config.ts
└─ yarn.lock
```
