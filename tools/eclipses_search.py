import swisseph as swe, json, sys
FL = swe.FLG_MOSEPH
places = {'cairo': (31.2357, 30.0444, 23), 'thebes': (32.6396, 25.6872, 76), 'amarna': (30.8960, 27.6450, 50)}
start = swe.julday(-1400, 1, 1, 0, swe.JUL_CAL)
end = swe.julday(2100, 1, 1, 0, swe.GREG_CAL)
def date(jd):
    greg = jd >= 2299160.5
    y, m, d, h = swe.revjul(jd, swe.GREG_CAL if greg else swe.JUL_CAL)
    return y, m, d, h, 'G' if greg else 'J'
out = {}
for name, (lon, lat, alt) in places.items():
    geo = (lon, lat, alt); t = start; res = []
    while t < end:
        rf, tret, attr = swe.sol_eclipse_when_loc(t, geo, FL, False)
        if rf & swe.ECL_TOTAL and rf & swe.ECL_VISIBLE:
            tmax = tret[0]
            # duration of totality at place
            dur = (tret[3] - tret[2]) * 86400 if tret[2] and tret[3] else 0
            ut = date(tmax)
            # sun altitude at max
            res.append({'jd': tmax, 'date': ut, 'dur_s': round(dur), 'mag': round(attr[0], 4), 'sun_alt': round(attr[5], 1)})
        t = tret[0] + 25
    out[name] = res
    print(name, len(res), file=sys.stderr)
json.dump(out, open(sys.argv[1], 'w'), ensure_ascii=False, indent=1)
