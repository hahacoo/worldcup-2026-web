import { describe, expect, it } from "vitest";
import { localMatchDataProvider } from "@/services/matchDataProvider";

describe("localMatchDataProvider", () => {
  it("returns snapshot and metadata", () => {
    expect(localMatchDataProvider.getSnapshot().length).toBeGreaterThan(0);
    expect(localMatchDataProvider.getMetaSnapshot().totalMatches).toBe(104);
  });

  it("gets a match by id", async () => {
    const match = await localMatchDataProvider.getMatchById("match-001");
    expect(match?.homeTeam).toBe("墨西哥");
  });

  it("gets matches by team", async () => {
    const matches = await localMatchDataProvider.getMatchesByTeam("阿根廷");
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((match) => match.homeTeam === "阿根廷" || match.awayTeam === "阿根廷")).toBe(true);
  });
});
