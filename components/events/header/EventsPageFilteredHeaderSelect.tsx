import React, { useEffect } from "react";

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
import usePosition from "components/events/usePosition";
import { useRouterQueryParamsForSortingState } from "components/events/useRouterQueryParamsState";
import { SORT_OPTIONS, SortValue, DEFAULT_SORT_VALUE } from "utils/sortOptions";

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
        backgroundColor: palette.object.lightOutline,
        borderRadius: 15
      },
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    menuItemSelected: {}
  })
);

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

  const {
    currentState,
    replace,
    shallowPut
  } = useRouterQueryParamsForSortingState();

  const { position, hasError } = usePosition(currentState !== "location");

  useEffect(() => {
    if (hasError && currentState === "location") {
      replace("participants");
    }
  }, [hasError, currentState, replace]);

  // Ensures that the sortValue query parameter reflects the default value if it is not already a valid value
  useEffect(() => {
    if (currentState == null) {
      shallowPut(DEFAULT_SORT_VALUE);
    }
  }, [currentState, position, shallowPut]);

  return (
    <div className={container}>
      {hasError && <EventsPageFilteredHeaderAlert />}
      <FormControl className={input}>
        <CoreTypography variant="h4">Sort by</CoreTypography>
        <Select
          classes={{ select, icon }}
          value={currentState ?? DEFAULT_SORT_VALUE}
          onChange={event => {
            replace(event.target.value as SortValue);
          }}
          autoWidth
          disableUnderline
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
