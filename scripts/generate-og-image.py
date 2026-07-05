"""Generate the site's Open Graph / Twitter share image (public/og-image.png).

This is a MANUAL, one-off asset-generation utility. It is NOT part of
`npm run build` and is NOT an npm/Node dependency — nothing in the JS
toolchain imports or invokes this script. Run it by hand whenever the
share image needs to be regenerated:

    python3 scripts/generate-og-image.py

Requirements: Python 3 + Pillow (`pip install Pillow`). Nothing else is
required for the core image. If the `cairosvg` package also happens to be
installed, the script additionally composites a small rasterized wordmark
onto the image as a best-effort nice-to-have; its absence (or any
rendering failure) is silently ignored and never blocks the main output.

Composites, in order, onto a 1200x630 canvas (the standard OG image size):
  1. A center-cropped, downscaled `public/background.png` backdrop.
  2. A flat semi-transparent black overlay for text legibility.
  3. A two-line bold headline (issue #12: a "punchier" share image needs a
     large readable headline and one clear idea, not just a raw screenshot).
  4. A bordered screenshot inset (`public/writing-screen-light.png`, title
     bar and in-app header row cropped off) in the bottom-right corner.
  5. Optionally, a small rasterized brand wordmark near the top-left.

Output: overwrites `public/og-image.png` (1200x630 PNG).

Note on source assets: `public/background.png` and `public/writing-screen-light.png`
both carry leftover UI chrome/copy from an earlier product name (pre-existing on
production today, unrelated to and out of scope for this script). Neither asset
is edited here — see BACKDROP_BLUR_RADIUS and SCREENSHOT_TOP_CROP_FRAC below for
how each is composited around that.
"""

import io
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

CANVAS_W, CANVAS_H = 1200, 630

BACKGROUND_PATH = PUBLIC / "background.png"
SCREENSHOT_PATH = PUBLIC / "writing-screen-light.png"
WORDMARK_SVG_PATH = PUBLIC / "Wordmark-white.svg"
OUTPUT_PATH = PUBLIC / "og-image.png"

FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FONT_BOLD_FALLBACK = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

BACKDROP_BLUR_RADIUS = 10  # public/background.png embeds a product screenshot (with
# stale UI chrome/branding) roughly centered in the frame — no 1200x630 crop of it
# can dodge that region entirely, so it's blurred into abstract color/shape (a
# standard "photo backdrop behind bold text" technique) rather than left sharp.
OVERLAY_ALPHA = 130  # 0-255; darkens the (blurred) backdrop so headline text pops

TEXT_MARGIN_X = 64
TEXT_MAX_WIDTH = 660  # keeps the headline within roughly the left 60% of the canvas

HEADLINE_1_TEXT = "Fix text anywhere on Mac"
HEADLINE_1_START_SIZE = 72
HEADLINE_1_MIN_SIZE = 40
HEADLINE_1_COLOR = (245, 245, 247, 255)  # near-white #F5F5F7

HEADLINE_2_TEXT = "No servers. No token bills."
HEADLINE_2_START_SIZE = 42
HEADLINE_2_MIN_SIZE = 26
HEADLINE_2_COLOR = (116, 234, 174, 255)  # accent mint-green #74EAAE

LINE_GAP = 22  # vertical gap between the two headline lines

WORDMARK_TOP_LEFT = (64, 40)
WORDMARK_WIDTH = 240
WORDMARK_HEADLINE_GAP = 34  # gap between the wordmark and headline line 1
NO_WORDMARK_HEADLINE_TOP = 130  # headline top when the wordmark step is skipped

SCREENSHOT_TOP_CROP_FRAC = 0.19  # crops off the macOS title bar AND the in-app
# header row (both carry a stale product-name label from an earlier rebrand,
# pre-existing on production today — see module docstring); this lands right
# at the generic "Input (Editable)/Result" column headers.
SCREENSHOT_TARGET_WIDTH = 620
SCREENSHOT_BORDER = 6
SCREENSHOT_MARGIN_RIGHT = 56
SCREENSHOT_MARGIN_BOTTOM = 56


def _font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.truetype(FONT_BOLD_FALLBACK, size)


def _fit_font(draw, text, start_size, min_size, max_width):
    """Shrink from `start_size` until `text` fits within `max_width`."""
    size = start_size
    while size > min_size:
        font = _font(FONT_BOLD, size)
        bbox = draw.textbbox((0, 0), text, font=font, anchor="lt")
        if bbox[2] - bbox[0] <= max_width:
            return font, bbox
        size -= 2
    font = _font(FONT_BOLD, min_size)
    return font, draw.textbbox((0, 0), text, font=font, anchor="lt")


