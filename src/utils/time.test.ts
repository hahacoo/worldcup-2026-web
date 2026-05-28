import { describe, expect, it } from "vitest";
import { formatKickoff, getCountdownLabel, isUpcoming } from "@/utils/time";

describe("time utils", () => {
  it("formats beijing kickoff consistently", () => {
    expect(formatKickoff("2026-06-12T03:00:00+08:00")).toContain("6月12日");
    expect(formatKickoff("2026-06-12T03:00:00+08:00")).toContain("03:00");
  });

  it("returns countdown label for future time", () => {
    const now = new Date("2026-06-10T00:00:00+08:00");
    expect(getCountdownLabel("2026-06-12T03:00:00+08:00", now)).toContain("天");
  });

  it("detects upcoming match", () => {
    expect(isUpcoming("2026-06-12T03:00:00+08:00", new Date("2026-06-11T03:00:00+08:00"))).toBe(true);
  });
});
