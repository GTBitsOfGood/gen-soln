import React from "react";

import { FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useRouterQueryParamsForFilterState } from "components/events/useRouterQueryParamsState";
import { FilterType, FilterOptions } from "utils/filters";

import EventsPageDropdownFilterCheckbox from "./EventsPageDropdownFilterCheckbox";

const useStyles = makeStyles({
  optionRoot: {
    display: "grid",
    gridTemplateColumns: "auto",
    rowGap: "10px"
  }
});

interface Props<T extends FilterType> {
  filter: T;
  filterOptions: FilterOptions<T>;
}

const EventsPageDropdownFilter = <T extends FilterType>({
  filter,
  filterOptions
}: React.PropsWithChildren<Props<T>>) => {
  const { optionRoot } = useStyles();

  const { currentState, put, remove } = useRouterQueryParamsForFilterState(
    filter
  );

  return (
    <FormGroup className={optionRoot}>
      {
        // @ts-ignore See open issue: https://github.com/microsoft/TypeScript/issues/36390
        filterOptions.map(({ text, value }: FilterOptions<T>[number]) => {
          const isOptionChecked = currentState.includes(value);

          return (
            <EventsPageDropdownFilterCheckbox
              key={text}
              label={text}
              checked={isOptionChecked}
              onChange={() => {
                isOptionChecked ? remove(value) : put(value);
              }}
            />
          );
        })
      }
    </FormGroup>
  );
};

export default EventsPageDropdownFilter;
