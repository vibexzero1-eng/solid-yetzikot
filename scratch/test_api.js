async function testApi() {
  try {
    const res = await fetch('http://localhost:3000/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'ישראל ישראלי',
        company: 'חברת תשתיות בע"מ',
        phone: '050-5517807',
        email: 'solidyb@solid-yb.com',
        details: 'בקשה לדוגמה להצעת מחיר עבור 5 יחידות מכסי יציקה D400',
        items: [
          { product: { id: '1', name: 'רשתות מיצקת מסגרת מלבנית', sku: '1001', price: 450, specs: { loadRating: 'D400' } }, quantity: 5 }
        ]
      })
    });
    const data = await res.json();
    console.log("API Result:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

testApi();
