import React, { useState } from "react";

// import { useRouter } from "next/router";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(({ palette, typography }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center"
    },
    select: {
      minWidth: 180
    },
    selectMargin: {
      marginLeft: 16
    },
    input: { ...typography.h6, paddingLeft: 6 },
    color: {
      color: palette.nonProfitColors.secondary
    }
  })
);

const DonationPageHeaderSelect: React.FC = () => {
  const { container, select, selectMargin, color, input } = useStyles();
  // const router = useRouter();

  const [value, setValue] = useState(0);

  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setValue(event.target.value as number);
    // Uncomment the following for demo purposes:
    // router.push("/[id]", "/46546");
  };

  return (
    <div className={container}>
      <Typography variant="h6">Donating to</Typography>
      <Select
        classes={{ select, icon: color }}
        value={value}
        onChange={onChange}
        className={selectMargin}
        disableUnderline={true}
        inputProps={{
          classes: {
            root: `${color} ${input}`
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
