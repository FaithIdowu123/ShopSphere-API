const request = require("supertest");
const app = require("../app");
const Product = require("../models/products");

jest.mock("../models/products");

const mockProduct = {
  _id: "6982156c0ce42f2921c89bec",
  name: "Jump Rope",
  description: "Speed jump rope",
  price: 12.99,
  stock: 140,
  category: "Fitness",
  rating: 0
};

describe("Product API", () => {
  describe("GET /products", () => {
    it("should return all products", async () => {
      Product.find.mockResolvedValue([mockProduct]);

      const res = await request(app).get("/products");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe("Jump Rope");
      expect(res.body[0].price).toBe(12.99);
    });
  });

  describe("GET /products/:id", () => {
    it("should return one product by ID", async () => {
      Product.findById.mockResolvedValue(mockProduct);

      const res = await request(app).get(`/products/${mockProduct._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Jump Rope");
      expect(res.body.category).toBe("Fitness");
    });

    it("should return 404 if product not found", async () => {
      Product.findById.mockResolvedValue(null);

      const res = await request(app).get("/products/123456789012");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Product not found");
    });
  });
});
