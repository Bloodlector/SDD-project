import { describe, it, expect, beforeAll, afterAll } from "vitest";

const KAFKA_BROKERS = process.env.KAFKA_BROKERS;

interface RecordApiResponse {
  message: string;
  record?: {
    name: string;
  };
}

describe.skipIf(!KAFKA_BROKERS)("records integration", () => {
  beforeAll(async () => {
    // Start the server for integration tests
    // This requires KAFKA_BROKERS to be set
  });

  afterAll(async () => {
    // Cleanup
  });

  it("POST /api/records returns 201", async () => {
    const response = await fetch("http://localhost:3000/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "test-1",
        name: "Test Record",
        description: "Test Description",
      }),
    });

    expect(response.status).toBe(201);
    const data = (await response.json()) as RecordApiResponse;
    expect(data.message).toBe("Запись отправлена");
    expect(data.record).toBeDefined();
    expect(data.record?.name).toBe("Test Record");
  });

  it("POST /api/records with empty name returns 400", async () => {
    const response = await fetch("http://localhost:3000/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "test-2",
        name: "",
        description: "Test Description",
      }),
    });

    expect(response.status).toBe(400);
  });
});
