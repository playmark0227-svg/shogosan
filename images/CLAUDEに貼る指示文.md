# Claude に貼る指示文（画像生成用・第2版）

下の「コピー範囲」をそのまま Claude に貼り付けてください。

> **前提**：画像生成できるコネクタ（Higgsfield など）を接続しておいてください。
> 無い場合は Claude がプロンプトを整形して出すので、Google Flow / ImageFX に貼ればOKです。

> **第2版で何を変えたか**
> 1回目は全体に **淡すぎ・平坦・無国籍** でした。原因は次の4つで、すべて修正済みです。
>
> | 症状 | 原因 | 対策 |
> |---|---|---|
> | 眠い・立体感がない | 光に方向の指定が無かった | 「片側から差し込む光」「方向のある影」「ハイライト〜深い影までの階調」 |
> | 安っぽい・生成物っぽい | 素材の指定がゼロだった | 「左官の壁」「木目の見えるオーク」「リネンの織り」「マットな陶器」 |
> | 日本のサロンに見えない | 北欧・豪州系ミニマルとして出ていた | 「札幌」「日本の室内寸法」 |
> | 全部同じに見える | 色が cream / beige だけだった | 「くすんだテラコッタ」「琥珀のアクセント」 |
>
> **さらに今回、26カット全部の本文も書き直しました。**
> 1回目は本文が `soft early morning light`、共通スタイルが `raking light` のように
> **光の指示が矛盾**していて、打ち消し合って眠い絵になっていました。
> 第2版では光は共通スタイル側に一本化し、本文は「何が写っているか」だけを書いています。

---

## 📋 コピー範囲：ここから下すべて

---

札幌の複合ビューティーサロン「ES Beauty」の公式サイト用に、写真を26枚generateしてください。

## 進め方

- **1枚ずつ順番に**生成してください（まとめて一気には作らないでください）
- 1枚できたら**必ず見せて**ください。OKをもらってから次に進みます
- 「NG」と言われたら、同じ番号を作り直してください
- 毎回**ファイル名を一緒に表示**してください（保存時に使います）

## 全カット共通のルール（必ず守ってください）

1. **人物の顔をはっきり写さない。**
   実在しないスタッフやお客様が実在するように見えてしまうため。
   → 「手元」「後ろ姿」「首から下」「店内」「小物」で構成してください。
   まつげのアップなど、顔の一部だけのクローズアップはOKです。

2. **文字・ロゴ・看板を一切入れない。**
   AIは架空の文字を書き込みがちです。末尾の `no text, no logos` は必ず残してください。

3. **すべて日本国内（札幌）の店舗に見えること。**
   海外の街並み・建築が出たら作り直し。特に15番の外観は要注意です。

4. **26枚が「同じカメラマンが同じ日に撮った」ように見えること。**
   下の共通スタイルを毎回必ず末尾に付けてください。

5. **光の指定は共通スタイルに任せる。**
   各カットの本文に光や時間帯を足さないでください。矛盾すると眠い絵になります。

## 共通スタイル（毎回、本文の末尾に付ける）

**スタイルA（1〜9, 11〜24番）：**
```
editorial interior photograph for a high-end Japanese salon in Sapporo, shot on medium format film, 50mm, late-morning sunlight raking in from one side through sheer linen, soft directional shadows with real depth, hand-troweled plaster walls, pale oak with visible grain, linen weave and matte ceramic textures, warm neutral palette of cream, oat, warm taupe and muted clay with subtle amber accents, full tonal range from bright highlight to soft deep shadow, fine film grain, shallow depth of field, quiet luxury, calm and uncluttered, Japanese interior proportions, no people's faces, no text, no lettering, no signage, no logos, no watermark
```

**スタイルB（10, 25, 26番のみ／バー用）：**
```
editorial interior photograph of an intimate Japanese members-only bar in Sapporo at night, shot on medium format film, 50mm, low-key warm tungsten and candlelight, deep rich shadows with detail retained, polished dark walnut, antique brass, amber bottle glow, soft golden bokeh, fine film grain, quiet luxury, no people's faces, no text, no lettering, no signage, no logos, no watermark
```

