import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const sourceUrl = "https://worldcup2026cn.com/schedule/";
const matchesFilePath = path.join(projectRoot, "src/data/matches.ts");
const metaFilePath = path.join(projectRoot, "src/data/matches.meta.ts");

const stageMap = {
  小组赛: "group",
  "32强赛": "round_of_32",
  "16强赛": "round_of_16",
  "8强赛": "quarter_final",
  半决赛: "semi_final",
  季军赛: "third_place",
  决赛: "final",
};

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

async function readExistingMatches() {
  const fileContent = await readFile(matchesFilePath, "utf-8");
  const exportIndex = fileContent.indexOf("=");
  const arrayStartIndex = fileContent.indexOf("[", exportIndex);
  const arrayEndIndex = fileContent.lastIndexOf("]");

  if (arrayStartIndex === -1 || arrayEndIndex === -1) {
    throw new Error("无法解析现有 matches.ts 文件");
  }

  const jsonText = fileContent.slice(arrayStartIndex, arrayEndIndex + 1);
  return JSON.parse(jsonText);
}

function parseRowsFromHtml(html) {
  const tableMatch = html.match(/<table[\s\S]*?<\/table>/i);

  if (!tableMatch) {
    throw new Error("未找到赛程表格");
  }

  const rowMatches = tableMatch[0].match(/<tr[\s\S]*?<\/tr>/gi) ?? [];

  return rowMatches
    .map((rowHtml) => {
      const cells = [...rowHtml.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((match) => decodeHtml(match[1]));
      return cells;
    })
    .filter((cells) => cells.length >= 7 && cells[0] !== "日期");
}

function mergeMatches(rows, existingMatches) {
  const existingByNumber = new Map(existingMatches.map((match) => [match.matchNumber, match]));

  return rows.map((row, index) => {
    const matchNumber = index + 1;
    const [date, time, stageLabel, homeTeamRaw, , awayTeamRaw, statusLabel] = row;
    const existingMatch = existingByNumber.get(matchNumber);
    const homeTeam = homeTeamRaw || existingMatch?.homeTeam || "待定";
    const awayTeam = awayTeamRaw || existingMatch?.awayTeam || "待定";

    return {
      id: existingMatch?.id || `match-${String(matchNumber).padStart(3, "0")}`,
      matchNumber,
      stage: stageMap[stageLabel],
      stageLabel,
      group: existingMatch?.group ?? null,
      date,
      time,
      kickoffBeijing: `${date.replaceAll("/", "-")}T${time}:00+08:00`,
      homeTeam,
      awayTeam,
      status: statusLabel === "未开始" ? "scheduled" : statusLabel,
      statusLabel,
      city: existingMatch?.city ?? null,
      venue: existingMatch?.venue ?? null,
      source: "worldcup2026cn",
    };
  });
}

function buildMatchesFileContent(matches) {
  return `import type { MatchItem } from "@/types/match";

export const matches: MatchItem[] = ${JSON.stringify(matches, null, 2)};
`;
}

function buildMetaFileContent(totalMatches) {
  return `import type { MatchDataMeta } from "@/types/match";

export const matchesMeta: MatchDataMeta = {
  sourceUrl: "${sourceUrl}",
  syncedAt: "${new Date().toISOString()}",
  totalMatches: ${totalMatches},
};
`;
}

async function main() {
  const existingMatches = await readExistingMatches();
  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`抓取赛程失败: ${response.status}`);
  }

  const html = await response.text();
  const rows = parseRowsFromHtml(html);
  const mergedMatches = mergeMatches(rows, existingMatches);

  if (mergedMatches.length !== 104) {
    throw new Error(`赛程场次数异常，当前抓取到 ${mergedMatches.length} 场`);
  }

  await writeFile(matchesFilePath, buildMatchesFileContent(mergedMatches), "utf-8");
  await writeFile(metaFilePath, buildMetaFileContent(mergedMatches.length), "utf-8");

  console.log(`已同步 ${mergedMatches.length} 场比赛到本地数据文件`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
