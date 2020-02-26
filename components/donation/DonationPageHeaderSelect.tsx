import React, { useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";

import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center"
  },
  select: {
    minWidth: 160
  },
  selectMargin: {
    marginLeft: 16
  },
  bold: {
    fontWeight: "bold"
  },
  input: {
    paddingLeft: 6
  }
});

const DonationPageHeaderSelect: React.FC = () => {
  const { container, select, selectMargin, bold, input } = useStyles();

  const [value, setValue] = useState(0);

  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setValue(event.target.value as number);
  };

  return (
    <div className={container}>
      <Typography variant="subtitle1" classes={{ subtitle1: bold }}>
        Donating to
      </Typography>
      <Select
        classes={{ select }}
        value={value}
        onChange={onChange}
        className={selectMargin}
        disableUnderline={true}
        inputProps={{
          classes: {
            root: `${bold} ${input}`
          }
        }}
      >
        <MenuItem value={0}>Hearts2Hearts</MenuItem>
        <MenuItem value={1}>American Red Cross</MenuItem>
        <MenuItem value={2}>Goodwill </MenuItem>
      </Select>
    </div>
  );
};

export default DonationPageHeaderSelect;
