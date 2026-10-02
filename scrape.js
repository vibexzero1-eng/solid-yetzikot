const https = require('https');

function fetchProducts(url) {
  return new Promise((resolve) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
  });
}

async function scrape() {
  const urls = [
    'https://www.solid-yb.com/%d7%a7%d7%98%d7%9c%d7%95%d7%92-%d7%9e%d7%95%d7%a6%d7%a8%d7%99-%d7%91%d7%98%d7%95%d7%9f/',
    'https://www.solid-yb.com/%d7%9e%d7%95%d7%a6%d7%a8%d7%99-%d7%91%d7%98%d7%95%d7%9f/'
  ];
  
  const allProducts = [];
  
  for (const url of urls) {
    const html = await fetchProducts(url);
    const regex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (match[1].includes('wp-content/uploads') && !match[1].includes('לוגו') && match[2].length > 3) {
        allProducts.push({ img: match[1], title: match[2] });
      }
    }
  }
  
  // Deduplicate by title
  const unique = [];
  const map = new Map();
  for(const p of allProducts) {
    if(!map.has(p.title)) {
      map.set(p.title, true);
      unique.push(p);
    }
  }
  
  console.log(JSON.stringify(unique, null, 2));
}

scrape();
