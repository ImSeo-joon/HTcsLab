"""测量 logo 原图：尺寸、主色、各行亮像素分布，用来确定徽标的裁剪范围。

徽标边界不确定时先跑这个脚本，再回去改 tools/make-icons.py 里的 MARK_BOX。
"""
import collections
import os

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "logo-source.jpg")

img = Image.open(SRC).convert("RGB")
W, H = img.size
print("尺寸:", W, "x", H)

small = img.resize((160, 160))
counts = collections.Counter(small.getdata())
print("主要颜色:")
for color, n in counts.most_common(5):
    print("   #%02x%02x%02x" % color, color, n)

px = img.load()


def lum(c):
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


print("\n每一行亮像素的分布（找出徽标与文字之间的空隙）:")
prev = False
for y in range(0, H, 4):
    n = sum(1 for x in range(0, W, 2) if lum(px[x, y]) > 150)
    on = n > 3
    if on != prev:
        print(("  开始" if on else "  结束"), "y =", y, " 亮像素", n)
        prev = on
