const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeAllProducts() {
  const catUrls = [
    'https://www.solid-yb.com/%d7%a7%d7%98%d7%9c%d7%95%d7%92-%d7%9e%d7%95%d7%a6%d7%a8%d7%99-%d7%99%d7%a6%d7%a7%d7%aa/',
    'https://www.solid-yb.com/%d7%a7%d7%98%d7%9c%d7%95%d7%92-%d7%9e%d7%95%d7%a6%d7%a8%d7%99-%d7%91%d7%98%d7%95%d7%9f/',
    'https://www.solid-yb.com/%d7%9e%d7%95%d7%a6%d7%a8%d7%99-%d7%91%d7%98%d7%95%d7%9f/',
    'https://www.solid-yb.com/mach/%d7%a8%d7%a9%d7%aa%d7%95%d7%aa-%d7%9e%d7%99%d7%a6%d7%a7%d7%aa-%d7%9e%d7%a1%d7%92%d7%a8%d7%aa-%d7%9e%d7%9c%d7%91%d7%a0%d7%99%d7%aa/',
    'https://www.solid-yb.com/mach/%d7%a4%d7%a7%d7%a7%d7%99%d7%9d-%d7%95%d7%9e%d7%a1%d7%92%d7%a8%d7%95%d7%aa-%d7%a8%d7%a9%d7%aa-%d7%a2%d7%92%d7%95%d7%9c%d7%99%d7%9d/',
    'https://www.solid-yb.com/mach/%d7%9e%d7%9b%d7%a1%d7%99%d7%9d-%d7%9e%d7%a8%d7%95%d7%91%d7%a2%d7%99%d7%9d-%d7%9c%d7%a8%d7%99%d7%a6%d7%95%d7%a3-%d7%90%d7%91%d7%a0%d7%99%d7%9d-%d7%9e%d7%a9%d7%aa%d7%9c%d7%91%d7%95%d7%aa/',
    'https://www.solid-yb.com/mach/%d7%9e%d7%9b%d7%a1%d7%99-%d7%99%d7%a6%d7%a7%d7%aa-%d7%9c%d7%aa%d7%90%d7%99-%d7%91%d7%a7%d7%a8%d7%94-%d7%9e%d7%a1%d7%92%d7%a8%d7%aa-%d7%a2%d7%92%d7%95%d7%9c%d7%94/',
    'https://www.solid-yb.com/mach/%d7%9e%d7%9b%d7%a1%d7%99-%d7%99%d7%a6%d7%a7%d7%aa-%d7%9c%d7%aa%d7%90%d7%99-%d7%91%d7%a7%d7%a8%d7%94-%d7%9e%d7%a1%d7%92%d7%a8%d7%aa-%d7%9e%d7%a8%d7%95%d7%91%d7%a2%d7%aa/',
    'https://www.solid-yb.com/mach/%d7%9e%d7%9b%d7%a1%d7%99-%d7%99%d7%a6%d7%a7%d7%aa-%d7%9c%d7%aa%d7%90%d7%99-%d7%91%d7%96%d7%a7-%d7%9c%d7%97%d7%a9%d7%9e%d7%9c/',
    'https://www.solid-yb.com/msolav_y_b/%d7%9e%d7%9b%d7%a1%d7%99%d7%9d-%d7%a8%d7%a9%d7%aa-2-%d7%97%d7%9c%d7%a7%d7%99%d7%9d%d7%9c%d7%aa%d7%90%d7%99-%d7%91%d7%98%d7%95%d7%9f/',
    'https://www.solid-yb.com/msolav_y_b/%d7%9e%d7%9b%d7%a1%d7%99%d7%9d-2-%d7%97%d7%9c%d7%a7%d7%99%d7%9d-%d7%9c%d7%aa%d7%90%d7%99-%d7%91%d7%a7%d7%a8%d7%94-%d7%91%d7%98%d7%95%d7%9f/',
    'https://www.solid-yb.com/msolav_y_b/%d7%9e%d7%9b%d7%a1%d7%99-%d7%9b%d7%95%d7%91%d7%a2-2-%d7%97%d7%9c%d7%a7%d7%99%d7%9d%d7%9c%d7%aa%d7%90%d7%99-%d7%a4%d7%9c%d7%a1%d7%98%d7%99%d7%a7/',
    'https://www.solid-yb.com/msolav_y_b/%d7%9e%d7%9b%d7%a1%d7%94-%d7%9e%d7%a9%d7%95%d7%9c%d7%91-%d7%99%d7%a6%d7%a7%d7%aa-%d7%91%d7%98%d7%95%d7%9f/',
    'https://www.solid-yb.com/termconcrid/pyler/',
    'https://www.solid-yb.com/termconcrid/%d7%aa%d7%a0%d7%99-%d7%91%d7%a7%d7%a8%d7%94-%d7%a7%d7%95%d7%98%d7%a8-80-%d7%a1-3/',
    'https://www.solid-yb.com/termconcrid/%d7%a7%d7%95%d7%9c%d7%98%d7%a0%d7%99%d7%9d-%d7%aa%d7%a0%d7%99-%d7%aa%d7%a4%d7%99%d7%a1%d7%94/',
    'https://www.solid-yb.com/termconcrid/%d7%aa%d7%a7%d7%a8%d7%94-%d7%9e%d7%a8%d7%95%d7%91%d7%a2%d7%aa-%d7%9c%d7%aa%d7%90/'
  ];

  const productsList = [];

  for (const url of catUrls) {
    try {
      const html = await fetchUrl(url);
      // Extract images and titles
      const regex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']+)["'][^>]*>/gi;
      let match;
      while ((match = regex.exec(html)) !== null) {
        const src = match[1];
        const alt = match[2];
        if (src.includes('wp-content/uploads') && alt && alt.length > 3 && !alt.includes('לוגו') && !alt.includes('אישור') && !alt.includes('תקן') && !alt.includes('היתר')) {
          productsList.push({
            name: alt.trim(),
            image: src,
            categoryUrl: url
          });
        }
      }
    } catch(e) {
      console.error(e.message);
    }
  }

  // Deduplicate
  const map = new Map();
  productsList.forEach(p => {
    if (!map.has(p.name)) {
      map.set(p.name, p);
    }
  });

  const finalProducts = Array.from(map.values());
  console.log("Total unique scraped products:", finalProducts.length);
  fs.writeFileSync('scratch/all_scraped_products.json', JSON.stringify(finalProducts, null, 2));
}

scrapeAllProducts();
