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
  parentCallback: (googleMapsPlace: PlaceType) => void;
  inputValueToDisplay?: string; // allows you to override what gets displayed in the text field to the user.
  inputValue?: string; // what Google Maps Autocomplete will query against; provide this to make the input text field controlled.
  inputValueOnChange?: (newInputValue: string) => void;
  freeSolo?: boolean;
  filterOptions?: (options: PlaceType[]) => PlaceType[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  outlined?: boolean;
  clearValueOnClose?: boolean;
}

const LocationAutocompleteInput: React.FC<Props> = ({
  locationType,
  parentCallback,
  textVariant,
  inputValueToDisplay,
  inputValue,
  inputValueOnChange,
  freeSolo = false,
  filterOptions = x => x,
  label = "",
  required = false,
  placeholder = "",
  outlined = true,
  clearValueOnClose = false
}) => {
  const { textStyle, highlightedText, inputAdornmentRoot } = useStyles({
    textVariant
  });
  const [value, setValue] = useState<PlaceType | null>(null);
  const [uncontrolledInputValue, setUncontrolledInputValue] = useState("");
  const [options, setOptions] = useState<PlaceType[]>([]);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(
    null
  );
  const loaded = useRef(false);

  let inputValueToUse: string,
    inputValueOnChangeCallbackToUse: typeof inputValueOnChange;
  if (inputValue != null) {
    inputValueToUse = inputValue;
    inputValueOnChangeCallbackToUse = inputValueOnChange;
  } else {
    inputValueToUse = uncontrolledInputValue;
    inputValueOnChangeCallbackToUse = setUncontrolledInputValue;
  }

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

    if (inputValueToUse === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      {
        input: inputValueToUse
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
  }, [value, inputValueToUse, fetch]);

  return (
    <Autocomplete
      disableClearable
      blurOnSelect
      autoComplete
      includeInputInList
      filterSelectedOptions
      fullWidth
      getOptionLabel={option => option.description}
      classes={{ noOptions: textStyle }}
      freeSolo={freeSolo}
      filterOptions={filterOptions}
      options={options}
      // @ts-ignore For some reason value can't be null when disableClearable is true. However we don't want to set value to undefined either since this component is uncontrolled.
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue !== "string") {
          setOptions(s => [newValue, ...s]);
          setValue(newValue);
          parentCallback(newValue);
        }
      }}
      onInputChange={(event, newInputValue) => {
        inputValueOnChangeCallbackToUse &&
          inputValueOnChangeCallbackToUse(newInputValue);
      }}
      onClose={() => void (clearValueOnClose && setValue(null))}
      renderInput={({ InputProps, ...textFieldProps }) => {
        const { inputProps, ...rest } = textFieldProps;
        // @ts-ignore: Material-ui does not include types for this :/
        inputProps.value = inputValueToDisplay ?? inputValueToUse;
        return (
          <TextField
            {...rest}
            fullWidth
            label={label}
            required={required}
            placeholder={placeholder}
            inputProps={inputProps}
            variant={outlined ? "outlined" : "standard"}
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
        );
      }}
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
