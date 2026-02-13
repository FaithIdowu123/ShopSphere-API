const request = require("supertest");
const app = require("../app"); // your Express app
const Order = require("../models/orders");

// Sample mock data
const mockOrders = [
  {
    _id: "698f3ca3d2f03cb0495b0790",
    userId: "698c8ec7a994d5db983334df",
    products: [
      { _id: "698f49419cdb431880d5102b", productId: "6982156c0ce42f2921c89bec", itemCount: 1 },
      { _id: "698f49419cdb431880d5102c", productId: "6982156c0ce42f2921c89bea", itemCount: 2 }
    ],
    totalAmount: 155.96,
    status: "delivered",
    paymentMethod: "credit_card",
    createdAt: "2026-02-01T12:30:00.000Z",
    orderAddress: "12 Unity Street, Lagos, Nigeria"
  },
  {
    _id: "698f3ca3d2f03cb0495b0791",
    userId: "698c8ec7a994d5db983334e0",
    products: [
      { _id: "698f49419cdb431880d5102e", productId: "6982156c0ce42f2921c89bd5", itemCount: 3 }
    ],
    totalAmount: 179.97,
    status: "shipped",
    paymentMethod: "paypal",
    createdAt: "2026-02-02T09:45:00.000Z",
    orderAddress: "45 Victoria Avenue, Abuja, Nigeria"
  }
];

// Mock Order model
jest.mock("../models/orders");

describe("Orders API", () => {
  describe("GET /orders", () => {
    it("should return all orders", async () => {
      Order.find.mockResolvedValue(mockOrders);

      const res = await request(app).get("/orders");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].totalAmount).toBe(155.96);
      expect(res.body[1].status).toBe("shipped");
    });
  });

  describe("GET /orders/:id", () => {
    it("should return one order by ID", async () => {
      Order.findById.mockResolvedValue(mockOrders[0]); // ✅ mock findById, not find

      const res = await request(app).get("/orders/698f3ca3d2f03cb0495b0790");

      expect(res.statusCode).toBe(200);
      expect(res.body.userId).toBe("698c8ec7a994d5db983334df");
      expect(res.body.paymentMethod).toBe("credit_card");
      expect(res.body.products.length).toBe(2);
    });

    it("should return 404 if order not found", async () => {
      Order.findById.mockResolvedValue(null); // ✅ mock findById returning null

      const res = await request(app).get("/orders/000000000000000000000000");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Order not found");
    });
  });
});
