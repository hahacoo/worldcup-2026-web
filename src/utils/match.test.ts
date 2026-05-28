import { describe, expect, it } from "vitest";
import { matches } from "@/data/matches";
import { getAllTeams, getMatchesByTeam, getTeamRoute, matchIncludesTeam } from "@/utils/match";

describe("match utils", () => {
  it("collects unique teams", () => {
    const teams = getAllTeams(matches);
    expect(teams).toContain("阿根廷");
    expect(teams).toContain("英格兰");
  });

  it("filters matches by team", () => {
    const argentinaMatches = getMatchesByTeam(matches, "阿根廷");
    expect(argentinaMatches.length).toBeGreaterThan(0);
    expect(argentinaMatches.every((match) => matchIncludesTeam(match, "阿根廷"))).toBe(true);
  });

  it("builds encoded team route", () => {
    expect(getTeamRoute("阿根廷")).toContain("%E9%98%BF%E6%A0%B9%E5%BB%B7");
  });
});
