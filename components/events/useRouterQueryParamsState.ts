import { ParsedUrlQuery } from "querystring";

import { useCallback } from "react";

import { useRouter } from "next/router";

import { FilterType, getFilterValuesInQuery } from "utils/filters";
import { SORT_VALUE_QUERY_KEY, getSortValueInQuery } from "utils/sortOptions";
import { convertToStringArr } from "utils/util";

export const useRouterQueryParamsForFilterState = <T extends FilterType>(
  key: T
) => useRouterQueryParamsState(key, getFilterValuesInQuery);

export const useRouterQueryParamsForSortingState = () =>
  useRouterQueryParamsState(SORT_VALUE_QUERY_KEY, getSortValueInQuery);

const useRouterQueryParamsState = <
  K extends string,
  V extends ParsedUrlQuery[keyof ParsedUrlQuery]
>(
  key: K,
  getValuesInQuery: (query: ParsedUrlQuery, key: K) => V
) => {
  const { query, pathname, push, replace: routerReplace } = useRouter();

  const currentState = getValuesInQuery(query, key);
  const stateArr = convertToStringArr(currentState);

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
    [push, pathname, query, key]
  );

  const routerShallowReplaceWithUpdatedState = useCallback(
    (updatedState: string[]) => {
      void routerReplace(
        {
          pathname,
          query: {
            ...query,
            [key]: updatedState
          }
        },
        undefined,
        { shallow: true }
      );
    },
    [routerReplace, pathname, query, key]
  );

  const put = useCallback(
    (value: string) => {
      const updated = [...stateArr, value];
      routerPushWithUpdatedState(updated);
    },
    [routerPushWithUpdatedState, stateArr]
  );

  const shallowPut = useCallback(
    (value: string) => {
      const updated = [...stateArr, value];
      routerShallowReplaceWithUpdatedState(updated);
    },
    [routerShallowReplaceWithUpdatedState, stateArr]
  );

  const shallowClear = useCallback(() => {
    void routerReplace(
      {
        pathname,
        query: {
          ...query,
          [key]: []
        }
      },
      undefined,
      { shallow: true }
    );
  }, [key, pathname, query, routerReplace]);

  const remove = useCallback(
    (value: string) => {
      const updated = stateArr.filter((s: string) => s !== value);
      routerPushWithUpdatedState(updated);
    },
    [routerPushWithUpdatedState, stateArr]
  );

  const replace = useCallback(
    (newState: V) => {
      routerPushWithUpdatedState(convertToStringArr(newState));
    },
    [routerPushWithUpdatedState]
  );

  return { currentState, put, shallowPut, remove, replace, shallowClear };
};
