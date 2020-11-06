import React, { useCallback, useRef, useEffect } from "react";

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
import { OptionValue, SORT_OPTIONS } from "./index";

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

interface Props {
  sort: string;
  setSort: (newSortValue: OptionValue) => void;
  setPosition: (position: Position) => void;
}

const EventsPageFilteredHeaderSelect: React.FC<Props> = ({
  sort,
  setSort,
  setPosition
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

  const { position, hasError } = usePosition(isDisabled.current);

  const onChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      const selectedValue = event.target.value as OptionValue;
      setSort(selectedValue);

      if (selectedValue === "location") {
        isDisabled.current = false;

        if (position != undefined) {
          setPosition(position);
        }
      }
    },
    [setSort, setPosition, position]
  );

  useEffect(() => {
    if (hasError && sort === "location") {
      setSort("participants");
    }
  }, [hasError, setSort, sort]);

  return (
    <div className={container}>
      {hasError && <EventsPageFilteredHeaderAlert />}
      <FormControl className={input}>
        <CoreTypography variant="h4">Sort by</CoreTypography>
        <Select
          classes={{ select, icon }}
          value={sort}
          onChange={onChange}
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