## 縦横比について

指定の比率が選べないツールの場合は、**16:9（横長）／4:3（それ以外）で作ってOK**です。
サイト側で自動的に中央トリミングされます。

---

# 生成する26枚

## 01 `hero-home.jpg` ｜ 16:9 ｜ A
```
The entrance lounge of a high-end Japanese beauty salon. A low oak bench against a hand-troweled plaster wall, one tall ceramic vessel holding dried pampas grass, a sheer linen curtain at the right edge. Wide establishing shot. The left third of the frame deliberately empty for text.
```

## 02 `concept.jpg` ｜ 21:9（無ければ16:9）｜ A
```
A quiet still life of salon objects on a pale travertine counter: a folded ecru linen towel, a small matte ceramic dish holding a glass dropper bottle, a single sprig of eucalyptus. Long diagonal shadows across the stone. Wide panoramic composition with generous empty space at the right.
```

## 03 `tile-yonua.jpg` ｜ 4:3 ｜ A
```
A pair of hands resting on a linen cloth, nails finished in a muted greige and milky pink nuance manicure. Cropped at the wrist so no face is visible. Close intimate framing, the manicure sharply in focus.
```

## 04 `tile-pianeta.jpg` ｜ 4:3 ｜ A
```
Top-down flat lay of a nail artist's workstation on pale oak: a row of small glass polish bottles in dusty rose and warm beige, fine brushes standing in a matte ceramic cup, glass nail files, a folded linen towel.
```

## 05 `tile-uru.jpg` ｜ 4:3 ｜ A
```
The corner of an art-studio style nail space: a framed abstract print in muted sage and clay, hand-thrown ceramic vessels on a slim oak shelf, dried branches in a glass vase.
```

## 06 `tile-luster.jpg` ｜ 4:3 ｜ A
```
A private esthetic treatment room: a treatment bed dressed in crisp white linen, a neat stack of folded towels, a potted olive tree in the corner, a frosted glass partition. No people.
```

## 07 `tile-noiru.jpg` ｜ 4:3 ｜ A
```
Extreme macro of long natural eyelashes with a single soft catchlight, cropped so tightly that only the lashes and the curve of the brow are visible, no identifiable face. Creamy bokeh, lavender and cream tones.
```

## 08 `tile-pilates.jpg` ｜ 4:3 ｜ A
```
A pilates reformer in near-silhouette beside a tall window in an empty studio, warm oak floor, most of the frame left as quiet space.
```

## 09 `tile-uur.jpg` ｜ 4:3 ｜ A
```
A small fluffy white dog sitting calmly on a wooden grooming table in a bright grooming salon, a wooden pin brush and a folded towel beside it, shelves of amber bottles softly out of focus behind.
```

## 10 `tile-bar.jpg` ｜ 4:3 ｜ **B**
```
A champagne coupe on a polished dark walnut bar counter catching a warm golden highlight, bottles softly blurred behind.
```

## 11 `hero-nail.jpg` ｜ 16:9 ｜ A
```
A calm nail salon interior: two treatment desks in pale oak with small brass task lamps, a plaster wall, dried flowers in a ceramic vase. No people. The left third of the frame empty for text.
```

## 12 `salon-pianeta.jpg` ｜ 4:3 ｜ A
```
The corner of a small nail salon: one client chair with a linen cushion, a slim wall shelf lined with muted polish bottles, a low side table holding a ceramic cup.
```

## 13 `salon-uru.jpg` ｜ 4:3 ｜ A
```
A nail space that reads like a small gallery: white walls, one framed abstract print, hand-thrown ceramics on an oak shelf, sage green accents, a single work table.
```

## 14 `salon-yonua.jpg` ｜ 4:3 ｜ A
※オープン準備中の店舗なので「これから始まる感」で
```
A new salon space still under preparation: an empty room with fresh plaster walls and a warm oak floor, a wooden stepladder and rolled kraft paper in one corner, a large bare window. A sense of quiet anticipation before opening.
```

