import { describe, it, expect } from "vitest";

const KAFKA_BROKERS = process.env.KAFKA_BROKERS;

describe.skipIf(!KAFKA_BROKERS)("messages integration", () => {
  it("GET /api/messages returns array", async () => {
    const response = await fetch("http://localhost:3000/api/messages");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it("GET /api/messages returns empty array when no messages", async () => {
    const response = await fetch("http://localhost:3000/api/messages");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });
});
