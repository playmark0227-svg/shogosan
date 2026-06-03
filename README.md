# ES UUR — Official Site

札幌を拠点とする総合ビューティー&ライフスタイルカンパニー **ES UUR** の
公式ウェブサイト。ネイル・フィットネス・美容・ペットケアを横断する
ブランドサイトです。

## 構成

- `index.html` — 1ページ完結のランディング
- `css/style.css` — アイボリー×シャンパンゴールドのラグジュアリースパ調スタイル
- `js/main.js` — ナビ／演出／Instagramタブ
- `js/config.js` — Instagram連携の設定
- `images/` — ブランド調のSVGアート素材（後述）
- `.github/workflows/deploy.yml` — GitHub Pages 自動デプロイ

## デザインのトンマナ

ビューティーメニュー／脂肪冷却ポスター／ネイルのストーリーズを参照し、
**アイボリー × シャンパンゴールド、筆記体アクセント、ダイヤモンド装飾、
ニュアンスアート（オイルペイント調テクスチャ）** で統一しています。

- フォント: Cormorant Garamond（見出し）/ Italianno（筆記体）/ Jost（ラベル）/ Noto Sans JP
- カラー: ivory `#faf6ef` / champagne gold `#c2a263` / ice `#bcd2e4` / lavender `#cabfe0`

### 画像素材（images/）

外部画像に依存せず崩れないよう、ブランド調の **SVGアート** を同梱しています。

- `tex-1〜4.svg` — ニュアンスアート風テクスチャ（ネイルカード・各セクション背景）
- `hero.svg` — ヒーロー背景
- `diamond.svg` / `sparkle.svg` — 装飾

**本物の写真に差し替える場合:** 同じ位置に `.jpg` を置き、CSSの
`background-image` または対象の `background` クラスを差し替えるだけです
（例: `.salon-card__thumb--1{ background-image:url(../images/pianeta.jpg) }`）。

## ローカル確認

```bash
# 任意の静的サーバーでOK
python3 -m http.server 8080
# → http://localhost:8080/
```

## GitHub Pages

`main` または `claude/**` ブランチへのpushで自動デプロイされます。

1. GitHub の Repo Settings → Pages
2. **Source** を **GitHub Actions** に設定
3. Actions タブで `Deploy to GitHub Pages` の成功を確認
4. 公開URL: `https://playmark0227-svg.github.io/shogosan/`

## Instagram の最新投稿表示

`js/config.js` にアカウントごとの **businessId** と **accessToken**
を入れると、各タブで最新投稿が表示されます。

```js
"pianeta_nail_": {
  businessId:  "17841400000000000",
  accessToken: "EAA..."
}
```

トークンが空の場合、フォールバックUIとしてプロフィールリンクが
表示されます。

### トークン取得手順 (概要)

1. Meta開発者アカウント作成 (developers.facebook.com)
2. アプリ作成 → Instagram Graph API追加
3. Facebookページと Instagram Business/Creatorアカウント連携
4. **長期アクセストークン (60日)** を取得
5. `me/accounts` でビジネスIDを確認

詳細: [Meta公式ドキュメント](https://developers.facebook.com/docs/instagram-api/)

## ブランド一覧

- **YONUA** (円山 / 準備中) — 複合ビューティー店舗
- **PIANETA NAIL** (東区元町)
- **uru** (nail art studio)
- **nail salon mu__.** (→ YONUAへリニューアル)
- **SiiS FITNESS** (元町駅徒歩5分)
- **UUR** (南幌町ドッグサロン)
- **Boku no Watashi no Oyatsu.** (ペットおやつ)
