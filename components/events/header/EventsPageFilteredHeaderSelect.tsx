import React, { useState, useCallback, useRef, useEffect } from "react";

import {
  makeStyles,
  createStyles,
  Select,
  MenuItem,
  FormControl,
  Theme
} from "@material-ui/core";

import { ChevronDownIcon } from "@core/icons";
import CoreTypography from "@core/typography";

import { usePosition } from "../usePosition";
import EventsPageFilteredHeaderAlert from "./EventsPageFilteredHeaderAlert";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      color: palette.primary.main,
      paddingTop: 6
    },
    select: {
      color: palette.primary.main
    },
    input: {
      "&:focus": {
        backgroundColor: "transparent"
      },
      paddingRight: "1rem !important",
      minWidth: 120
    },
    icon: {
      color: palette.primary.main,
      fontSize: "0.9rem",
      top: "auto"
    },
    menu: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${palette.object.lightOutline}`,
      borderRadius: 10,
      boxSizing: "border-box",
      boxShadow: "0 5px 10px"
    },
    menuRoot: {
      borderRadius: 10
    },
    menuItemRoot: {
      "&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover": {
        backgroundColor: palette.primary.main,
        borderRadius: 15
      },
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    menuItemSelected: {}
  })
);

const SORT_OPTIONS = [
  { text: "Closest to you", value: "location" },
  { text: "Most signed up", value: "participants" }
] as const;
type OptionValue = typeof SORT_OPTIONS[number]["value"];

const EventsPageFilteredHeaderSelect: React.FC = () => {
  const {
    container,
    select,
    input,
    icon,
    menu,
    menuRoot,
    menuItemRoot,
    menuItemSelected
  } = useStyles();

  const isDisabled = useRef(true);

  const { hasError } = usePosition(isDisabled.current);

  const [value, setValue] = useState<OptionValue>("participants");

  const onChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      const selectedValue = event.target.value as OptionValue;
      setValue(selectedValue);

      if (selectedValue === "location") {
        isDisabled.current = false;
      }
    },
    []
  );

  useEffect(() => {
    if (hasError && value === "location") {
      setValue("participants");
    }
  }, [hasError, value]);

  return (
    <div className={container}>
      {hasError && <EventsPageFilteredHeaderAlert />}
      <FormControl className={input}>
        <CoreTypography variant="h4">Sort by</CoreTypography>
        <Select
          classes={{ select, icon }}
          value={value}
          onChange={onChange}
          autoWidth={true}
          disableUnderline={true}
          IconComponent={ChevronDownIcon}
          inputProps={{
            classes: {
              root: input
            }
          }}
          MenuProps={{
            classes: {
              list: menu,
              paper: menuRoot
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
        >
          {SORT_OPTIONS.map(({ text, value: optionValue }) => (
            <MenuItem
              key={optionValue}
              value={optionValue}
              classes={{
                root: menuItemRoot,
                selected: menuItemSelected
              }}
              disabled={hasError && optionValue === "location"}
            >
              <CoreTypography variant="body2">{text}</CoreTypography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default EventsPageFilteredHeaderSelect;
