const request = require("supertest");
const app = require("../app"); // your Express app
const Review = require("../models/reviews");

// Sample mock data (2 reviews)
const mockReviews = [
  {
    _id: "698c9c3fa994d5db983334e6",
    productId: "6982156c0ce42f2921c89bec",
    userId: "698c8ec7a994d5db983334df",
    rating: 5,
    comment: "Lightweight and great for cardio workouts.",
    createdAt: "2026-02-01T10:00:00.000Z"
  },
  {
    _id: "698c9c3fa994d5db983334e7",
    productId: "6982156c0ce42f2921c89bec",
    userId: "698c8ec7a994d5db983334e0",
    rating: 4,
    comment: "Good grip, rotates smoothly.",
    createdAt: "2026-02-01T10:15:00.000Z"
  }
];

// Mock Review model
jest.mock("../models/reviews");

describe("Reviews API", () => {
  describe("GET /reviews", () => {
    it("should return all reviews", async () => {
      Review.find.mockResolvedValue(mockReviews);

      const res = await request(app).get("/reviews");
      
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].comment).toBe("Lightweight and great for cardio workouts.");
      expect(res.body[1].rating).toBe(4);
    });
  });

  describe("GET /reviews/:id", () => {
    it("should return one review by ID", async () => {
      Review.findById.mockResolvedValue(mockReviews[0]);

      const res = await request(app).get("/reviews/698c9c3fa994d5db983334e6");
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe("698c9c3fa994d5db983334e6");
      expect(res.body.rating).toBe(5);
      expect(res.body.comment).toBe("Lightweight and great for cardio workouts.");
    });

    it("should return 404 if review not found", async () => {
      Review.findById.mockResolvedValue(null);

      const res = await request(app).get("/reviews/000000000000000000000000");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Review not found");
    });
  });

  describe("GET /reviews/p/:id", () => {
    it("should return reviews by productID", async () => {
      Review.find.mockResolvedValue(mockReviews);

      const res = await request(app).get("/reviews/p/6982156c0ce42f2921c89bec");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]._id).toBe("698c9c3fa994d5db983334e6");
      expect(res.body[0].rating).toBe(5);
      expect(res.body[0].comment).toBe("Lightweight and great for cardio workouts.");
    });

    it("should return 404 if review not found", async () => {
      Review.find.mockResolvedValue([]);

      const res = await request(app).get("/reviews/p/000000000000000000000000");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Review not found");
    });
  });
});
