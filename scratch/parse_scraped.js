const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/scraped_data.json', 'utf8'));

console.log("=== LINKS ===");
data.links.forEach(l => {
  try {
    console.log(decodeURIComponent(l));
  } catch(e) {
    console.log(l);
  }
});

console.log("\n=== CERTIFICATES / PDF / DOCUMENTS ===");
data.images.filter(img => img.page.includes('תעודות') || img.src.includes('pdf') || img.alt.includes('תקן') || img.alt.includes('אישור') || img.alt.includes('תעודה')).forEach(img => {
  console.log(img.src, "--> ALT:", img.alt, "--> PAGE:", decodeURIComponent(img.page));
});

console.log("\n=== PRODUCT IMAGES (ALT > 2 chars) ===");
const uniqueProducts = new Map();
data.images.forEach(img => {
  if (img.alt && img.alt.length > 2 && !img.alt.includes('לוגו') && !img.alt.includes('solid')) {
    if (!uniqueProducts.has(img.alt)) {
      uniqueProducts.set(img.alt, img.src);
    }
  }
});

for (let [alt, src] of uniqueProducts.entries()) {
  console.log(`- ${alt}: ${src}`);
}
