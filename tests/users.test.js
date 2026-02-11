const request = require("supertest");
const app = require("../app"); // your Express app
const User = require("../models/users");

// Sample data
const mockUsers = [
  {
    _id: "698c8ec7a994d5db983334df",
    displayName: "Faith Idowu",
    firstName: "Faith",
    lastName: "Idowu",
    email: "faith.idowu@example.com",
    role: "admin",
    oauthProvider: "google",
    createdAt: "2025-02-01T10:00:00Z",
  },
  {
    _id: "698c8ec7a994d5db983334e0",
    displayName: "Matthew Akhabue",
    firstName: "Matthew",
    lastName: "Akhabue",
    email: "matthew.akhabue@example.com",
    role: "admin",
    oauthProvider: "google",
    createdAt: "2025-02-01T10:05:00Z",
  },
];

// Mock User model
jest.mock("../models/users", () => ({
  find: jest.fn(() => ({
    select: jest.fn().mockResolvedValue(mockUsers),
  })),
  findById: jest.fn((id) => ({
    select: jest.fn().mockResolvedValue(
      mockUsers.find((u) => u._id === id) || null
    ),
  })),
}));

describe("Users API", () => {
  describe("GET /users", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/users");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].displayName).toBe("Faith Idowu");
      expect(res.body[1].email).toBe("matthew.akhabue@example.com");
    });
  });

  describe("GET /users/:id", () => {
    it("should return one user by ID", async () => {
      const res = await request(app).get("/users/698c8ec7a994d5db983334df");

      expect(res.statusCode).toBe(200);
      expect(res.body.displayName).toBe("Faith Idowu");
      expect(res.body.role).toBe("admin");
    });

    it("should return 404 if user not found", async () => {
      const res = await request(app).get("/users/000000000000000000000000");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("User not found");
    });
  });
});
