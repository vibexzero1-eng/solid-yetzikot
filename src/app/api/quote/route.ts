import { NextResponse } from "next/server";
import { saveOrder, OrderRecord } from "@/lib/orders";
import { COMPANY_CONTACT } from "@/lib/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, phone, email, details, items } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "שם וטלפון הם שדות חובה" },
        { status: 400 }
      );
    }

    const orderId = `SOL-${Date.now().toString().slice(-6)}`;
    const orderDate = new Date().toLocaleDateString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const companyEmail = COMPANY_CONTACT.email;
    const secretaryPhone = COMPANY_CONTACT.whatsappNumber;
    const targetEmail = email || companyEmail;

    const totalAmount = (items || []).reduce(
      (sum: number, item: any) => sum + (item.product.price * item.quantity),
      0
    );

    const newOrder: OrderRecord = {
      id: orderId,
      customerName: name,
      customerPhone: phone,
      customerEmail: email || "לא צוין",
      customerCompany: company || "פרטי",
      details: details || "",
      items: items || [],
      originalTotal: totalAmount,
      approvedTotal: totalAmount,
      status: "pending_review",
      createdAt: new Date().toISOString(),
      receiptNumber: `REC-${orderId}`
    };

    saveOrder(newOrder);

    const receipt = {
      receiptNumber: `REC-${orderId}`,
      issueDate: orderDate,
      companyName: "סוליד יציקות בע\"מ",
      companyTaxId: "515893021",
      companyAddress: "אזור תעשייה עמנואל",
      customerName: name,
      customerCompany: company || "פרטי",
      customerPhone: phone,
      customerEmail: email || "לא צוין",
      items: items || [],
      totalAmount,
      currency: "ILS",
      status: "שולם / מאושר לבקשת הצעת מחיר"
    };

    // Pre-filled WhatsApp notification text for secretary / orders
    const whatsappText = encodeURIComponent(
      `🔔 *פנייה/הזמנה חדשה באתר סוליד יציקות*\n` +
      `מספר הזמנה: ${orderId}\n` +
      `שם הלקוח: ${name}\n` +
      `חברה/פרויקט: ${company || "לא צוין"}\n` +
      `טלפון: ${phone}\n` +
      `סה"כ משוער: ₪${totalAmount.toLocaleString()}\n` +
      `קישור לצפייה ואישור בפאנל הניהול: http://localhost:3000/admin/orders`
    );

    const secretaryWhatsAppLink = `https://wa.me/${secretaryPhone}?text=${whatsappText}`;

    console.log(`[ORDER API] Saved Order #${orderId}`);
    console.log(`[ORDER API] Sending notification to company email: ${companyEmail}`);
    console.log(`[ORDER API] Secretary WhatsApp notification link generated: ${secretaryWhatsAppLink}`);

    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: "סוליד יציקות <noreply@solid-yb.com>",
            to: [companyEmail, targetEmail].filter(Boolean),
            subject: `פנייה חדשה / הצעת מחיר #${orderId} - סוליד יציקות`,
            html: `
              <div dir="rtl" style="font-family: Arial, sans-serif; color: #14171A; max-width: 600px; margin: 0 auto; border: 1px solid #E7E9EB; border-radius: 16px; padding: 24px;">
                <h2 style="color: #F26B1D;">סוליד יציקות בע"מ - אישור קבלת פנייה וקבלה #${receipt.receiptNumber}</h2>
                <p>שלום <strong>${name}</strong>,</p>
                <p>תודה שפנית לסוליד יציקות! פנייתך נרשמה בהצלחה במערכת ונשלחה לבדיקת המזכירות וההנדסה.</p>
                <hr style="border: 0; border-top: 1px solid #E7E9EB; margin: 20px 0;" />
                <h3>פרטי הפנייה:</h3>
                <p><strong>מספר פנייה:</strong> ${orderId}</p>
                <p><strong>תאריך:</strong> ${orderDate}</p>
                <p><strong>חברה/פרויקט:</strong> ${company || "לא צוין"}</p>
                <p><strong>טלפון:</strong> ${phone}</p>
                <p><strong>דוא"ל:</strong> ${email || "לא צוין"}</p>
                
                ${items && items.length > 0 ? `
                  <h3>מוצרים שנבחרו:</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                      <tr style="background: #F4F5F6; text-align: right;">
                        <th style="padding: 8px; border: 1px solid #E7E9EB;">מוצר</th>
                        <th style="padding: 8px; border: 1px solid #E7E9EB;">כמות</th>
                        <th style="padding: 8px; border: 1px solid #E7E9EB;">מחיר יחידה</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${items.map((it: any) => `
                        <tr>
                          <td style="padding: 8px; border: 1px solid #E7E9EB;">${it.product.name}</td>
                          <td style="padding: 8px; border: 1px solid #E7E9EB;">${it.quantity}</td>
                          <td style="padding: 8px; border: 1px solid #E7E9EB;">₪${it.product.price}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                  <p style="font-size: 18px; font-weight: bold; margin-top: 15px; color: #F26B1D;">סה"כ משוער: ₪${totalAmount.toLocaleString()}</p>
                ` : ''}

                <hr style="border: 0; border-top: 1px solid #E7E9EB; margin: 20px 0;" />
                <p style="font-size: 12px; color: #5B6670;">סוליד יציקות בע"מ | אזור תעשייה עמנואל | משרד: ${COMPANY_CONTACT.officePhone} | וואטסאפ: ${COMPANY_CONTACT.whatsappPhone} | ${COMPANY_CONTACT.email}</p>
              </div>
            `
          })
        });
      } catch (err) {
        console.error("Failed to send via Resend API:", err);
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "הפנייה נרשמה בהצלחה ונשלחה למזכירות החברה וללקוח",
      receipt,
      secretaryWhatsAppLink
    });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ error: "אירעה שגיאה בעיבוד ההזמנה" }, { status: 500 });
  }
}
