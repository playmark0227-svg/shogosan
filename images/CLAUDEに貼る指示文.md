# Claude に貼る指示文（画像生成用）

下の枠の中を**そのままコピーして、Claude（claude.ai / デスクトップアプリ）に貼り付け**てください。
26枚の写真を、統一されたトーンで順番に生成してくれます。

> **前提**：画像生成できるコネクタ（Higgsfield など）を Claude に接続しておいてください。
> 接続していない場合は、Claude がプロンプトを整形して出力するので、
> それを Google Flow / ImageFX / Whisk などに貼って生成すればOKです。

---

## 📋 コピーする範囲：ここから下すべて

---

札幌の複合ビューティーサロン「ES Beauty」の公式サイト用に、写真を26枚generateしてください。

## 進め方

- **1枚ずつ順番に**生成してください（まとめて一気には作らないでください）
- 1枚できたら**わたしに見せて**、OKをもらってから次に進んでください
- わたしが「NG」「作り直して」と言ったら、同じ番号を作り直してください
- ファイル名を**必ず一緒に表示**してください（保存時に使います）

## 全カット共通のルール（絶対に守ってください）

1. **人物の顔をはっきり写さない。**
   実在しないスタッフやお客様が実在するように見えてしまうため。
   → 代わりに「手元」「後ろ姿」「首から下」「店内」「小物」で構成してください。
   まつげのアップなど、顔の一部のみのクローズアップはOKです。

2. **文字・ロゴ・看板を一切入れない。**
   AIは架空の文字を書き込みがちです。プロンプト末尾の `no text, no logos` は必ず残してください。

3. **すべて日本国内（札幌）の店舗に見えること。**
   海外の街並み・建築が出たら作り直してください。特に外観カットは要注意です。

4. **26枚が「同じカメラマンが同じ日に撮った」ように見えること。**
   下の「共通スタイル」を毎回必ず末尾に付けてください。

> **2回目の生成にあたって（前回の反省）**
>
> 1回目は全体的に **淡すぎ・平坦・無国籍** になりました。原因と対策：
>
> | 症状 | 原因 | 対策（新スタイルに反映済み） |
> |---|---|---|
> | 眠い・立体感がない | `soft diffused light` だけで光に方向がなかった | `raking in from one side` `directional shadows` `full tonal range` |
> | 安っぽい / 生成物っぽい | 素材の指定が無く、のっぺりした面になった | `hand-troweled plaster` `oak with visible grain` `linen weave` `matte ceramic` |
> | 日本のサロンに見えない | 北欧・豪州系のミニマルとして出ていた | `in Sapporo` `Japanese interior proportions` |
> | 全部同じに見える | 色指定が cream/beige のみで幅がなかった | `muted clay` `subtle amber accents` を追加 |

## 共通スタイル（毎回プロンプトの末尾に付ける）

**スタイルA（1〜9, 11〜24番で使用）：**
```
editorial interior photograph for a high-end Japanese salon in Sapporo, shot on medium format film, 50mm, late-morning sunlight raking in from one side through sheer linen, soft directional shadows with real depth, hand-troweled plaster walls, pale oak with visible grain, linen weave and matte ceramic textures, warm neutral palette of cream, oat, warm taupe and muted clay with subtle amber accents, full tonal range from bright highlight to soft deep shadow, fine film grain, shallow depth of field, quiet luxury, calm and uncluttered, Japanese interior proportions, no people's faces, no text, no lettering, no signage, no logos, no watermark
```

**スタイルB（10, 25, 26番のみ／バー用の暗いトーン）：**
```
editorial interior photograph of an intimate Japanese members-only bar in Sapporo at night, shot on medium format film, 50mm, low-key warm tungsten and candlelight, deep rich shadows with detail retained, polished dark walnut, antique brass, amber bottle glow, soft golden bokeh, fine film grain, quiet luxury, no people's faces, no text, no lettering, no signage, no logos, no watermark
```

---

# 生成する26枚

## 01 `hero-home.jpg` ｜ 16:9 ｜ スタイルA
※サイトを開いて最初に見える背景。上に文字が乗るので、**左側は空けて**ください。
```
A serene modern beauty salon entrance interior in soft early morning light, pale oak floor, cream plaster walls, a single dried pampas grass arrangement in a ceramic vase, sheer linen curtain diffusing sunlight, empty and calm, wide establishing shot with open space on the left
```

