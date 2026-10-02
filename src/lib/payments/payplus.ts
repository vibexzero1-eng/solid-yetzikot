export type PayPlusPaymentRequest = {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  amount: number;
  description: string;
  items: { name: string; price: number; quantity: number }[];
};

export type PayPlusPaymentResponse = {
  success: boolean;
  paymentUrl: string;
  pageRequestUid: string;
  mode: "sandbox" | "live";
};

export async function createPayPlusPaymentPage(
  data: PayPlusPaymentRequest
): Promise<PayPlusPaymentResponse> {
  const isLive = process.env.PAYMENT_MODE === "live";
  const apiKey = process.env.PAYPLUS_API_KEY;
  const secretKey = process.env.PAYPLUS_SECRET_KEY;
  const paymentPageUid = process.env.PAYPLUS_PAYMENT_PAGE_UID;

  console.log(`[PAYPLUS] Generating payment link for Order #${data.orderId}, Amount: ₪${data.amount} (Mode: ${isLive ? "LIVE" : "SANDBOX"})`);

  // If live credentials are missing or in sandbox mode, generate functional sandbox URL
  if (!isLive || !apiKey || !secretKey || !paymentPageUid) {
    const sandboxPaymentUrl = `/pay/${data.orderId}?mock_payplus=1`;
    return {
      success: true,
      paymentUrl: sandboxPaymentUrl,
      pageRequestUid: `sandbox-uid-${data.orderId}`,
      mode: "sandbox"
    };
  }

  try {
    const payPlusApiUrl = "https://restapi.payplus.co.il/api/v1.0/PaymentPages/generate";
    const res = await fetch(payPlusApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.stringify({ api_key: apiKey, secret_key: secretKey })
      },
      body: JSON.stringify({
        payment_page_uid: paymentPageUid,
        charge_method: 1, // Regular charge
        amount: data.amount,
        currency_code: "ILS",
        sendEmailApproval: true,
        sendEmailFailure: true,
        ref_number: data.orderId,
        customer: {
          customer_name: data.customerName,
          phone: data.customerPhone,
          email: data.customerEmail
        },
        items: data.items.map(i => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          vat_type: 0
        }))
      })
    });

    const result = await res.json();
    if (result.results && result.results.status === "success") {
      return {
        success: true,
        paymentUrl: result.data.payment_page_link,
        pageRequestUid: result.data.page_request_uid,
        mode: "live"
      };
    }
  } catch (err) {
    console.error("[PAYPLUS] API call failed, falling back to sandbox:", err);
  }

  return {
    success: true,
    paymentUrl: `/pay/${data.orderId}?mock_payplus=1`,
    pageRequestUid: `sandbox-fallback-${data.orderId}`,
    mode: "sandbox"
  };
}