## 15 `yonua-maruyama.jpg` ｜ 4:3 ｜ A
⚠️ **1回目はここでイギリスの街並みが出て差し戻しました。日本の指定は必ず残してください。**
```
The exterior of a small stylish beauty salon on a quiet residential street in Sapporo, Japan. A cream painted facade with a large plate-glass window, a slim maple tree beside the entrance, a narrow paved sidewalk, a utility pole with overhead wires as on any Japanese street. A blank wall panel where a sign will go. Japanese low-rise townscape. NOT European, NOT British, no brick terraced houses, no cars parked on the left side of the road.
```

## 16 `hero-esthetic.jpg` ｜ 16:9 ｜ A
```
A serene esthetic salon interior: a treatment bed in crisp white linen, a stack of folded towels, a potted plant, a frosted glass partition. No people. The left third of the frame empty for text.
```

## 17 `luster-room.jpg` ｜ 4:3 ｜ A
```
A private treatment room: a bed neatly made in white linen with a clay-toned throw folded at the foot, a small oak side table holding a ceramic diffuser, warm indirect lighting from a wall sconce.
```

## 18 `hero-eye.jpg` ｜ 16:9 ｜ A
```
An eyelash salon interior: a reclining treatment bed with a soft folded blanket, a slim rolling cart of neatly arranged tools, pale lavender and cream walls. No people. The left third of the frame empty for text.
```

## 19 `noiru-salon.jpg` ｜ 4:3 ｜ A
```
An eyelash salon room: a single reclining bed dressed in pale linen, a small shelf of neatly arranged tools, pale lavender plaster walls, a sheer curtain.
```

## 20 `hero-pilates.jpg` ｜ 16:9 ｜ A
```
A bright pilates studio: reformer machines beside tall windows, a warm oak floor, the room empty and airy. The left third of the frame empty for text.
```

## 21 `pilates-studio.jpg` ｜ 21:9（無ければ16:9）｜ A
```
A row of pilates reformers along tall windows in a minimal studio, warm oak floor, panoramic composition, no people.
```

## 22 `hero-dog.jpg` ｜ 16:9 ｜ A
```
A bright dog grooming salon: a fluffy small dog waiting calmly on a wooden grooming table, shelves of amber bottles and folded towels behind. The left third of the frame empty for text.
```

## 23 `uur-trimming.jpg` ｜ 16:10（無ければ3:2）｜ A
```
Gentle hands brushing a small fluffy dog on a grooming table with a wooden pin brush, cropped to show only the hands and the dog, no face. Caring and unhurried.
```

## 24 `oyatsu.jpg` ｜ 16:10（無ければ3:2）｜ A
```
A flat lay of natural dog treats: dried venison strips and tuna pieces in a small matte ceramic dish on pale linen, a few crumbs scattered, one dried sprig.
```

## 25 `hero-bar.jpg` ｜ 16:9 ｜ **B**
```
A dark bar interior at night: a backlit bottle shelf glowing amber behind a long counter of polished dark walnut, the empty counter in the foreground. The left third of the frame left in deep shadow for text.
```

## 26 `bar-interior.jpg` ｜ 21:9（無ければ16:9）｜ **B**
```
A panoramic view of a members-only bar: a counter with leather stools, warm pendant lights, a champagne bucket on the bar, deep browns and antique brass. No people.
```

---

26枚すべて終わったら「全部できました」と教えてください。

## 📋 コピー範囲：ここまで

---

# 生成後にやること

## 1. ダウンロードして1つのフォルダにまとめる

ファイル名は上記のもの（`hero-home.jpg` 等）が確実です。
`image_01.png` のような名前でも**番号が合っていれば自動判定**します。
形式は JPG / PNG / WEBP どれでもOK、サイズもバラバラで構いません。

## 2. アップロードする

👉 https://github.com/playmark0227-svg/shogosan/upload/gh-pages/images/_inbox

ドラッグ＆ドロップ →「Commit changes」を押すだけです。

## 3. 「画像アップしたよ」と伝える

あとは自動で、スロット判定 → 中央トリミング → リサイズ・圧縮（300KB以下）→
配置 → 公開 まで行います。**1枚ずつでも、途中まででもOK**です。
