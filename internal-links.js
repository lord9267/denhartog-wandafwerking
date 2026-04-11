// Interne links module - voegt automatisch relevante gerelateerde pagina's toe
(function() {
  'use strict';

  // Definieer pagina-categorieën en hun relaties
  var diensten = [
    {url: '/renovlies-behangen/', naam: 'Renovlies Behangen'},
    {url: '/glasvliesbehang/', naam: 'Glasvliesbehang'},
    {url: '/latex-spuiten/', naam: 'Latex Spuiten'},
    {url: '/glasvezel-behang/', naam: 'Glasvezel Behang'},
    {url: '/glasvezelbehanger/', naam: 'Glasvezelbehanger'},
    {url: '/glasvezelbehang-nieuwbouw/', naam: 'Glasvezelbehang Nieuwbouw'},
    {url: '/renovlies-nieuwbouw/', naam: 'Renovlies Nieuwbouw'},
    {url: '/wandafwerking-nieuwbouw/', naam: 'Wandafwerking Nieuwbouw'},
    {url: '/nieuwbouw-muren-afwerken/', naam: 'Nieuwbouw Muren Afwerken'},
    {url: '/nieuwbouw-behangen/', naam: 'Nieuwbouw Behangen'},
    {url: '/renovlies-aanbrengen/', naam: 'Renovlies Aanbrengen'},
    {url: '/renovlies-op-plafond/', naam: 'Renovlies op Plafond'},
    {url: '/renovlies-behangservice/', naam: 'Renovlies Behangservice'},
    {url: '/scanbehang/', naam: 'Scanbehang'}
  ];

  var prijzen = [
    {url: '/renovlies-prijs-per-m2/', naam: 'Renovlies Prijs per m\u00B2'},
    {url: '/renovlies-behang-prijs/', naam: 'Renovlies Behang Prijs'},
    {url: '/wat-kost-renovlies/', naam: 'Wat Kost Renovlies?'},
    {url: '/goedkoop-renovlies/', naam: 'Goedkoop Renovlies'},
    {url: '/stucwerk-kosten/', naam: 'Stucwerk Kosten'},
    {url: '/prijscalculator/', naam: 'Prijscalculator'}
  ];

  var vergelijkingen = [
    {url: '/renovlies-vs-stucwerk/', naam: 'Renovlies vs Stucwerk'},
    {url: '/renovlies-of-stucen/', naam: 'Renovlies of Stucen'},
    {url: '/stucwerk-of-behangen/', naam: 'Stucwerk of Behangen'},
    {url: '/voordelen-renovlies/', naam: 'Voordelen Renovlies'},
    {url: '/nadelen-renovlies/', naam: 'Nadelen Renovlies'},
    {url: '/renovlies-ervaringen/', naam: 'Renovlies Ervaringen'}
  ];

  var info = [
    {url: '/meer-over-renovlies/', naam: 'Meer over Renovlies'},
    {url: '/meer-over-glasvlies/', naam: 'Meer over Glasvlies'},
    {url: '/meer-over-latex-spuiten/', naam: 'Meer over Latex Spuiten'},
    {url: '/meer-over-wandafwerking/', naam: 'Meer over Wandafwerking'},
    {url: '/meer-over-stucwerk/', naam: 'Meer over Stucwerk'},
    {url: '/meer-over-sauzen/', naam: 'Meer over Sauzen'},
    {url: '/sauzen-na-renovlies/', naam: 'Sauzen na Renovlies'},
    {url: '/renovlies-schilderen/', naam: 'Renovlies Schilderen'},
    {url: '/renovlies-zelf-doen/', naam: 'Renovlies Zelf Doen'},
    {url: '/sausklaar-opleveren/', naam: 'Sausklaar Opleveren'},
    {url: '/nieuwbouwwoning-behangklaar/', naam: 'Nieuwbouwwoning Behangklaar'}
  ];

  var locaties = [
    {url: '/renovlies-utrecht/', naam: 'Utrecht'},
    {url: '/renovlies-rotterdam/', naam: 'Rotterdam'},
    {url: '/renovlies-den-haag/', naam: 'Den Haag'},
    {url: '/renovlies-breda/', naam: 'Breda'},
    {url: '/renovlies-dordrecht/', naam: 'Dordrecht'},
    {url: '/renovlies-leiden/', naam: 'Leiden'},
    {url: '/renovlies-amersfoort/', naam: 'Amersfoort'},
    {url: '/renovlies-delft/', naam: 'Delft'},
    {url: '/renovlies-gouda/', naam: 'Gouda'},
    {url: '/renovlies-houten/', naam: 'Houten'},
    {url: '/renovlies-nieuwegein/', naam: 'Nieuwegein'},
    {url: '/renovlies-woerden/', naam: 'Woerden'},
    {url: '/renovlies-zoetermeer/', naam: 'Zoetermeer'},
    {url: '/renovlies-ijsselstein/', naam: 'IJsselstein'},
    {url: '/renovlies-gorinchem/', naam: 'Gorinchem'},
    {url: '/renovlies-alblasserdam/', naam: 'Alblasserdam'},
    {url: '/renovlies-papendrecht/', naam: 'Papendrecht'},
    {url: '/renovlies-sliedrecht/', naam: 'Sliedrecht'},
    {url: '/renovlies-zwijndrecht/', naam: 'Zwijndrecht'}
  ];

  var projecten = [
    {url: '/project-haarlem/', naam: 'Project Haarlem'},
    {url: '/project-sneek/', naam: 'Project Sneek'},
    {url: '/project-leek/', naam: 'Project Leek'},
    {url: '/project-luttelgeest/', naam: 'Project Luttelgeest'},
    {url: '/project-putte/', naam: 'Project Putte'},
    {url: '/project-zevenhuizen/', naam: 'Project Zevenhuizen'},
    {url: '/project-oude-weteringen/', naam: 'Project Oude Weteringen'}
  ];

  // Bepaal huidige pagina
  var path = window.location.pathname;

  // Sla homepage, contact, prijscalculator, burenkorting en blog over
  if (path === '/' || path === '/contact/' || path === '/blog/' || path === '/burenkorting/') return;

  // Bepaal paginatype en kies relevante links
  var isLocatie = path.match(/^\/renovlies-(utrecht|rotterdam|den-haag|breda|dordrecht|leiden|amersfoort|delft|gouda|houten|nieuwegein|woerden|zoetermeer|ijsselstein|gorinchem|alblasserdam|papendrecht|sliedrecht|zwijndrecht)\//);
  var isProject = path.indexOf('/project-') === 0;
  var isPrijs = path.indexOf('prijs') > -1 || path.indexOf('kost') > -1 || path.indexOf('goedkoop') > -1 || path.indexOf('kosten') > -1 || path === '/prijscalculator/';
  var isVergelijking = path.indexOf('vs-') > -1 || path.indexOf('-of-') > -1 || path.indexOf('voordelen') > -1 || path.indexOf('nadelen') > -1 || path.indexOf('ervaringen') > -1;
  var isInfo = path.indexOf('meer-over') > -1 || path.indexOf('sauzen') > -1 || path.indexOf('schilderen') > -1 || path.indexOf('zelf-doen') > -1 || path.indexOf('sausklaar') > -1 || path.indexOf('behangklaar') > -1;

  var secties = [];

  if (isLocatie) {
    secties.push({
      titel: 'Onze Diensten',
      links: shuffle(diensten.slice(0, 6)).slice(0, 4)
    });
    secties.push({
      titel: 'Ook Actief In',
      links: shuffle(filterHuidige(locaties)).slice(0, 6)
    });
  } else if (isProject) {
    secties.push({
      titel: 'Onze Diensten',
      links: shuffle(diensten.slice(0, 6)).slice(0, 4)
    });
    secties.push({
      titel: 'Bekijk Andere Projecten',
      links: shuffle(filterHuidige(projecten)).slice(0, 4)
    });
  } else if (isPrijs) {
    secties.push({
      titel: 'Meer over Prijzen',
      links: shuffle(filterHuidige(prijzen)).slice(0, 4)
    });
    secties.push({
      titel: 'Onze Diensten',
      links: shuffle(diensten.slice(0, 8)).slice(0, 4)
    });
  } else if (isVergelijking) {
    secties.push({
      titel: 'Meer Vergelijkingen',
      links: shuffle(filterHuidige(vergelijkingen)).slice(0, 4)
    });
    secties.push({
      titel: 'Bekijk Prijzen',
      links: shuffle(prijzen).slice(0, 4)
    });
  } else if (isInfo) {
    secties.push({
      titel: 'Meer Informatie',
      links: shuffle(filterHuidige(info)).slice(0, 4)
    });
    secties.push({
      titel: 'Onze Diensten',
      links: shuffle(diensten.slice(0, 8)).slice(0, 4)
    });
  } else {
    secties.push({
      titel: 'Gerelateerde Diensten',
      links: shuffle(filterHuidige(diensten)).slice(0, 4)
    });
    secties.push({
      titel: 'Beschikbaar In',
      links: shuffle(locaties).slice(0, 6)
    });
  }

  // Maak de HTML
  if (secties.length === 0) return;

  var html = '<section class="internal-links" style="padding:60px 20px;background:#f8f9fa;margin-top:0">';
  html += '<div style="max-width:1100px;margin:0 auto">';
  html += '<h2 style="text-align:center;font-size:1.8rem;margin-bottom:40px;color:#1a1a2e">Ontdek Meer</h2>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:40px;justify-content:center">';

  secties.forEach(function(sectie) {
    html += '<div style="flex:1;min-width:250px;max-width:450px">';
    html += '<h3 style="font-size:1.1rem;margin-bottom:16px;color:#e8a838;text-transform:uppercase;letter-spacing:1px">' + sectie.titel + '</h3>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
    sectie.links.forEach(function(link) {
      html += '<a href="' + link.url + '" style="display:inline-block;padding:8px 16px;background:#fff;border:1px solid #ddd;border-radius:6px;color:#1a1a2e;text-decoration:none;font-size:0.9rem;transition:all 0.2s"';
      html += ' onmouseover="this.style.borderColor=\'#e8a838\';this.style.color=\'#e8a838\'"';
      html += ' onmouseout="this.style.borderColor=\'#ddd\';this.style.color=\'#1a1a2e\'"';
      html += '>' + link.naam + '</a>';
    });
    html += '</div></div>';
  });

  html += '</div></div></section>';

  // Voeg in vóór de CTA sectie
  var cta = document.querySelector('.cta-banner');
  if (cta) {
    cta.insertAdjacentHTML('beforebegin', html);
  }

  // Hulpfuncties
  function filterHuidige(arr) {
    return arr.filter(function(item) { return item.url !== path; });
  }

  function shuffle(arr) {
    // Deterministische shuffle op basis van pad (zelfde pagina = zelfde links)
    var seed = hashCode(path);
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      seed = (seed * 16807 + 0) % 2147483647;
      var j = seed % (i + 1);
      var temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

  function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }
})();
