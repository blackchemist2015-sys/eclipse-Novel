# Hand-drawn pencil look for print (B&W): pencil outlines from edges + tone by hatching + wobble + paper grain.
import sys, numpy as np, cv2
def smooth_noise(h, w, scale, rng):
    n = rng.normal(0, 1, (h // scale + 2, w // scale + 2)).astype(np.float32)
    return cv2.resize(n, (w, h), interpolation=cv2.INTER_CUBIC)
def hatch_layer(h, w, angle, spacing, rng, width=1):
    canvas = np.zeros((h, w), np.float32)
    diag = int(np.hypot(h, w)) + spacing
    c, s = np.cos(np.radians(angle)), np.sin(np.radians(angle))
    for k in range(-diag, diag, spacing):
        off = k + rng.normal(0, spacing * 0.15)
        # line: points p = center + off*n + t*d
        cx, cy = w / 2, h / 2
        nx, ny = -s, c
        x0, y0 = cx + off * nx - diag * c, cy + off * ny - diag * s
        x1, y1 = cx + off * nx + diag * c, cy + off * ny + diag * s
        cv2.line(canvas, (int(x0), int(y0)), (int(x1), int(y1)), float(rng.uniform(0.55, 1.0)), width, cv2.LINE_AA)
    return canvas
def pencil(src, dst, dark_bg=False, seed=3):
    rng = np.random.default_rng(seed)
    img = cv2.imread(src)
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
    h, w = g.shape
    gb = cv2.GaussianBlur(g, (0, 0), 1.2)
    # outlines
    gx = cv2.Sobel(gb, cv2.CV_32F, 1, 0, ksize=3); gy = cv2.Sobel(gb, cv2.CV_32F, 0, 1, ksize=3)
    edge = np.clip(np.hypot(gx, gy) / 180.0, 0, 1) ** 0.8
    # tone -> hatching
    tone = cv2.GaussianBlur((255 - g) / 255.0, (0, 0), 3)
    if dark_bg:  # night scenes: sky -> light hatching, silhouettes -> dense charcoal
        tone = np.clip((tone - 0.72) / 0.27, 0, 1) ** 1.3 * 0.95 + 0.05
    sp = max(6, w // 260)
    h1 = hatch_layer(h, w, 45, sp, rng); h2 = hatch_layer(h, w, -40, sp, rng); h3 = hatch_layer(h, w, 85, sp + 2, rng)
    shade = h1 * np.clip((tone - 0.12) * 2.2, 0, 1) + h2 * np.clip((tone - 0.38) * 2.2, 0, 1) + h3 * np.clip((tone - 0.62) * 2.5, 0, 1)
    ink = np.clip(edge * 0.95 + shade * (0.8 if dark_bg else 0.55), 0, 1)
    # keep very dark solids (text, silhouettes) as graphite fill
    if not dark_bg:
        ink = np.maximum(ink, np.clip((tone - 0.8) * 3.5, 0, 0.85))
    else:
        h4 = hatch_layer(h, w, 10, sp, rng)
        ink = np.clip(ink + h4 * np.clip((tone - 0.8) * 3.0, 0, 1) * 0.9, 0, 1)
    out = 250 - ink * 205
    # wobble (hand-drawn)
    dx = smooth_noise(h, w, 60, rng) * 1.6; dy = smooth_noise(h, w, 60, rng) * 1.6
    mx, my = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    out = cv2.remap(out.astype(np.float32), mx + dx, my + dy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
    # paper grain + graphite grain
    grain = rng.normal(0, 4, (h, w)).astype(np.float32)
    out = out + grain * (0.4 + ink * 0.0)
    out = cv2.GaussianBlur(np.clip(out, 0, 255), (0, 0), 0.6)
    cv2.imwrite(dst, out.astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 90])
if __name__ == '__main__':
    pencil(sys.argv[1], sys.argv[2], dark_bg=(len(sys.argv) > 3 and sys.argv[3] == 'dark'))
