import { useCallback, useMemo } from "react";

import { useRouter } from "next/router";

import { FilterType, getFilterValuesInQuery } from "utils/filters";

const useRouterQueryParamsState = <T extends FilterType>(key: T) => {
  const { query, pathname, push } = useRouter();

  const currentState = useMemo(() => getFilterValuesInQuery(query, key), [
    query,
    key
  ]);

  const routerPushWithUpdatedState = useCallback(
    (updatedState: string[]) => {
      void push({
        pathname,
        query: {
          ...query,
          [key]: updatedState
        }
      });
    },
    [query, key, pathname, push]
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
