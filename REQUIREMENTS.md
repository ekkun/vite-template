# Vite Template 要件定義

## 目的

用途に合うテンプレートを選び、迷わず静的サイトまたは React サイトの開発を始められる状態を保つ。

## 最初に読むこと

1. [README.md](./README.md) でテンプレートを選ぶ。
2. 選んだディレクトリの `README.md` を読む。
3. Node.js と pnpm の要件を満たす。
4. `pnpm install`、`pnpm dev` の順で実行する。

## 対象テンプレート

| ディレクトリ | 用途 | テンプレート言語 | 画像最適化 |
| --- | --- | --- | --- |
| `vite-react` | Reactサイト | HTML + React/TypeScript | なし |
| `vite-astro` | 新規の小規模な静的サイト | Astro | なし |
| `vite-ejs-lite` | 小規模な静的サイト | EJS | なし |
| `vite-ejs` | 画像を扱う静的サイト | EJS | あり |
| `vite-pug` | 既存Pug案件の保守 | Pug | あり |

## 共通要件

- Viteテンプレートは8系の正式な `vite` パッケージを使う。
- Astroテンプレートは7系の正式な`astro`パッケージを使い、Astro内蔵のViteを使う。
- ViteテンプレートはNode.js `^20.19.0 || >=22.12.0`、AstroテンプレートはNode.js `>=22.23.4`を使う。
- パッケージ管理はpnpmに統一する。
- 5テンプレートの開発サーバーは`http://localhost:5173`に統一する。
- ViteテンプレートのJavaScript圧縮はVite 8標準のOxcを使う。
- Viteテンプレートのビルド入力と出力はRolldown向けの設定を使う。
- `pnpm build`が成功し、成果物を各テンプレートの`dist`へ出力する。
- ロックファイルをコミットし、同じ依存関係を再現できるようにする。
- 不要な互換設定、空設定、重複設定を残さない。

## 資料の読みやすさ

- ADHDの人でも、現在地、次にすること、完了条件をすぐ把握できる構成にする。
- 冒頭に結論または開始手順を置き、1つの項目には1つの目的だけを書く。
- 全体像、手順、分岐、ファイル配置は、文章だけでなく図、表、番号付き手順、ディレクトリツリーで示す。
- 図は装飾ではなく、文章より関係を理解しやすくなる場合に使う。
- 簡潔化を理由に、ディレクトリ構成、前提条件、実行コマンド、完了条件を削除しない。

## Pugの保守方針

- Pugテンプレートは既存案件向けとして保守する。
- `pug`は最終採用版を完全固定し、自動更新しない。
- `vite-pug`で`pnpm dev`を起動したとき、`/`と各サブディレクトリのURLを対応するPugからHTMLとして表示する。
- Pugの版を変更するときは、この文書、テスト、READMEを先に更新する。

## 開発手順

変更は必ず次の順番で行う。

1. **資料**: 要件定義とREADMEを先に更新し、古い説明や矛盾をなくす。
2. **テスト**: 期待する状態を自動テストにする。変更前に失敗することを確認する。
3. **実装**: テストを通す最小限のコードへ変更する。
4. **整理**: 不要コード、互換コード、重複、資料との矛盾を削除する。

## 完了条件

- 要件テストがすべて成功する。
- 5テンプレートのビルドがすべて成功する。
- READMEのコマンドをそのまま実行できる。
- `package.json`とロックファイルが一致する。
- Git差分に生成物や意図しない変更が含まれない。

## 対象外

- 古いVite、Node.js、npm、Yarnとの後方互換。
- 既存設定を温存するためだけの移行コード。
- Git管理外の`vite_sass`ディレクトリ。

## Astroテンプレート

- `vite-astro`はEJSの代替となる新規静的サイト用テンプレートとする。
- ページは`src/pages`、共通レイアウトは`src/layouts`、HeaderやFooterは`src/components`に置く。
- HTMLは`preserve`形式で、`src/pages`のファイル構成を保って出力する。
- `directory`、`file`、`preserve`の違いと選択基準は`vite-astro/docs/build-formats.md`に記録する。
- ディレクトリのトップは`index.astro`、同じディレクトリの下層ページは任意名の`.astro`で作成できる。
- トップを`dist/index.html`、Aboutを`dist/about/index.html`、Newsを`dist/news/index.html`へ出力する。
- ナビゲーションは`/about/`と`/news/`を参照する。
- SCSSとJavaScriptは`vite-ejs-lite/src/scss`と`vite-ejs-lite/src/js`の構成を継承する。
- Astroが生成するCSSは`dist/assets/css/style.css`、JavaScriptは`dist/assets/js/main.js`へ固定名で出力する。
- その他の生成アセットは`dist/assets`へまとめる。
- 画像は`dist/assets/images`、PDFは`dist/assets/pdf`、フォントは`dist/assets/fonts`へ拡張子を維持して出力する。
- `vite-astro`にはビルドと参照方法を確認できる画像、PDF、WOFF2フォントのサンプルを置く。
- ナビゲーションなどの繰り返しはAstroテンプレート内のJavaScript式で記述する。
- 標準出力は静的HTMLとし、必要のないクライアントJavaScriptを生成しない。
- トップ、About、Newsの3ページを持ち、共通HeaderとFooterを利用する。
