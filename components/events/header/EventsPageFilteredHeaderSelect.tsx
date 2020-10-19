import React, { useState, useCallback, useRef } from "react";

import { makeStyles, Select, MenuItem, FormControl } from "@material-ui/core";

import { ChevronDownIcon } from "@core/icons";
import CoreTypography from "@core/typography";
import { DropdownProps } from "utils/types";

import { usePosition } from "../usePosition";
import EventsPageFilteredHeaderAlert from "./EventsPageFilteredHeaderAlert";

const useStyles = makeStyles({
  container: {
    display: "flex",
    color: "#FD8033",
    paddingTop: 6
  },
  select: {
    color: "#FD8033"
  },
  input: {
    "&:focus": {
      backgroundColor: "transparent"
    },
    paddingRight: "0 !important"
  },
  icon: {
    color: "#FD8033",
    fontSize: "0.90rem",
    marginTop: 2.5,
    marginLeft: 10
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #F0F0F0",
    borderRadius: 10,
    boxSizing: "border-box",
    boxShadow: "0 5px 10px"
  },
  menuRoot: {
    borderRadius: 10
  },
  menuItemRoot: {
    "&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover": {
      backgroundColor: "#FD8033",
      borderRadius: 15
    },
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menuItemSelected: {}
});

const EventsPageFilteredHeaderSelect: React.FC<DropdownProps> = ({
  items,
  selectedValue
}) => {
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

  const { position, error } = usePosition(isDisabled.current);

  const [value, setValue] = useState(selectedValue);

  const onChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      setValue(event.target.value as typeof selectedValue);

      if (event.target.value === "location") {
        isDisabled.current = false;
      }
    },
    []
  );

  return (
    <div className={container}>
      {error && <EventsPageFilteredHeaderAlert />}
      <FormControl className={input}>
        <CoreTypography variant="h4">Sort by</CoreTypography>
        <Select
          classes={{ select }}
          value={value}
          onChange={onChange}
          autoWidth={true}
          disableUnderline={true}
          IconComponent={() => <ChevronDownIcon className={icon} />}
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
          {items.map(({ text, value }) => (
            <MenuItem
              key={value}
              value={value}
              classes={{
                root: menuItemRoot,
                selected: menuItemSelected
              }}
              disabled={(error && value === "location") as boolean}
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
