import React from "react";
import clsx from "clsx";
import { Dropdown } from "utils/types";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Typography
} from "@material-ui/core";

import UncheckedIcon from "@horizon/icons/UncheckedIcon";
import CheckedIcon from "@horizon/icons/CheckedIcon";
import useRouterQueryParamsState from "./useRouterQueryParamsState";

const useStyles = makeStyles({
  subtitle: {
    // TODO: replace this with a Typography component
    fontFamily: "Visby CF, sans-serif",
    fontWeight: 800,
    fontSize: 16,
    lineHeight: "130%",
    color: "#333333"
  },
  checkbox: {
    color: "#EC762F"
  },
  optionRoot: {
    display: "grid",
    gridTemplateColumns: "auto",
    rowGap: "10px"
  },
  option: {
    height: 18
  },
  optionLabel: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    lineHeight: "130%",
    maxWidth: "143px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#999999"
  },
  optionLabelSelected: {
    color: "#333333"
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
  const { option, optionRoot, optionLabel, optionLabelSelected } = useStyles();

  const { currentState, put, remove } = useRouterQueryParamsState(filter);

  return (
    <FormGroup className={optionRoot}>
      {filterOptions.map(({ text, value }) => {
        const isOptionChecked = currentState.includes(value);

        return (
          <FormControlLabel
            key={text}
            label={
              <Typography
                className={clsx(
                  optionLabel,
                  isOptionChecked && optionLabelSelected
                )}
              >
                {text}
              </Typography>
            }
            className={option}
            control={
              <Checkbox
                className={optionLabel}
                checked={isOptionChecked}
                onChange={() => {
                  isOptionChecked ? remove(value) : put(value);
                }}
                // TODO: replace with Horizon colors
                icon={<UncheckedIcon color="#999999" />}
                checkedIcon={<CheckedIcon color={"#FD8033"} />}
              />
            }
          />
        );
      })}
    </FormGroup>
  );
};

export default EventsPageDropdownFilter;
