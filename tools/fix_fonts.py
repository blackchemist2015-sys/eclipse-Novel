"""Post-process: one <w:font> entry with Regular+Bold embedded, upper-case GUID keys, embedTrueTypeFonts on."""
import re, sys, zipfile, shutil
src, dst = sys.argv[1], sys.argv[2]
zin = zipfile.ZipFile(src)
zout = zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED)
for item in zin.infolist():
    data = zin.read(item.filename)
    if item.filename == 'word/fontTable.xml':
        s = data.decode('utf-8')
        fonts = re.findall(r'<w:font w:name="Amiri">.*?</w:font>', s)
        keys = re.findall(r'<w:embedRegular r:id="(rId\d+)" w:fontKey="\{([^}]+)\}"/>', s)
        assert len(fonts) == 2 and len(keys) == 2, (len(fonts), keys)
        (r1, k1), (r2, k2) = keys
        merged = fonts[0].replace(
            f'<w:embedRegular r:id="{r1}" w:fontKey="{{{k1}}}"/>',
            f'<w:embedRegular r:id="{r1}" w:fontKey="{{{k1.upper()}}}"/><w:embedBold r:id="{r2}" w:fontKey="{{{k2.upper()}}}"/>')
        s = s.replace(fonts[0] + fonts[1], merged)
        data = s.encode('utf-8')
    elif item.filename == 'word/settings.xml':
        s = data.decode('utf-8')
        if 'embedTrueTypeFonts' not in s:
            m = re.search(r'<w:displayBackgroundShape[^>]*/>', s) or re.search(r'<w:zoom[^>]*/>', s) or re.search(r'<w:settings[^>]*>', s)
            s = s[:m.end()] + '<w:embedTrueTypeFonts/>' + s[m.end():]
        data = s.encode('utf-8')
    zout.writestr(item, data)
zout.close()
print('ok')
