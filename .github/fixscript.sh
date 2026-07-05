set -e
pip install ftfy==6.3.1 --quiet 2>/dev/null || pip install ftfy==6.3.1 --quiet --break-system-packages
# 1. WhatsApp-nummer
grep -rlZ "31638531012" --include="*.html" . | xargs -0 -r sed -i 's/31638531012/31640837590/g'
# 2. BTW-labels excl -> incl
grep -rlZ "/m&sup2; excl. BTW" --include="*.html" . | xargs -0 -r sed -i 's|/m&sup2; excl. BTW|/m\&sup2; incl. BTW|g'
grep -rlZ "/m² excl. BTW" --include="*.html" . | xargs -0 -r sed -i 's|/m² excl. BTW|/m² incl. BTW|g'
grep -rlZ "(excl. BTW, vanaf 100m&sup2;)" --include="*.html" . | xargs -0 -r sed -i 's|(excl. BTW, vanaf 100m&sup2;)|(incl. BTW, vanaf 100m\&sup2;)|g'
grep -rlZ "(excl. BTW, vanaf 100m²)" --include="*.html" . | xargs -0 -r sed -i 's|(excl. BTW, vanaf 100m²)|(incl. BTW, vanaf 100m²)|g'
grep -rlZ "per m² exclusief BTW" --include="*.html" . | xargs -0 -r sed -i 's|per m² exclusief BTW|per m² inclusief BTW|g'
# 3. Rekenvoorbeelden
sed -i 's|&euro;2.600 excl. BTW|\&euro;3.000 incl. BTW|g' wat-kost-renovlies/index.html renovlies-prijs-per-m2/index.html
# 4. Typo's
sed -i 's/bepaalderd/beoordeeld/g' index.html
sed -i 's/ foor alleen renovlies/ voor alleen renovlies/; s/u\.a\. €/v.a. €/' renovlies-zwijndrecht/index.html
sed -i 's/geschikt voor Zowel nieuwbouw/geschikt voor zowel nieuwbouw/' renovlies-papendrecht/index.html
# 5. Stadslijsten
sed -i 's/Sliedrecht, Dordrecht, Zwijndrecht, Sliedrecht, Sliedrecht en Sliedrecht/Sliedrecht, Dordrecht, Zwijndrecht, Papendrecht, Alblasserdam en Hendrik-Ido-Ambacht/' renovlies-sliedrecht/index.html
sed -i 's/Papendrecht, Dordrecht, Zwijndrecht, Papendrecht, Papendrecht en Sliedrecht/Papendrecht, Dordrecht, Zwijndrecht, Alblasserdam, Sliedrecht en Hendrik-Ido-Ambacht/' renovlies-papendrecht/index.html
sed -i 's/Alblasserdam, Dordrecht, Zwijndrecht, Papendrecht, Alblasserdam en Sliedrecht/Alblasserdam, Dordrecht, Zwijndrecht, Papendrecht, Sliedrecht en Hendrik-Ido-Ambacht/' renovlies-alblasserdam/index.html
# 6. Wijktekst Papendrecht
sed -i 's/Wij werken regelmatig in de Kinderdijk-wijk, de nieuwbouwwijken langs de Alblas en in bestaande woningen door het centrum./Wij werken regelmatig in Westpolder, Wilgendonk, de nieuwbouwwijken langs de Merwede en in bestaande woningen door het centrum./' renovlies-papendrecht/index.html
# 7. Homepage mini-calculator
sed -i 's/if(cwPkg===1)base=13;else if(cwPkg===2)base=15.5;else base=17.5;/if(cwPkg===1)base=15;else if(cwPkg===2)base=17.5;else base=19.5;/' index.html
sed -i 's/subEl.textContent="excl. BTW • "/subEl.textContent="incl. BTW • "/' index.html
sed -i 's/cwFmt(total)+" excl. BTW\\n\\nIk ontvang graag/cwFmt(total)+" incl. BTW\\n\\nIk ontvang graag/' index.html
# 8. Homepage JSON-LD + regio-FAQ
sed -i 's/Vanaf €16,50 per m2/Vanaf €15,00 per m2/' index.html
sed -i 's|We zijn werkzaam door heel Nederland, met focus op Utrecht, Rotterdam, Den Haag en Breda.|Onze thuisbasis is Dordrecht. Van daaruit werken wij dagelijks in de Drechtsteden en heel Zuid-Holland, maar wij zijn werkzaam door heel Nederland.|' index.html
# 9. Calculatorpagina
F=prijscalculator/index.html
sed -i 's/data-package="glasvlies" data-price="17.50"/data-package="glasvlies" data-price="19.50"/' $F
sed -i 's/data-package="premium" data-price="15.50"/data-package="premium" data-price="17.50"/' $F
sed -i 's/data-package="alles" data-price="13.00"/data-package="alles" data-price="15.00"/' $F
sed -i 's/Excl. BTW | Vanaf 100 m&sup2;/Incl. BTW | Vanaf 100 m\&sup2;/' $F
sed -i 's/15 mnd garantie/12 mnd garantie/' $F
sed -i 's/excl. BTW &bull; inclusief materiaal/incl. BTW \&bull; inclusief materiaal/' $F
python3 - <<'EOF'
p='prijscalculator/index.html'
s=open(p).read()
s=s.replace("""  const total = area * selectedPrice;
  const btw = total * 0.21;
  const totalBTW = total + btw;""","""  const total = area * selectedPrice; // incl. BTW
  const totalExcl = total / 1.21;
  const btw = total - totalExcl;""")
