import { describe, it, expect, beforeEach } from "vitest";
import { POST } from "./route";
import prisma from "../../../../lib/prisma";
import { type RegisterInput } from "../../../../lib/schemas/registerSchema";

const buildRequest = <T extends Partial<RegisterInput>>(data: T) =>
  new Request("http://localhost:3000/api/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

describe("POST /api/register", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("registers a user with valid data", async () => {
    const req = buildRequest({
      name: "Test User",
      email: "test@example.com",
      password: "S&nha123",
      confirmPassword: "S&nha123",
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.email).toBe("test@example.com");

    const userInDb = await prisma.user.findUnique({
      where: { email: "test@example.com" },
    });

    expect(userInDb).not.toBeNull();
  });

  it("fails when email already exists", async () => {
    await prisma.user.create({
      data: {
        name: "Existing",
        email: "exist@example.com",
        password: "hashed",
      },
    });

    const req = buildRequest({
      name: "Another",
      email: "exist@example.com",
      password: "S&nha123",
      confirmPassword: "S&nha123",
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(409);
    expect(json.message).toBe("Email already exists");
  });

  it("returns 422 for invalid input", async () => {
    const req = buildRequest({
      name: "A",
      email: "invalid-email",
      password: "short",
      confirmPassword: "different",
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(422);
    expect(json.message).toBe("Name should have at least 2 characters");
  });
  it("returns 500 for no data provided", async () => {
    const req = new Request("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.message).toBe("Internal server error");
  });
});
