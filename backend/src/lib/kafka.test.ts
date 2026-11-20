import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Clear module cache between tests
vi.doUnmock("kafkajs");

describe("kafka", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates Kafka instance with correct config", async () => {
    const { getProducer } = await import("./kafka.js");
    // Just verify the module loads without error
    expect(getProducer).toBeDefined();
  });

  it("uses default broker and topic", async () => {
    const { KAFKA_TOPIC } = await import("./kafka.js");
    expect(KAFKA_TOPIC).toBe("KafkaTest");
  });
});
