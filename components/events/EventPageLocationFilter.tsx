import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

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

interface Props {
  content: string[];
  deleteLocation: (value: string) => void;
}

const EventsPageLocationFilter: React.FC<Props> = props => {
  const classes = useStyles();
  const selectedLocations = props.content;
  return (
    <ul className={classes.root}>
      {selectedLocations.map(location => {
        return (
          <li key={location}>
            <Chip
              label={location}
              onDelete={() => props.deleteLocation(location)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default EventsPageLocationFilter;
