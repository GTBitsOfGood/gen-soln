import React from "react";
import clsx from "clsx";

import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography
} from "@material-ui/core";

import { UncheckedBoxIcon, CheckedBoxIcon } from "@core/icons";

const useStyles = makeStyles({
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
  label: string;
  checked: boolean;
  onChange: () => void;
}

const EventsPageDropdownFilterCheckbox: React.FC<Props> = ({
  label,
  checked,
  onChange
}) => {
  const { option, optionLabel, optionLabelSelected } = useStyles();

  return (
    <FormControlLabel
      label={
        <Typography
          className={clsx(optionLabel, checked && optionLabelSelected)}
        >
          {label}
        </Typography>
      }
      className={option}
      control={
        <Checkbox
          className={optionLabel}
          checked={checked}
          onChange={onChange}
          // TODO: replace with Horizon colors
          icon={<UncheckedBoxIcon />}
          checkedIcon={<CheckedBoxIcon />}
        />
      }
    />
  );
};

export default EventsPageDropdownFilterCheckbox;
