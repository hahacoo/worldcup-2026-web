import { useEffect, useState } from "react";
import { localMatchDataProvider } from "@/services/matchDataProvider";
import type { MatchDataMeta, MatchDataProvider, MatchItem } from "@/types/match";

interface MatchesDataState {
  matches: MatchItem[];
  meta: MatchDataMeta;
  loading: boolean;
  error: string;
}

export function useMatchesData(provider: MatchDataProvider = localMatchDataProvider) {
  const [state, setState] = useState<MatchesDataState>(() => {
    const snapshot = provider.getSnapshot();

    return {
      matches: snapshot,
      meta: provider.getMetaSnapshot(),
      loading: snapshot.length === 0,
      error: "",
    };
  });

  useEffect(() => {
    let active = true;

    provider
      .getAllMatches()
      .then((matches) => {
        if (!active) {
          return;
        }

        setState({
          matches,
          meta: provider.getMetaSnapshot(),
          loading: false,
          error: "",
        });
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }

        setState((current) => ({
          ...current,
          loading: false,
          error: error instanceof Error ? error.message : "加载比赛数据失败",
        }));
      });

    return () => {
      active = false;
    };
  }, [provider]);

  return state;
}
