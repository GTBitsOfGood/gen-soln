import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import LocationAutocompleteInput from "../LocationAutocompleteInput";
import useRouterQueryParamsState from "./useRouterQueryParamsState";

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
              />
            </li>
          );
        })}
      </ul>
      <LocationAutocompleteInput
        addLocationChip={value => void put(value)}
        locationType="(cities)"
        label="Search city"
      />
    </>
  );
};

export default EventsPageLocationFilter;
