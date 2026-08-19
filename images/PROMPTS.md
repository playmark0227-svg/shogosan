# ES Beauty — 写真スロット一覧

> **プロンプト本体は [CLAUDEに貼る指示文.md](./CLAUDEに貼る指示文.md) にあります。**
> 以前このファイルにもプロンプトを載せていましたが、2箇所で管理した結果、
> 共通スタイルだけ更新されて各カットの本文が古いまま残り、
> 「片側からの光」と「拡散光」が矛盾する状態になっていました。
> 二重管理をやめ、こちらは**どこに何が入るか**の一覧だけにしています。

---

## 使い方

1. [CLAUDEに貼る指示文.md](./CLAUDEに貼る指示文.md) の「コピー範囲」を Claude に貼る
2. 出てきた画像を `images/_inbox/` にアップロード
   👉 https://github.com/playmark0227-svg/shogosan/upload/gh-pages/images/_inbox
3. 「画像アップしたよ」と伝える

判定・トリミング・圧縮・配置・公開は自動です。1枚ずつでも構いません。
ファイルが無いスロットは「準備中」表示のままで、レイアウトは崩れません。

---

## スロット一覧（26箇所）

| # | ファイル名 | 比率 | 掲載場所 |
|---|---|---|---|
| 01 | `hero-home.jpg` | 16:9 | トップ メインビジュアル |
| 02 | `concept.jpg` | 21:9 | トップ コンセプト帯 |
| 03 | `tile-yonua.jpg` | 4:3 | トップ サービスタイル — Yonua |
| 04 | `tile-pianeta.jpg` | 4:3 | トップ サービスタイル — PIANETA |
| 05 | `tile-uru.jpg` | 4:3 | トップ サービスタイル — uru |
| 06 | `tile-luster.jpg` | 4:3 | トップ サービスタイル — Luster |
| 07 | `tile-noiru.jpg` | 4:3 | トップ サービスタイル — Noiru |
| 08 | `tile-pilates.jpg` | 4:3 | トップ サービスタイル — Pilates |
| 09 | `tile-uur.jpg` | 4:3 | トップ サービスタイル — UUR |
| 10 | `tile-bar.jpg` | 4:3 | トップ サービスタイル — BAR Amis ※暗いトーン |
| 11 | `hero-nail.jpg` | 16:9 | Nail ページ上部 |
| 12 | `salon-pianeta.jpg` | 4:3 | Nail — PIANETAカード |
| 13 | `salon-uru.jpg` | 4:3 | Nail — uruカード |
| 14 | `salon-yonua.jpg` | 4:3 | Nail — Yonua円山カード |
| 15 | `yonua-maruyama.jpg` | 4:3 | Nail — 円山店 外観 ⚠️ |
| 16 | `hero-esthetic.jpg` | 16:9 | Esthetic ページ上部 |
| 17 | `luster-room.jpg` | 4:3 | Esthetic — 施術ルーム |
| 18 | `hero-eye.jpg` | 16:9 | Eye ページ上部 |
| 19 | `noiru-salon.jpg` | 4:3 | Eye — サロン内観 |
| 20 | `hero-pilates.jpg` | 16:9 | Pilates ページ上部 |
| 21 | `pilates-studio.jpg` | 21:9 | Pilates — スタジオ |
| 22 | `hero-dog.jpg` | 16:9 | Dog ページ上部 |
| 23 | `uur-trimming.jpg` | 16:10 | Dog — トリミング |
| 24 | `oyatsu.jpg` | 16:10 | Dog — おやつ |
| 25 | `hero-bar.jpg` | 16:9 | Bar ページ上部 ※暗いトーン |
| 26 | `bar-interior.jpg` | 21:9 | Bar — 店内 ※暗いトーン |

⚠️ **15番**は1回目にイギリスの街並みが生成され差し戻しました。
日本・札幌の指定と `NOT European, NOT British` は必ず残してください。

---

## 差し戻した画像

`_rejected/` に、内容が合わず外した画像を理由付きで置いています。
サイトには使われていません。撮り直し後は削除して構いません。

## 実写に差し替えるとき

実際の店舗写真が撮れたら、**同じファイル名でアップロードするだけ**で差し替わります。
AI画像はあくまで撮影までのつなぎとしてお使いください。
