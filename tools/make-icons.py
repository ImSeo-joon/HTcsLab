"""从原始 logo 生成整套站点 / 应用图标。

用法（在项目根目录）：
    "C:/Users/hp/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe" tools/make-icons.py

产物写入 assets/img/。想换 logo：把新图覆盖成 tools/logo-source.jpg 再跑一次；
如果新图的徽标位置不同，先跑 tools/icon-analyze.py 看行扫描结果，再改下面的 MARK_BOX。
"""
import collections
import os

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.dirname(HERE)
SRC = os.path.join(HERE, "logo-source.jpg")
OUT = os.path.join(PROJECT, "assets", "img")

# 徽标（HT 字母 + 轨道）在原图中的位置。原图 1254×1254：
# 行扫描显示徽标本体在 y 348..668，底部文字从 y 732 才开始，所以裁到 684 干净。
MARK_BOX = (240, 336, 1028, 684)

os.makedirs(OUT, exist_ok=True)

src = Image.open(SRC).convert("RGB")
W, H = src.size

# ---- 采样品牌色 ----
small = src.resize((200, 200))
pixels = list(small.getdata())
bg = collections.Counter(pixels).most_common(1)[0][0]


def is_azure(c):
    r, g, b = c
    return b > 150 and b - r > 45 and g > r


azure_pool = [c for c in pixels if is_azure(c)]


def hexs(c):
    return "#%02x%02x%02x" % c


if azure_pool:
    bright = sorted(azure_pool, key=lambda c: c[2] - c[0])[-max(1, len(azure_pool) // 20):]
    orbit = tuple(sum(c[i] for c in bright) // len(bright) for i in range(3))
    print("主色 accent:", hexs(orbit), orbit)
else:
    print("主色 accent: 未找到轨道蓝")
print("底色 bg    :", hexs(bg), bg)

mono = src.crop(MARK_BOX)
print("徽标裁剪   :", MARK_BOX, "->", mono.size)


def square_icon(canvas, width_ratio, size):
    """把徽标按比例居中放进方形底色画布，再缩到目标尺寸。"""
    w = max(1, int(canvas * width_ratio))
    h = max(1, round(mono.height * w / mono.width))
    scaled = mono.resize((w, h), Image.LANCZOS)
    out = Image.new("RGB", (canvas, canvas), bg)
    out.paste(scaled, ((canvas - w) // 2, (canvas - h) // 2))
    if size != canvas:
        out = out.resize((size, size), Image.LANCZOS)
    return out


def rounded(img, ratio):
    """给图标加圆角（透明角）。iOS 与 maskable 图标由系统自己裁形状，保持方形。"""
    size = img.size[0]
    radius = int(size * ratio)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img.convert("RGBA"), (0, 0), mask)
    return out


def save_icon(size, name, ratio=0.80):
    img = square_icon(1024, ratio, size)
    if name.startswith(("mark-", "favicon")) and "maskable" not in name:
        img = rounded(img, 0.22)
    img.save(os.path.join(OUT, name), optimize=True)
    print("  ", name, size)


# 完整原图（首页版面用）
src.resize((1024, 1024), Image.LANCZOS).save(os.path.join(OUT, "logo.jpg"),
                                             quality=92, optimize=True)
print("   logo.jpg 1024")

save_icon(96, "mark-96.png", 0.94)
save_icon(192, "mark-192.png", 0.92)
save_icon(512, "mark-512.png", 0.90)
save_icon(180, "apple-touch-icon.png", 0.86)
save_icon(32, "favicon-32.png", 0.96)
save_icon(48, "favicon-48.png", 0.96)

# maskable：徽标只占画布 76%，落在 80% 安全区内
square_icon(1050, 0.76, 512).save(os.path.join(OUT, "mark-maskable-512.png"), optimize=True)
print("   mark-maskable-512.png 512")


# 透明版：把品牌底色扣成透明，只适合深色底
def to_alpha(image, base):
    rgba = image.convert("RGBA")
    data = rgba.load()
    br, bgr, bb = base
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, _ = data[x, y]
            dist = max(abs(r - br), abs(g - bgr), abs(b - bb))
            if dist < 14:
                alpha = 0
            elif dist > 104:
                alpha = 255
            else:
                alpha = int((dist - 14) * 255 / 90)
            data[x, y] = (r, g, b, alpha)
    return rgba


alpha_mark = to_alpha(mono, bg)
size = 512
w = int(size * 0.94)
h = max(1, round(alpha_mark.height * w / alpha_mark.width))
canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
resized = alpha_mark.resize((w, h), Image.LANCZOS)
canvas.paste(resized, ((size - w) // 2, (size - h) // 2), resized)
canvas.save(os.path.join(OUT, "mark-alpha-512.png"), optimize=True)
print("   mark-alpha-512.png 512")

# 页头横向徽标（徽标 + 品牌底色 + 内边距）
PAD_X, PAD_Y = 16, 14
wide = Image.new("RGB", (mono.width + PAD_X * 2, mono.height + PAD_Y * 2), bg)
wide.paste(mono, (PAD_X, PAD_Y))
wide.save(os.path.join(OUT, "mark-wide.png"), optimize=True)
print("   mark-wide.png", wide.size)

# 多尺寸 ICO：浏览器标签页与 Windows 桌面快捷方式都用它
rounded(square_icon(512, 0.92, 256), 0.22).save(
    os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64)]
)
print("   favicon.ico 16/24/32/48/64")

# 社交分享封面 1200×630
cover = Image.new("RGB", (1200, 630), bg)
plate = src.resize((560, 560), Image.LANCZOS)
cover.paste(plate, (48, (630 - 560) // 2))
draw = ImageDraw.Draw(cover)
draw.line([(660, 200), (1152, 200)], fill=orbit if azure_pool else bg, width=3)
draw.line([(660, 430), (1152, 430)], fill=orbit if azure_pool else bg, width=3)
cover.save(os.path.join(OUT, "og-cover.png"), optimize=True)
print("   og-cover.png 1200x630")

print("\n完成，输出目录:", OUT)
