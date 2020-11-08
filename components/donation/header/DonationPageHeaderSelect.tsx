import React, { useState, useCallback, useEffect } from "react";

import { Typography, Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRouter, Router } from "next/router";

import config from "config";
import { DropdownProps } from "utils/types";

const useStyles = makeStyles(({ typography }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center"
    },
    select: {
      minWidth: 180
    },
    selectMargin: {
      marginLeft: 5
    },
    input: {
      ...typography.h6,
      paddingLeft: 6
    }
  })
);

const DonationPageHeaderSelect: React.FC<DropdownProps> = ({
  items,
  selectedValue
}) => {
  const { container, select, selectMargin, input } = useStyles();
  const router = useRouter();
  const [value, setValue] = useState(selectedValue);
  const [disabled, setDisabled] = useState(false);

  const routeChangeStart = useCallback(() => {
    setDisabled(true);
  }, []);

  const routeChangeComplete = useCallback(() => {
    setDisabled(false);
  }, []);

  const onChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      setValue(event.target.value as typeof selectedValue);

      Router.events.on("routeChangeStart", routeChangeStart);
      Router.events.on("routeChangeComplete", routeChangeComplete);

      void router.push(
        config.pages.donate(),
        config.pages.donate(event.target.value as string)
      );
    },
    [router, routeChangeStart, routeChangeComplete]
  );

  useEffect(() => {
    return () => {
      Router.events.off("routeChangeStart", routeChangeStart);
      Router.events.off("routeChangeComplete", routeChangeComplete);
    };
  }, [routeChangeStart, routeChangeComplete]);

  return (
    <div className={container}>
      <Typography variant="h6">Donating to</Typography>
      <Select
        classes={{ select }}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={selectMargin}
        disableUnderline
        inputProps={{
          classes: {
            root: input
          }
        }}
      >
        {items.map(({ text, value }) => (
          <MenuItem key={value} value={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default DonationPageHeaderSelect;
