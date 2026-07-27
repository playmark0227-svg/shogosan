#!/usr/bin/env python3
"""
images/_inbox/ に置かれた画像を、サイトの正しいスロットへ自動で取り込むスクリプト。

やること:
  1. _inbox/ の画像を読む（ファイル名は多少ゆるくてもOK。キーワードで自動判定）
  2. スロットごとの規定アスペクト比に中央クロップ
  3. 規定の幅にリサイズし、JPEG で圧縮（目標 300KB 以下）
  4. images/<正式名>.jpg として保存
  5. 取り込めたものは _inbox/ から削除

使い方:
  python3 tools/import-images.py            # 取り込み実行
  python3 tools/import-images.py --dry-run  # 判定結果だけ表示（保存しない）
"""
import os, sys, re, shutil
from PIL import Image, ImageOps

ROOT   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, "images")
INBOX  = os.path.join(IMAGES, "_inbox")

# 正式名 → (アスペクト比 w/h, 出力幅, 判定キーワード)
# キーワードはファイル名を小文字化して部分一致で探す。先に書いたものが優先。
SLOTS = [
    ("hero-home",       (16, 9),  1920, ["hero-home", "herohome", "home-hero", "01", "メイン", "トップ"]),
    ("concept",         (21, 9),  1920, ["concept", "コンセプト", "02"]),
    ("tile-yonua",      (4, 3),   1200, ["tile-yonua", "tileyonua", "03"]),
    ("tile-pianeta",    (4, 3),   1200, ["tile-pianeta", "tilepianeta", "04"]),
    ("tile-uru",        (4, 3),   1200, ["tile-uru", "tileuru", "05"]),
    ("tile-luster",     (4, 3),   1200, ["tile-luster", "tileluster", "06"]),
    ("tile-noiru",      (4, 3),   1200, ["tile-noiru", "tilenoiru", "07"]),
    ("tile-pilates",    (4, 3),   1200, ["tile-pilates", "tilepilates", "08"]),
    ("tile-uur",        (4, 3),   1200, ["tile-uur", "tileuur", "09"]),
    ("tile-bar",        (4, 3),   1200, ["tile-bar", "tilebar", "10"]),
    ("hero-nail",       (16, 9),  1920, ["hero-nail", "heronail", "11"]),
    ("salon-pianeta",   (4, 3),   1200, ["salon-pianeta", "salonpianeta", "pianeta", "12"]),
    ("salon-uru",       (4, 3),   1200, ["salon-uru", "salonuru", "uru", "13"]),
    ("salon-yonua",     (4, 3),   1200, ["salon-yonua", "salonyonua", "14"]),
    ("yonua-maruyama",  (4, 3),   1200, ["maruyama", "円山", "yonua-maru", "15"]),
    ("hero-esthetic",   (16, 9),  1920, ["hero-esthetic", "heroesthetic", "16"]),
    ("luster-room",     (4, 3),   1200, ["luster-room", "lusterroom", "luster", "17"]),
    ("hero-eye",        (16, 9),  1920, ["hero-eye", "heroeye", "18"]),
    ("noiru-salon",     (4, 3),   1200, ["noiru-salon", "noirusalon", "noiru", "19"]),
    ("hero-pilates",    (16, 9),  1920, ["hero-pilates", "heropilates", "20"]),
    ("pilates-studio",  (21, 9),  1920, ["pilates-studio", "pilatesstudio", "pilates", "21"]),
    ("hero-dog",        (16, 9),  1920, ["hero-dog", "herodog", "22"]),
    ("uur-trimming",    (16, 10), 1400, ["trimming", "トリミング", "uur-trim", "23"]),
    ("oyatsu",          (16, 10), 1400, ["oyatsu", "おやつ", "treat", "24"]),
    ("hero-bar",        (16, 9),  1920, ["hero-bar", "herobar", "25"]),
    ("bar-interior",    (21, 9),  1920, ["bar-interior", "barinterior", "interior", "26"]),
]
EXTS = (".jpg", ".jpeg", ".png", ".webp", ".avif", ".jfif")
TARGET_KB = 300


