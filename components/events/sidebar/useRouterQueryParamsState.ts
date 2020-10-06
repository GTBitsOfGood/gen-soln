import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { returnQueryAsArray } from "utils/util";

const useRouterQueryParamsState = (key: string) => {
  const router = useRouter();

  const query = router.query[key];
  const currentState = useMemo(() => returnQueryAsArray(query), [query]);

  const routerPushWithUpdatedState = useCallback(
    (updatedState: string[]) => {
      void router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          [key]: updatedState
        }
      });
    },
    [router, key]
  );

  const put = useCallback(
    (value: string) => {
      const updated = [...currentState, value];
      routerPushWithUpdatedState(updated);
    },
    [routerPushWithUpdatedState, currentState]
  );

  const remove = useCallback(
    (value: string) => {
      const updated = currentState.filter((s: string) => s !== value);
      routerPushWithUpdatedState(updated);
    },
    [routerPushWithUpdatedState, currentState]
  );

  return { currentState, put, remove };
};

export default useRouterQueryParamsState;
