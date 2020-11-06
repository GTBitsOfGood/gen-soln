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

interface StyleProps {
  textVariant: keyof typeof typographyStyles;
}

const useStyles = makeStyles({
  // @ts-ignore: Pretty sure bug in mui types
  textStyle: (props: StyleProps) => typographyStyles[props.textVariant],
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

interface Props extends StyleProps {
  locationType: string;
  parentCallback: (value: PlaceType) => void;
  parentInputChangeCallback?: (value: string) => void;
  filterOptions?: (options: PlaceType[]) => PlaceType[];
  label?: string;
  fullWidth?: boolean;
  defaultInputValue?: string;
  required?: boolean;
  placeholder?: string;
  clearInputOnClose?: boolean;
  freeSolo?: boolean;
  outlined?: boolean;
}

const LocationAutocompleteInput: React.FC<Props> = ({
  locationType,
  parentCallback,
  parentInputChangeCallback,
  filterOptions = x => x,
  label = "",
  fullWidth = false,
  defaultInputValue = "",
  required = false,
  placeholder = "",
  clearInputOnClose = false,
  freeSolo = false,
  outlined = true,
  textVariant
}) => {
  const { textStyle, highlightedText, inputAdornmentRoot } = useStyles({
    textVariant
  });
  const value = useRef<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState(defaultInputValue);
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
      setOptions(value.current ? [value.current] : []);
      return undefined;
    }

    fetch(
      {
        input: inputValue
      },
      (results?: PlaceType[]) => {
        if (active) {
          let newOptions = [] as PlaceType[];

          if (value.current) {
            newOptions = [value.current];
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
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      freeSolo={freeSolo}
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
      value={inputValue}
      onChange={(event, newValue) => {
        if (newValue && typeof newValue !== "string") {
          setOptions(s => [newValue, ...s]);
          parentCallback(newValue);
          parentInputChangeCallback
            ? setInputValue(newValue.structured_formatting.main_text)
            : (value.current = newValue);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        parentInputChangeCallback && parentInputChangeCallback(newInputValue);
      }}
      disableClearable={!clearInputOnClose}
      onClose={() => void (clearInputOnClose && setInputValue(""))}
      renderInput={({ InputProps, ...rest }) => (
        <TextField
          {...rest}
          label={label}
          variant={outlined ? "outlined" : "standard"}
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