s=s.replace("document.getElementById('pkgTotal').textContent = formatCurrency(total);","document.getElementById('pkgTotal').textContent = formatCurrency(totalExcl);")
s=s.replace("document.getElementById('pkgTotalBTW').textContent = formatCurrency(totalBTW);","document.getElementById('pkgTotalBTW').textContent = formatCurrency(total);")
s=s.replace("'Richtprijs: ' + formatCurrency(total) + ' excl. BTW\\n\\n'","'Richtprijs: ' + formatCurrency(total) + ' incl. BTW\\n\\n'")
s=s.replace('"priceRange":"\\u20AC15,00 - \\u20AC17,50"','"priceRange":"\\u20AC15,00 - \\u20AC19,50"')
open(p,'w').write(s)
EOF
# 10. Mojibake herstellen
python3 - <<'EOF'
import ftfy
files=["stucwerk-of-behangen/index.html","meer-over-sauzen/index.html","renovlies-ijsselstein/index.html","meer-over-wandafwerking/index.html","meer-over-stucwerk/index.html","stucwerk-kosten/index.html","renovlies-zelf-doen/index.html","renovlies-schilderen/index.html","sausklaar-opleveren/index.html","renovlies-amersfoort/index.html"]
for f in files:
    s=open(f,encoding='utf-8').read()
    out=[]
    for line in s.split('\n'):
        out.append(ftfy.fix_text(line) if any(m in line for m in ('Â','â','Ã')) else line)
    open(f,'w',encoding='utf-8').write('\n'.join(out))
EOF
# 11. Amersfoort + prijsnotities
sed -i 's|(exclusief BTW). Dit is veel goedkoper|(inclusief BTW). Dit is veel goedkoper|' renovlies-amersfoort/index.html
sed -i 's|Alle prijzen zijn exclusief BTW en gelden bij projecten vanaf 100 m²|Alle prijzen zijn inclusief BTW en gelden bij projecten vanaf 100 m²|' blog/renovlies-dordrecht/index.html
sed -i 's|Alle prijzen zijn exclusief BTW. Wij hanteren geen aanbetaling|Alle prijzen zijn inclusief BTW. Wij hanteren geen aanbetaling|' renovlies-behangen/index.html
# 12. Burenkorting
python3 - <<'EOF'
p='burenkorting/index.html'
s=open(p).read()
s=s.replace('<span class="label">Normaal tarief (Alles-in-een pakket, excl. BTW)</span>\n      <span class="value">270m&sup2; &times; &euro;17,50 = &euro;4.185,-</span>',
            '<span class="label">Normaal tarief (Alles-in-een pakket, incl. BTW)</span>\n      <span class="value">270m&sup2; &times; &euro;15,00 = &euro;4.050,-</span>')
s=s.replace('<span class="value">- &euro;209,25</span>','<span class="value">- &euro;202,50</span>')
s=s.replace('<span class="label">Uw buurman betaalt (excl. BTW)</span>\n      <span class="value">&euro;3.975,75</span>',
            '<span class="label">Uw buurman betaalt (incl. BTW)</span>\n      <span class="value">&euro;3.847,50</span>')
s=s.replace('<li>Alle genoemde prijzen zijn exclusief BTW</li>','<li>Alle genoemde prijzen zijn inclusief BTW</li>')
open(p,'w').write(s)
EOF
# 13. Footerlinks
grep -rlZ '<a href="#">Privacybeleid</a>' --include="*.html" . | xargs -0 -r sed -i 's|<a href="#">Privacybeleid</a>|<a href="/privacybeleid/">Privacybeleid</a>|g'
grep -rlZ '<a href="#">Algemene voorwaarden</a>' --include="*.html" . | xargs -0 -r sed -i 's|<a href="#">Algemene voorwaarden</a>|<a href="/algemene-voorwaarden/">Algemene voorwaarden</a>|g'
# 14. Contact werkgebied
sed -i 's|We zijn met name actief in Utrecht, Rotterdam, Den Haag, Amersfoort, Breda, Leiden, Gouda, Dordrecht, Houten, Nieuwegein, Woerden, IJsselstein, Zoetermeer en omstreken|We zijn met name actief in Dordrecht en de Drechtsteden, en daarnaast in Rotterdam, Den Haag, Utrecht, Amersfoort, Breda, Leiden, Gouda, Houten, Nieuwegein, Woerden, IJsselstein, Zoetermeer en omstreken|' contact/index.html