def match_slot(filename, taken):
    """ファイル名から正式スロット名を推定。既に埋まったスロットは飛ばす。"""
    name = os.path.splitext(filename)[0].lower().replace("_", "-").replace(" ", "-")
    # ① 正式名と完全一致 / 前方一致
    for slot, ar, w, kws in SLOTS:
        if slot in taken:
            continue
        if name == slot or name.startswith(slot):
            return slot, ar, w
    # ② キーワード一致（長いキーワードから順に見て誤爆を減らす）
    best = None
    for slot, ar, w, kws in SLOTS:
        if slot in taken:
            continue
        for kw in sorted(kws, key=len, reverse=True):
            if kw in name:
                if best is None or len(kw) > best[3]:
                    best = (slot, ar, w, len(kw))
                break
    if best:
        return best[0], best[1], best[2]
    return None, None, None


def process(src, slot, ar, width, dry=False):
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)          # 回転情報を反映
    if im.mode in ("RGBA", "LA", "P"):        # 透過は白背景に載せる
        bg = Image.new("RGB", im.size, (255, 255, 255))
        im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")

    target_ratio = ar[0] / ar[1]
    w, h = im.size
    cur = w / h
    # 中央クロップして規定比率に合わせる
    if abs(cur - target_ratio) > 0.01:
        if cur > target_ratio:                 # 横に広い → 左右を削る
            nw = int(h * target_ratio)
            left = (w - nw) // 2
            im = im.crop((left, 0, left + nw, h))
        else:                                  # 縦に長い → 上下を削る
            nh = int(w / target_ratio)
            top = (h - nh) // 2
            im = im.crop((0, top, w, top + nh))

    if im.width > width:
        im = im.resize((width, int(width / target_ratio)), Image.LANCZOS)

    out = os.path.join(IMAGES, slot + ".jpg")
    if dry:
        return out, im.size, None

    # 目標容量に収まるまで品質を落とす
    for q in (86, 80, 74, 68, 62, 56):
        im.save(out, "JPEG", quality=q, optimize=True, progressive=True)
        kb = os.path.getsize(out) / 1024
        if kb <= TARGET_KB:
            break
    return out, im.size, kb


def main():
    dry = "--dry-run" in sys.argv
    if not os.path.isdir(INBOX):
        print("images/_inbox/ がありません。作成します。")
        os.makedirs(INBOX, exist_ok=True)
        return 0

    files = sorted(f for f in os.listdir(INBOX)
                   if f.lower().endswith(EXTS) and not f.startswith("."))
    if not files:
        print("images/_inbox/ に画像がありません。")
        return 0

    taken, done, skipped = set(), [], []
    print(f"{len(files)} 件を処理します{'（ドライラン）' if dry else ''}\n")
    for f in files:
        src = os.path.join(INBOX, f)
        slot, ar, width = match_slot(f, taken)
        if not slot:
            skipped.append((f, "スロット名を判定できませんでした"))
            continue
        try:
            out, size, kb = process(src, slot, ar, width, dry)
        except Exception as e:
            skipped.append((f, f"読み込み失敗: {e}"))
            continue
        taken.add(slot)
        done.append((f, slot, size, kb))
        size_s = f"{size[0]}x{size[1]}"
        kb_s = f"{kb:.0f}KB" if kb else "-"
        print(f"  ✓ {f}\n      → images/{slot}.jpg  {size_s}  {kb_s}")
        if not dry:
            os.remove(src)

    if skipped:
        print("\n取り込めなかったファイル:")
        for f, why in skipped:
            print(f"  ✗ {f} … {why}")
        print("\n  → ファイル名に slot 名（例: tile-noiru）か番号（例: 07）を入れてください。")

    remaining = [s[0] for s in SLOTS
                 if not os.path.exists(os.path.join(IMAGES, s[0] + ".jpg"))]
    print(f"\n取り込み {len(done)} 件 / 未着 {len(remaining)} 件")
    if remaining:
        print("未着:", ", ".join(remaining))
    return 0


if __name__ == "__main__":
    sys.exit(main())
