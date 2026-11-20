import { describe, it, expect, vi, beforeEach } from "vitest";
import { createRecord } from "./service.js";
import * as repository from "./repository.js";

vi.mock("./repository.js", () => ({
  publishRecord: vi.fn(),
}));

vi.mock("node:crypto", () => ({
  randomUUID: vi.fn(),
}));

import { randomUUID } from "node:crypto";

describe("createRecord", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("generates record with UUID and publishes", async () => {
    const mockId = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
    vi.mocked(randomUUID).mockReturnValue(mockId);
    vi.mocked(repository.publishRecord).mockResolvedValue(undefined);

    const input = { id: "input-id", name: "Test", description: "Desc" };
    const result = await createRecord(input);

    expect(randomUUID).toHaveBeenCalled();
    expect(repository.publishRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockId,
        name: "Test",
        description: "Desc",
      }),
    );
    expect(result.id).toBe(mockId);
    expect(result.name).toBe("Test");
    expect(result.description).toBe("Desc");
    expect(result.timestamp).toBeDefined();
    expect(typeof result.timestamp).toBe("string");
  });
});