## 02 `concept.jpg` ｜ 21:9（横長）｜ スタイルA
```
Close-up still life of beauty salon details arranged on a pale travertine surface, a folded ecru linen towel, a small ceramic dish, a sprig of eucalyptus, soft morning shadows falling diagonally, wide panoramic composition, minimal styling
```

## 03 `tile-yonua.jpg` ｜ 4:3 ｜ スタイルA
```
Soft-focus nail salon detail, a pair of hands with subtle nuance nail art in muted greige and milky pink resting on pale linen cloth, cropped at the wrist, no face, warm window light
```

## 04 `tile-pianeta.jpg` ｜ 4:3 ｜ スタイルA
```
Overhead flat lay of a nail artist workstation, small glass bottles of muted polish in dusty rose and warm beige, a folded towel, brushes in a ceramic cup, on pale wood, top-down view
```

## 05 `tile-uru.jpg` ｜ 4:3 ｜ スタイルA
```
An artistic nail studio corner, abstract paint swatches on paper, a small ceramic sculpture, dried flowers in a glass vase, sage green and cream tones, quiet gallery-like atmosphere
```

## 06 `tile-luster.jpg` ｜ 4:3 ｜ スタイルA
```
A calm esthetic treatment room, a white draped bed with neatly folded towels, a soft green plant in the corner, diffused daylight through frosted glass, no people
```

## 07 `tile-noiru.jpg` ｜ 4:3 ｜ スタイルA
```
Extreme close-up of long natural eyelashes with a soft catchlight, cropped tightly to show only lashes and the curve of the brow, dreamy shallow focus, lavender and cream tones
```

## 08 `tile-pilates.jpg` ｜ 4:3 ｜ スタイルA
```
A minimal pilates studio, the silhouette of a reformer machine beside a tall window, warm oak floor, morning light streaming in, empty room, calm
```

## 09 `tile-uur.jpg` ｜ 4:3 ｜ スタイルA
```
A small fluffy white dog sitting calmly on a grooming table in a bright airy salon, soft natural light, cream and oat tones, gentle and warm
```

## 10 `tile-bar.jpg` ｜ 4:3 ｜ **スタイルB**
```
A dark intimate bar counter with a champagne coupe catching warm golden light, deep shadows, polished dark wood, softly blurred bottles behind
```

## 11 `hero-nail.jpg` ｜ 16:9 ｜ スタイルA
```
Wide view of a calm nail salon interior, two treatment desks with small soft lamps, pale plaster walls, dried flowers in a vase, warm afternoon light, no people, open space on the left
```

## 12 `salon-pianeta.jpg` ｜ 4:3 ｜ スタイルA
```
Interior corner of a small nail salon, a single client chair with a linen cushion, a shelf of muted polish bottles, warm wood and cream tones, cozy and tidy
```

## 13 `salon-uru.jpg` ｜ 4:3 ｜ スタイルA
```
An art-studio style nail space, white walls with a framed abstract print, ceramic vessels on a shelf, sage green accents, natural light from the side
```

## 14 `salon-yonua.jpg` ｜ 4:3 ｜ スタイルA
※オープン準備中の店舗なので「これから始まる感」を
```
A new beauty space under preparation, clean empty interior with pale walls and warm oak floor, a wooden ladder and rolled paper in the corner, sunlight through a large window, a sense of quiet anticipation
```

## 15 `yonua-maruyama.jpg` ｜ 4:3 ｜ スタイルA
```
Exterior facade of a small stylish beauty salon on a quiet Japanese residential street in Sapporo, Japanese low-rise townscape, cream painted wall with large glass window, a slim tree beside the entrance, narrow paved sidewalk, utility pole and overhead wires typical of a Japanese street, soft overcast daylight, blank wall where a sign would go, NOT European, NOT British, no brick terraced houses, no cars on the left side
```
※ 以前これでイギリスの街並みが出てしまい差し戻しました。**日本・札幌**の指定は必ず残してください。

