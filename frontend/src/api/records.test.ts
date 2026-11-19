import { describe, it, expect, vi } from "vitest";
import { createRecord } from "./records.js";

vi.mock("./client.js", () => ({
  postJson: vi.fn(),
}));

import { postJson } from "./client.js";

describe("createRecord", () => {
  it("calls postJson with correct payload", async () => {
    vi.mocked(postJson).mockResolvedValue({
      data: {
        message: "Запись отправлена",
        record: { id: "uuid", name: "Test", description: "Desc" },
      },
    });

    const result = await createRecord("Test", "Desc");

    expect(postJson).toHaveBeenCalledWith("/api/records", expect.objectContaining({
      name: "Test",
      description: "Desc",
    }));

    if ("data" in result) {
      expect(result.data.record.name).toBe("Test");
    }
  });
});