def build_backdrop():
    """Center-crop public/background.png to the 1200x630 aspect ratio, then
    downscale with LANCZOS. Only the width is cropped (height kept full), so
    this never upscales the source image."""
    bg = Image.open(BACKGROUND_PATH).convert("RGB")
    bg_w, bg_h = bg.size
    crop_w = round(bg_h * (CANVAS_W / CANVAS_H))
    left = (bg_w - crop_w) // 2
    cropped = bg.crop((left, 0, left + crop_w, bg_h))
    resized = cropped.resize((CANVAS_W, CANVAS_H), Image.Resampling.LANCZOS)
    return resized.filter(ImageFilter.GaussianBlur(BACKDROP_BLUR_RADIUS))


def add_legibility_overlay(canvas):
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, OVERLAY_ALPHA))
    return Image.alpha_composite(canvas.convert("RGBA"), overlay)


def _paste_wordmark(canvas):
    """Best-effort brand mark: rasterize Wordmark-white.svg and paste it
    top-left. Any failure (missing cairosvg, render error, etc.) is swallowed
    and skipped — the headline + screenshot alone already satisfy the issue,
    so this step must never block the main deliverable."""
    try:
        import cairosvg  # optional dev-time dependency; see module docstring

        wordmark_h = round(WORDMARK_WIDTH * (200 / 720))
        png_bytes = cairosvg.svg2png(
            url=str(WORDMARK_SVG_PATH),
            output_width=WORDMARK_WIDTH,
            output_height=wordmark_h,
        )
        wordmark = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
        canvas.paste(wordmark, WORDMARK_TOP_LEFT, wordmark)
        return wordmark_h
    except Exception as exc:  # pragma: no cover - best-effort, never fatal
        print(f"[generate-og-image] wordmark skipped ({exc})")
        return None


def draw_headline(canvas):
    draw = ImageDraw.Draw(canvas)

    wordmark_h = _paste_wordmark(canvas)
    if wordmark_h is not None:
        cursor_y = WORDMARK_TOP_LEFT[1] + wordmark_h + WORDMARK_HEADLINE_GAP
    else:
        cursor_y = NO_WORDMARK_HEADLINE_TOP

    font1, bbox1 = _fit_font(draw, HEADLINE_1_TEXT, HEADLINE_1_START_SIZE, HEADLINE_1_MIN_SIZE, TEXT_MAX_WIDTH)
    draw.text((TEXT_MARGIN_X, cursor_y), HEADLINE_1_TEXT, font=font1, fill=HEADLINE_1_COLOR, anchor="lt")
    cursor_y = cursor_y + (bbox1[3] - bbox1[1]) + LINE_GAP

    font2, bbox2 = _fit_font(draw, HEADLINE_2_TEXT, HEADLINE_2_START_SIZE, HEADLINE_2_MIN_SIZE, TEXT_MAX_WIDTH)
    draw.text((TEXT_MARGIN_X, cursor_y), HEADLINE_2_TEXT, font=font2, fill=HEADLINE_2_COLOR, anchor="lt")
    headline_bottom = cursor_y + (bbox2[3] - bbox2[1])

    print(f"[generate-og-image] headline block bottom: {headline_bottom}px (canvas height {CANVAS_H})")
    return canvas


def paste_screenshot_inset(canvas):
    """Crop the macOS title bar and in-app header row off the top of the
    screenshot, downscale to a card-sized inset with a plain white border,
    and paste it bottom-right."""
    shot = Image.open(SCREENSHOT_PATH).convert("RGB")
    shot_w, shot_h = shot.size
    top_crop = round(shot_h * SCREENSHOT_TOP_CROP_FRAC)
    content = shot.crop((0, top_crop, shot_w, shot_h))

    scale = SCREENSHOT_TARGET_WIDTH / content.width
    target_h = round(content.height * scale)
    resized = content.resize((SCREENSHOT_TARGET_WIDTH, target_h), Image.Resampling.LANCZOS)
    bordered = ImageOps.expand(resized, border=SCREENSHOT_BORDER, fill="white")

    x = CANVAS_W - SCREENSHOT_MARGIN_RIGHT - bordered.width
    y = CANVAS_H - SCREENSHOT_MARGIN_BOTTOM - bordered.height
    canvas.paste(bordered, (x, y))
    print(f"[generate-og-image] screenshot inset: {bordered.size} at ({x}, {y})")
    return canvas


def main():
    canvas = build_backdrop()
    canvas = add_legibility_overlay(canvas)
    canvas = draw_headline(canvas)
    canvas = paste_screenshot_inset(canvas)
    canvas.convert("RGB").save(OUTPUT_PATH, "PNG", optimize=True)
    print(f"[generate-og-image] wrote {OUTPUT_PATH} ({canvas.width}x{canvas.height})")


if __name__ == "__main__":
    main()
