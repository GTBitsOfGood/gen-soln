import React from "react";

import { FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Dropdown } from "utils/types";

import EventsPageDropdownFilterCheckbox from "./EventsPageDropdownFilterCheckbox";
import useRouterQueryParamsState from "./useRouterQueryParamsState";

const useStyles = makeStyles({
  optionRoot: {
    display: "grid",
    gridTemplateColumns: "auto",
    rowGap: "10px"
  }
});

interface Props {
  filter: string;
  filterOptions: Dropdown[];
}

const EventsPageDropdownFilter: React.FC<Props> = ({
  filter,
  filterOptions
}) => {
  const { optionRoot } = useStyles();

  const { currentState, put, remove } = useRouterQueryParamsState(filter);

  return (
    <FormGroup className={optionRoot}>
      {filterOptions.map(({ text, value }) => {
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
      })}
    </FormGroup>
  );
};

export default EventsPageDropdownFilter;
