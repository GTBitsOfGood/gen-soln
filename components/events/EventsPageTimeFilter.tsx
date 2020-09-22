import React from "react";
import clsx from "clsx";

import { useRouter } from "next/router";
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
    color: "#999999"
  },
  optionLabelSelected: {
    color: "#333333"
  }
});

const timeOptions: Dropdown[] = [
  { text: "Today", value: "TODAY" },
  { text: "Tomorrow", value: "TOMORROW" },
  { text: "This Week", value: "WEEK" },
  { text: "This Weekend", value: "WEEKEND" },
  { text: "Next Week", value: "NWEEK" },
  { text: "Next Weekend", value: "NWEEKEND" }
];

const EventsPageTimeFilter: React.FC = () => {
  const router = useRouter();
  const { option, optionRoot, optionLabel, optionLabelSelected } = useStyles();

  const times =
    router.query.time == null
      ? []
      : !Array.isArray(router.query.time)
      ? [router.query.time]
      : router.query.time;

  const toggle = async (selected: string) => {
    await router.push({
      query: times.includes(selected)
        ? { time: times.filter(s => s !== selected) }
        : { time: [...times, selected] }
    });
  };

  return (
    <FormGroup className={optionRoot}>
      {timeOptions.map(({ text, value }) => {
        const isOptionChecked = times.includes(value);

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
                onChange={() => toggle(value)}
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

export default EventsPageTimeFilter;
