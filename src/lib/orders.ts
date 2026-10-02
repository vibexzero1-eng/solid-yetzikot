export type OrderStatus = "pending_review" | "quote_sent" | "paid" | "completed";

export type OrderRecord = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerCompany?: string;
  details?: string;
  items: { product: any; quantity: number }[];
  originalTotal: number;
  approvedTotal?: number;
  status: OrderStatus;
  createdAt: string;
  paymentUrl?: string;
  receiptNumber?: string;
  receiptUrl?: string;
};

// In-memory global order store for development
export const mockOrdersStore: OrderRecord[] = [
  {
    id: "SOL-326988",
    customerName: "ישראל ישראלי",
    customerPhone: "054-393-9036",
    customerEmail: "solidyb@solid-yb.com",
    customerCompany: "חברת תשתיות בע\"מ",
    details: "הזמנת פרויקט כביש 60 - אספקה דחופה",
    items: [
      {
        product: {
          id: "1",
          name: "רשתות מיצקת מסגרת מלבנית",
          sku: "1001",
          price: 450,
          specs: { loadRating: "D400" }
        },
        quantity: 5
      }
    ],
    originalTotal: 2250,
    approvedTotal: 2100,
    status: "quote_sent",
    createdAt: new Date().toISOString(),
    paymentUrl: "/pay/SOL-326988",
    receiptNumber: "REC-SOL-326988"
  }
];

export function getOrderById(id: string): OrderRecord | undefined {
  return mockOrdersStore.find(o => o.id === id);
}

export function saveOrder(order: OrderRecord): void {
  const idx = mockOrdersStore.findIndex(o => o.id === order.id);
  if (idx >= 0) {
    mockOrdersStore[idx] = order;
  } else {
    mockOrdersStore.unshift(order);
  }
}
