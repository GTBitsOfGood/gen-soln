import React from "react";
import clsx from "clsx";

import { Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";
import { typographyStyles } from "@core/typography";

import { TasklistUncheckedIcon, TasklistCheckedIcon } from "@core/icons";
import grays from "@core/colors/grays";

const useStyles = makeStyles({
  optionRoot: {
    height: 18
  },
  optionLabel: {
    ...typographyStyles.caption,
    maxWidth: 144,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  unselected: {
    color: grays[40]
  },
  checkboxRoot: {
    fontSize: "inherit"
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
  const { optionRoot, optionLabel, unselected, checkboxRoot } = useStyles();

  return (
    <FormControlLabel
      label={label}
      classes={{
        root: optionRoot,
        label: clsx(optionLabel, !checked && unselected)
      }}
      control={
        <Checkbox
          classes={{
            root: clsx(checkboxRoot, !checked && unselected)
          }}
          checked={checked}
          onChange={onChange}
          icon={<TasklistUncheckedIcon fontSize="inherit" />}
          checkedIcon={<TasklistCheckedIcon fontSize="inherit" />}
        />
      }
    />
  );
};

export default EventsPageDropdownFilterCheckbox;
