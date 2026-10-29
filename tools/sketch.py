# Artist-style pencil sketch for print: doubled wobbly contours, short directional hatching strokes,
# smudged graphite in darks, unfinished vignette edges, paper grain. Output grayscale JPEG.
import sys, numpy as np, cv2
def noise(h, w, scale, rng):
    n = rng.normal(0, 1, (h // scale + 2, w // scale + 2)).astype(np.float32)
    return cv2.resize(n, (w, h), interpolation=cv2.INTER_CUBIC)
def warp(img, rng, amp, scale):
    h, w = img.shape
    mx, my = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    return cv2.remap(img, mx + noise(h, w, scale, rng) * amp, my + noise(h, w, scale, rng) * amp, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
def sketch(src, dst, dark=False, seed=7, width=2000):
    rng = np.random.default_rng(seed)
    img = cv2.imread(src)
    if img.shape[1] > width: img = cv2.resize(img, (width, round(img.shape[0] * width / img.shape[1])), interpolation=cv2.INTER_AREA)
    g8 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    if dark:
        g8 = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8)).apply(g8)
        g8 = cv2.normalize(g8, None, 0, 255, cv2.NORM_MINMAX)
    g = g8.astype(np.float32)
    h, w = g.shape
    tone = cv2.GaussianBlur((255 - g) / 255.0, (0, 0), 2.5)
    if dark: tone = np.clip(tone, 0, 1) ** 1.8 * 0.62
    # contours: two jittered passes
    gb = cv2.GaussianBlur(g, (0, 0), 1.0)
    e = np.hypot(cv2.Sobel(gb, cv2.CV_32F, 1, 0), cv2.Sobel(gb, cv2.CV_32F, 0, 1))
    e = np.clip(e / 160.0, 0, 1) ** 0.75
    c1 = warp(e, rng, 1.8, 50); c2 = warp(e, rng, 2.6, 35) * 0.55
    contour = np.clip(c1 + c2, 0, 1)
    # short hatching strokes
    canvas = np.zeros((h, w), np.float32)
    levels = [(0.10, 45, 1.0), (0.32, -35, 0.9), (0.55, 80, 0.85), (0.75, 10, 0.8)]
    base_len = max(10, w // 90)
    for thr, ang, alpha in levels:
        mask = np.clip((tone - thr) * 3.0, 0, 1)
        n = int(mask.sum() / (base_len * 1.1))
        if n <= 0: continue
        p = mask.ravel() / mask.sum()
        idx = rng.choice(h * w, size=min(n, 400000), p=p)
        ys, xs = np.divmod(idx, w)
        angs = np.radians(ang + rng.normal(0, 6, len(idx)))
        lens = base_len * rng.uniform(0.5, 1.4, len(idx))
        dx = np.cos(angs) * lens / 2; dy = np.sin(angs) * lens / 2
        vals = alpha * rng.uniform(0.35, 0.9, len(idx))
        for x, y, ddx, ddy, v in zip(xs, ys, dx, dy, vals):
            cv2.line(canvas, (int(x - ddx), int(y - ddy)), (int(x + ddx), int(y + ddy)), float(v), 1, cv2.LINE_AA)
    shade = np.clip(canvas, 0, 1)
    # smudge in darks
    smudge = cv2.GaussianBlur(np.clip(tone - 0.7, 0, 1), (0, 0), 5) * 0.25
    ink = np.clip(contour * 0.95 + shade * 0.75 + smudge, 0, 1)
    if not dark:
        raw = (255 - g) / 255.0
        ink = np.maximum(ink, np.clip((raw - 0.55) * 2.2, 0, 0.95))
    # unfinished vignette: fade shading toward the borders (keep contours a bit more)
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.minimum.reduce([xx, w - 1 - xx, yy, h - 1 - yy]).astype(np.float32)
    band = np.clip(d / (0.07 * min(h, w)), 0, 1)
    edge = np.clip(band + (1 - band) * noise(h, w, 80, rng) * 0.3, 0, 1)
    ink = ink * np.clip(edge, 0, 1)
    out = 248 - ink * 215 + rng.normal(0, 3.2, (h, w)).astype(np.float32)
    out = cv2.GaussianBlur(np.clip(out, 0, 255), (0, 0), 0.55)
    cv2.imwrite(dst, out.astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 84])
if __name__ == '__main__':
    sketch(sys.argv[1], sys.argv[2], dark=(len(sys.argv) > 3 and sys.argv[3] == 'dark'))
