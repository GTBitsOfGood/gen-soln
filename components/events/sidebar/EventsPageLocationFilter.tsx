import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import LocationAutocompleteInput from "components/LocationAutocompleteInput";

import useRouterQueryParamsState from "./useRouterQueryParamsState";
import { XIcon } from "@core/icons";

import { Chip } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);

const EventsPageLocationFilter: React.FC = () => {
  const classes = useStyles();
  const {
    currentState: selectedLocations,
    put,
    remove
  } = useRouterQueryParamsState("location");

  return (
    <>
      <ul className={classes.root}>
        {selectedLocations.map(location => {
          return (
            <li key={location}>
              <Chip
                label={location}
                onDelete={() => remove(location)}
                className={classes.chip}
                deleteIcon={<XIcon />}
              />
            </li>
          );
        })}
      </ul>
      <LocationAutocompleteInput
        parentCallback={value => void put(value)}
        type="PASS_FORMATTED_TEXT_TO_PARENT"
        locationType="(cities)"
        placeholder="E.g. Atlanta, Boston"
      />
    </>
  );
};

export default EventsPageLocationFilter;