## 16 `hero-esthetic.jpg` ｜ 16:9 ｜ スタイルA
```
Wide serene esthetic salon interior, a treatment bed with crisp white linens, stacked soft towels, a green plant, diffused light, open space on the left
```

## 17 `luster-room.jpg` ｜ 4:3 ｜ スタイルA
```
A private esthetic treatment room, a clean bed with neatly folded towels, warm indirect lighting, a small side table with a ceramic diffuser, calm and hygienic
```

## 18 `hero-eye.jpg` ｜ 16:9 ｜ スタイルA
```
Soft wide beauty interior, a reclining treatment chair for eyelash extensions in a softly lit room, pale lavender and cream palette, no people, open space on the left
```

## 19 `noiru-salon.jpg` ｜ 4:3 ｜ スタイルA
```
An eyelash salon interior, a single reclining bed with a soft folded blanket, pale lavender walls, a small shelf with neatly arranged tools, minimal and serene
```

## 20 `hero-pilates.jpg` ｜ 16:9 ｜ スタイルA
```
Wide bright pilates studio with reformer machines beside large windows, warm wood floor, morning light, empty and airy, open space on the left
```

## 21 `pilates-studio.jpg` ｜ 21:9（横長）｜ スタイルA
```
Panoramic view of a minimal pilates studio, reformer machines in a row, tall windows, warm oak floor, soft morning light, no people
```

## 22 `hero-dog.jpg` ｜ 16:9 ｜ スタイルA
```
A bright dog grooming salon, a fluffy small dog waiting calmly on a table, soft daylight, cream and warm wood tones, gentle atmosphere, open space on the left
```

## 23 `uur-trimming.jpg` ｜ 16:10 ｜ スタイルA
```
Gentle hands brushing a small fluffy dog on a grooming table, cropped to show only the hands and the dog, no face, soft natural light, caring and calm atmosphere
```

## 24 `oyatsu.jpg` ｜ 16:10 ｜ スタイルA
```
Flat lay of natural dog treats, dried venison and tuna pieces in a small ceramic dish on pale linen, rustic and clean, warm daylight, minimal styling
```

## 25 `hero-bar.jpg` ｜ 16:9 ｜ **スタイルB**
```
Wide dark bar interior at night, a backlit bottle shelf glowing amber, an empty polished counter in the foreground, deep shadows, intimate and quiet, open space on the left
```

## 26 `bar-interior.jpg` ｜ 21:9（横長）｜ **スタイルB**
```
Panoramic dark members-only bar, a counter with leather stools, warm pendant lights, a champagne bucket on the bar, deep browns and antique gold, no people
```

---

## 最後に

26枚すべて終わったら、「全部できました」と教えてください。

---

## 📋 コピーする範囲：ここまで

---

# 生成が終わったら（あなたの作業）

## 1. ダウンロードして1つのフォルダにまとめる

ダウンロードフォルダに好きな名前のフォルダを作って、26枚をまとめてください。

```
ダウンロード/
  └─ esbeauty-photos/     ← 名前は何でもOK
       ├─ hero-home.jpg
       ├─ concept.jpg
       └─ ...
```

**ファイル名は、指示文に書いてある名前（`hero-home.jpg` など）を付けるのが確実です。**
もし `image_01.png` のような名前になっていても、**番号が合っていれば自動で判定**します。
形式は JPG / PNG / WEBP どれでも大丈夫です。

## 2. アップロードする（ここだけ場所が決まっています）

GitHub の **`images/_inbox/`** フォルダにアップしてください。

👉 https://github.com/playmark0227-svg/shogosan/upload/claude/sleepy-lamport-VWBcG/images/_inbox

1. 上のリンクを開く
2. 26枚をまとめて**ドラッグ＆ドロップ**
3. 一番下の **「Commit changes」** ボタンを押す

## 3. Claude Code に伝える

「**画像アップしたよ**」とだけ言ってください。あとは自動で：

- ファイル名から各スロットを判定
- 規定の比率に中央クロップ
- リサイズ・圧縮（300KB以下）
- `images/` に正式名で配置
- サイトに反映して公開

まで行います。**1枚だけでも、途中まででもOK**です。できたぶんから反映できます。
