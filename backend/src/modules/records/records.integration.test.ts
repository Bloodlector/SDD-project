import { describe, it, expect, beforeAll, afterAll } from "vitest";

const KAFKA_BROKERS = process.env.KAFKA_BROKERS;

// Skip integration tests if Kafka is not available
const skipIfNoKafka = !KAFKA_BROKERS ? test.skip : test;

describe.skipIf(!KAFKA_BROKERS)("records integration", () => {
  let serverProcess: any;

  beforeAll(async () => {
    // Start the server for integration tests
    // This requires KAFKA_BROKERS to be set
  });

  afterAll(async () => {
    // Cleanup
  });

  skipIfNoKafka("POST /api/records returns 201", async () => {
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
    const data = await response.json();
    expect(data.message).toBe("Запись отправлена");
    expect(data.record).toBeDefined();
    expect(data.record.name).toBe("Test Record");
  });

  skipIfNoKafka("POST /api/records with empty name returns 400", async () => {
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
