# Vite + React Template

React、TypeScript、Sassでサイトを作るテンプレートです。

## 必要な環境

- Node.js `^20.19.0 || >=22.12.0`
- pnpm `10.32.1`

## 開始

```sh
pnpm install
pnpm dev
```

<http://localhost:5173> を開きます。開発中は`dist`へ出力しません。

## コマンド

| コマンド | 結果 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動する |
| `pnpm build` | 公開用ファイルを`dist`へ生成する |
| `pnpm preview` | <http://localhost:8080> でビルド結果を確認する |
| `pnpm lint` | TypeScriptとReactコードを検査する |
| `pnpm test` | 共通要件を検査する |

## 主なディレクトリ

```text
src/                 編集するソース
  scripts/           React / TypeScript
  styles/            Sass
  public/            そのままコピーするファイル
dist/                pnpm buildの出力
vite.config.ts       Vite設定
```

共通仕様は[要件定義](../REQUIREMENTS.md)を参照してください。

## ディレクトリ構成

```text
vite-react/
├── src/
│   ├── about/          # Aboutページ
│   ├── react/          # Reactサンプルページ
│   ├── scripts/        # React / TypeScript
│   ├── styles/         # Sass
│   ├── public/         # そのままコピーするファイル
│   └── index.html      # トップページ
├── eslint.config.mjs   # lint設定
├── postcss.config.mjs  # CSS処理設定
├── tsconfig.json       # TypeScript設定
├── vite.config.ts      # Vite設定
└── package.json        # コマンドと依存関係
```
