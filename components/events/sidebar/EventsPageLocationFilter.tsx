import React from "react";

import { Chip } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { XIcon } from "@core/icons";
import { typographyStyles } from "@core/typography";
import { useRouterQueryParamsForFilterState } from "components/events/useRouterQueryParamsState";
import LocationAutocompleteInput, {
  PlaceType
} from "components/LocationAutocompleteInput";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    rootContainer: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: 8,
      marginRight: -4,
      marginBottom: -6
    },
    chip: {
      marginRight: 4,
      marginBottom: 6,
      backgroundColor: palette.object.lightOutline,
      ...typographyStyles.caption
    },
    deleteIcon: {
      color: "inherit",
      "&:hover": {
        color: "inherit"
      },
      height: 14,
      width: 14,
      marginRight: 7,
      marginLeft: -8
    }
  })
);

const formattedPlace = ({ description }: PlaceType) =>
  description.slice(0, description.lastIndexOf(","));

const EventsPageLocationFilter: React.FC = () => {
  const { rootContainer, chip, deleteIcon } = useStyles();
  const {
    currentState: selectedLocations,
    put,
    remove
  } = useRouterQueryParamsForFilterState("location");

  return (
    <>
      <LocationAutocompleteInput
        clearInputOnClose
        locationType="(cities)"
        placeholder="E.g. Atlanta, Boston"
        parentCallback={place => void put(formattedPlace(place))}
        filterOptions={options =>
          options.filter(
            option => !selectedLocations.includes(formattedPlace(option))
          )
        }
        textVariant="caption"
      />
      <div className={rootContainer}>
        {selectedLocations.map(location => (
          <Chip
            label={location}
            key={location}
            onDelete={() => void remove(location)}
            classes={{ root: chip, deleteIcon }}
            deleteIcon={<XIcon />}
          />
        ))}
      </div>
    </>
  );
};

export default EventsPageLocationFilter;
