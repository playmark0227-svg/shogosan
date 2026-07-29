# ES Beauty — 写真生成プロンプト集

サイト内の写真が入る場所**26箇所**すべてのプロンプトです。
Google Flow / ImageFX などにそのまま貼り付けて生成してください。

---

## 使い方（3ステップ）

1. 下のプロンプトをコピーして生成
2. **指定のファイル名**を付ける（例: `hero-home.jpg`）
3. この `images/` フォルダに置いて push → 自動で反映されます

> ファイルが無い間は今の（グラデーション＋「準備中」）表示のまま崩れません。
> **1枚ずつ、できたものから**置いていけます。全部揃うまで待つ必要はありません。

### 書き出し設定の目安
- 形式: **JPEG**（写真なのでPNG不要・重くなるだけ）
- 幅: 横長は **1600〜2000px**、正方形に近いものは **1200px** 程度
- 容量: **1枚 300KB 以下**を目安に圧縮（[squoosh.app](https://squoosh.app) が手軽）

---

## ⚠️ 生成時の注意（重要）

- **顔がはっきり写る画像は避けてください。** AI生成の顔は不自然になりやすく、
  さらに「実在しないスタッフ・お客様」が実在するかのように見えてしまいます。
  → **手元・後ろ姿・首から下・店内・小物**で構成すると、
    編集的で高級感が出るうえ、この問題も起きません。
- **文字・ロゴ・看板を入れない。** AIは架空の文字を書き込みがちです。
  各プロンプト末尾の `no text, no logos` はそのため必ず残してください。
- 実際の店舗写真が撮れたら、**同じファイル名で上書き**すれば差し替わります。
  （AI画像はあくまで「撮影までのつなぎ」としてお使いください）

---

## 🎨 共通スタイル（全カットの末尾に付ける）

同じカメラマンが撮ったように揃えるための指定です。**必ず付けてください。**

### A. 明るいページ用（bar以外の全て）

```
shot on 50mm lens, set in Japan, contemporary Japanese salon interior, soft diffused natural window light, warm neutral palette of cream, oat beige, pale taupe and dusty rose, gentle film grain, shallow depth of field, generous negative space, calm minimal Japanese salon aesthetic, editorial magazine photography, muted desaturated tones, no people's faces, no text, no lettering, no signage, no logos, no watermark
```

### B. BAR Amis 用（暗いページ）

```
shot on 50mm lens, set in Japan, Japanese members-only bar, low-key warm tungsten and candlelight, deep shadows, dark chocolate brown and antique gold palette, soft golden bokeh highlights, gentle film grain, intimate members-only bar atmosphere, editorial magazine photography, no people's faces, no text, no lettering, no signage, no logos, no watermark
```

---

# 📸 カット一覧

## ■ トップページ

### 1. `hero-home.jpg` — メインビジュアル ｜ 16:9
サイトを開いて最初に見える背景。文字が上に乗るので**中央〜左は余白多め**が理想。
```
A serene modern beauty salon entrance interior in soft early morning light, pale oak floor, cream plaster walls, a single dried pampas grass arrangement in a ceramic vase, sheer linen curtain diffusing sunlight, empty and calm, wide establishing shot with open space on the left
```
+ 共通スタイルA

### 2. `concept.jpg` — コンセプト帯 ｜ 21:9（横長）
```
Close-up still life of beauty salon details arranged on a pale travertine surface, a folded ecru linen towel, a small ceramic dish, a sprig of eucalyptus, soft morning shadows falling diagonally, wide panoramic composition, minimal styling
```
+ 共通スタイルA

---

## ■ サービスタイル（トップの8枚）｜ すべて 4:3

文字が上に重なるので、**中央に主役を置きすぎない**方が綺麗です。

### 3. `tile-yonua.jpg` — Yonua（ネイル / 円山）
```
Soft-focus nail salon detail, a pair of hands with subtle nuance nail art in muted greige and milky pink resting on pale linen cloth, cropped at the wrist, no face, warm window light
```
+ 共通スタイルA

### 4. `tile-pianeta.jpg` — PIANETA NAIL
```
Overhead flat lay of a nail artist workstation, small glass bottles of muted polish in dusty rose and warm beige, a folded towel, brushes in a ceramic cup, on pale wood, top-down view
```
+ 共通スタイルA

### 5. `tile-uru.jpg` — uru（アートスタジオ）
```
An artistic nail studio corner, abstract paint swatches on paper, a small ceramic sculpture, dried flowers in a glass vase, sage green and cream tones, quiet gallery-like atmosphere
```
+ 共通スタイルA

### 6. `tile-luster.jpg` — Luster（エステ）
```
A calm esthetic treatment room, a white draped bed with neatly folded towels, a soft green plant in the corner, diffused daylight through frosted glass, no people
```
+ 共通スタイルA

### 7. `tile-noiru.jpg` — Noiru（アイサロン）
```
Extreme close-up of long natural eyelashes with a soft catchlight, cropped tightly to show only lashes and the curve of the brow, dreamy shallow focus, lavender and cream tones
```
+ 共通スタイルA

### 8. `tile-pilates.jpg` — Pilates
```
A minimal pilates studio, the silhouette of a reformer machine beside a tall window, warm oak floor, morning light streaming in, empty room, calm
```
+ 共通スタイルA

### 9. `tile-uur.jpg` — UUR（ドッグサロン）
```
A small fluffy white dog sitting calmly on a grooming table in a bright airy salon, soft natural light, cream and oat tones, gentle and warm
```
+ 共通スタイルA

### 10. `tile-bar.jpg` — BAR Amis
```
A dark intimate bar counter with a champagne coupe catching warm golden light, deep shadows, polished dark wood, softly blurred bottles behind
```
+ 共通スタイル**B**

---

## ■ Nail（Yonua）ページ

### 11. `hero-nail.jpg` — ページ上部背景 ｜ 16:9
```
Wide view of a calm nail salon interior, two treatment desks with small soft lamps, pale plaster walls, dried flowers in a vase, warm afternoon light, no people, open space on the left
```
+ 共通スタイルA

### 12. `salon-pianeta.jpg` — PIANETAカード ｜ 4:3
```
Interior corner of a small nail salon, a single client chair with a linen cushion, a shelf of muted polish bottles, warm wood and cream tones, cozy and tidy
```
+ 共通スタイルA

### 13. `salon-uru.jpg` — uruカード ｜ 4:3
```
An art-studio style nail space, white walls with a framed abstract print, ceramic vessels on a shelf, sage green accents, natural light from the side
```
+ 共通スタイルA

### 14. `salon-yonua.jpg` — Yonua円山カード ｜ 4:3
※準備中の店舗なので「これから始まる感」で
```
A new beauty space under preparation, clean empty interior with pale walls and warm oak floor, a wooden ladder and rolled paper in the corner, sunlight through a large window, a sense of quiet anticipation
```
+ 共通スタイルA

### 15. `yonua-maruyama.jpg` — 円山店 外観 ｜ 4:3
```
Exterior facade of a small stylish beauty salon on a quiet Japanese residential street in Sapporo, Japanese low-rise townscape, cream painted wall with large glass window, a slim tree beside the entrance, narrow paved sidewalk, utility pole and overhead wires typical of a Japanese street, soft overcast daylight, blank wall where a sign would go, NOT European, NOT British, no brick terraced houses, no cars on the left side
```
+ 共通スタイルA

> ⚠️ **一度イギリスの街並みが生成されて差し戻しています。**
> 「Japan / Sapporo」と「NOT European, NOT British」を必ず残してください。

---

## ■ Esthetic（Luster）ページ

### 16. `hero-esthetic.jpg` — ページ上部背景 ｜ 16:9
```
Wide serene esthetic salon interior, a treatment bed with crisp white linens, stacked soft towels, a green plant, diffused light, open space on the left
```
+ 共通スタイルA

### 17. `luster-room.jpg` — 施術ルーム ｜ 4:3
```
A private esthetic treatment room, a clean bed with neatly folded towels, warm indirect lighting, a small side table with a ceramic diffuser, calm and hygienic
```
+ 共通スタイルA

---

## ■ Eye（Noiru）ページ

### 18. `hero-eye.jpg` — ページ上部背景 ｜ 16:9
```
Soft wide beauty interior, a reclining treatment chair for eyelash extensions in a softly lit room, pale lavender and cream palette, no people, open space on the left
```
+ 共通スタイルA

### 19. `noiru-salon.jpg` — サロン内観 ｜ 4:3
```
An eyelash salon interior, a single reclining bed with a soft folded blanket, pale lavender walls, a small shelf with neatly arranged tools, minimal and serene
```
+ 共通スタイルA

---

## ■ Pilates ページ

### 20. `hero-pilates.jpg` — ページ上部背景 ｜ 16:9
```
Wide bright pilates studio with reformer machines beside large windows, warm wood floor, morning light, empty and airy, open space on the left
```
+ 共通スタイルA

### 21. `pilates-studio.jpg` — スタジオ ｜ 21:9（横長）
```
Panoramic view of a minimal pilates studio, reformer machines in a row, tall windows, warm oak floor, soft morning light, no people
```
+ 共通スタイルA

---

## ■ Dog（UUR）ページ

### 22. `hero-dog.jpg` — ページ上部背景 ｜ 16:9
```
A bright dog grooming salon, a fluffy small dog waiting calmly on a table, soft daylight, cream and warm wood tones, gentle atmosphere, open space on the left
```
+ 共通スタイルA

### 23. `uur-trimming.jpg` — トリミング ｜ 16:10
```
Gentle hands brushing a small fluffy dog on a grooming table, cropped to show only the hands and the dog, no face, soft natural light, caring and calm atmosphere
```
+ 共通スタイルA

### 24. `oyatsu.jpg` — おやつ ｜ 16:10
```
Flat lay of natural dog treats, dried venison and tuna pieces in a small ceramic dish on pale linen, rustic and clean, warm daylight, minimal styling
```
+ 共通スタイルA

---

## ■ BAR Amis ページ（※共通スタイルBを使用）

### 25. `hero-bar.jpg` — ページ上部背景 ｜ 16:9
```
Wide dark bar interior at night, a backlit bottle shelf glowing amber, an empty polished counter in the foreground, deep shadows, intimate and quiet, open space on the left
```
+ 共通スタイル**B**

### 26. `bar-interior.jpg` — 店内 ｜ 21:9（横長）
```
Panoramic dark members-only bar, a counter with leather stools, warm pendant lights, a champagne bucket on the bar, deep browns and antique gold, no people
```
+ 共通スタイル**B**

---

## チェックリスト

- [ ] 1. hero-home.jpg
- [ ] 2. concept.jpg
- [ ] 3. tile-yonua.jpg
- [ ] 4. tile-pianeta.jpg
- [ ] 5. tile-uru.jpg
- [ ] 6. tile-luster.jpg
- [ ] 7. tile-noiru.jpg
- [ ] 8. tile-pilates.jpg
- [ ] 9. tile-uur.jpg
- [ ] 10. tile-bar.jpg
- [ ] 11. hero-nail.jpg
- [ ] 12. salon-pianeta.jpg
- [ ] 13. salon-uru.jpg
- [ ] 14. salon-yonua.jpg
- [ ] 15. yonua-maruyama.jpg
- [ ] 16. hero-esthetic.jpg
- [ ] 17. luster-room.jpg
- [ ] 18. hero-eye.jpg
- [ ] 19. noiru-salon.jpg
- [ ] 20. hero-pilates.jpg
- [ ] 21. pilates-studio.jpg
- [ ] 22. hero-dog.jpg
- [ ] 23. uur-trimming.jpg
- [ ] 24. oyatsu.jpg
- [ ] 25. hero-bar.jpg
- [ ] 26. bar-interior.jpg
