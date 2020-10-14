import React, { useRef, useState, useMemo, useEffect } from "react";

import { TextField, InputAdornment, Grid } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import clsx from "clsx";
import throttle from "lodash/throttle";

import { SearchIcon } from "@core/icons";
import CoreTypography, { typographyStyles } from "@core/typography";
import config from "config";

const useStyles = makeStyles({
  textStyle: typographyStyles.caption,
  highlightedText: {
    fontWeight: 800
  },
  inputAdornmentRoot: {
    marginLeft: 6
  }
});

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

export type PlaceType = google.maps.places.AutocompletePrediction;

interface Props {
  locationType: string;
  parentCallback: (value: PlaceType) => void;
  filterOptions?: (options: PlaceType[]) => PlaceType[];
  label?: string;
  fullWidth?: boolean;
  defaultValue?: PlaceType | null;
  required?: boolean;
  placeholder?: string;
  clearInputOnClose?: boolean;
}

const LocationAutocompleteInput: React.FC<Props> = ({
  locationType,
  parentCallback,
  filterOptions = x => x,
  label = "",
  fullWidth = false,
  defaultValue = null,
  required = false,
  placeholder = "",
  clearInputOnClose = false
}) => {
  const { textStyle, highlightedText, inputAdornmentRoot } = useStyles();
  const [value, setValue] = useState<PlaceType | null>(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<PlaceType[]>([]);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(
    null
  );
  const loaded = useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `https://maps.googleapis.com/maps/api/js?key=${config.googleMaps
          .clientKey!}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: PlaceType[]) => void
        ) => {
          autocompleteService.current?.getPlacePredictions(
            {
              ...request,
              types: [locationType],
              componentRestrictions: { country: "us" }
            },
            callback
          );
        },
        200
      ),
    [locationType]
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      {
        input: inputValue
      },
      (results?: PlaceType[]) => {
        if (active) {
          let newOptions = [] as PlaceType[];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      getOptionLabel={option =>
        typeof option === "string" ? option : option.description
      }
      classes={{ noOptions: textStyle }}
      blurOnSelect
      filterOptions={filterOptions}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      fullWidth={fullWidth}
      value={value}
      onChange={(
        event: React.ChangeEvent<unknown>,
        newValue: PlaceType | null
      ) => {
        if (newValue) {
          setOptions(s => [newValue, ...s]);
          parentCallback(newValue);
        }

        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onClose={() => void (clearInputOnClose && setValue(null))}
      renderInput={({ InputProps, ...rest }) => (
        <TextField
          {...rest}
          label={label}
          variant="outlined"
          fullWidth
          required={required}
          placeholder={placeholder}
          InputProps={{
            ...InputProps,
            startAdornment: (
              <InputAdornment
                classes={{ root: inputAdornmentRoot }}
                position="start"
              >
                <SearchIcon fontSize="inherit" />
              </InputAdornment>
            ),
            classes: { root: textStyle }
          }}
        />
      )}
      renderOption={option => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            {parts.map(({ text, highlight }, index) => (
              <CoreTypography
                variant="caption"
                key={index}
                className={clsx(highlight && highlightedText)}
              >
                {text.replace(/ /g, "\u00a0")}
              </CoreTypography>
            ))}
            <CoreTypography variant="caption">
              , {option.structured_formatting.secondary_text}
            </CoreTypography>
          </Grid>
        );
      }}
    />
  );
};

export default LocationAutocompleteInput;
