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

async function run() {
  try {
    const mainHtml = await fetchUrl('https://www.solid-yb.com/');
    const linkRegex = /href=["'](https?:\/\/(?:www\.)?solid-yb\.com\/[^"']+)["']/g;
    let match;
    const links = new Set();
    while ((match = linkRegex.exec(mainHtml)) !== null) {
      links.add(match[1]);
    }
    console.log("Found links:", Array.from(links));

    const products = [];
    const certs = [];
    const images = [];

    const pagesToVisit = Array.from(links);
    pagesToVisit.push('https://www.solid-yb.com/');

    for (const url of pagesToVisit) {
      console.log("Fetching:", url);
      try {
        const html = await fetchUrl(url);
        
        // Find images with alt or title
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let imgMatch;
        while ((imgMatch = imgRegex.exec(html)) !== null) {
          const src = imgMatch[1];
          const fullImg = imgMatch[0];
          const altMatch = /alt=["']([^"']*)["']/i.exec(fullImg);
          const alt = altMatch ? altMatch[1] : '';
          
          if (src.includes('wp-content/uploads')) {
            images.push({ src, alt, page: url });
          }
        }
      } catch (err) {
        console.error("Error fetching", url, err.message);
      }
    }

    fs.writeFileSync('scratch/scraped_data.json', JSON.stringify({ links: Array.from(links), images }, null, 2));
    console.log("Scraped", images.length, "images.");
  } catch (e) {
    console.error(e);
  }
}

run();
