import React from "react";
import { TypographyStyleOptions } from "@material-ui/core/styles/createTypography";
import { Typography } from "@material-ui/core";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "body1"
  | "body2"
  | "overline"
  | "caption";

export const typographyStyles: Readonly<Record<
  Variant,
  TypographyStyleOptions
>> = {
  h1: {
    fontFamily: "Visby CF",
    fontWeight: 800,
    fontSize: "2.25rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "150%",
    letterSpacing: "normal"
  },
  h2: {
    fontFamily: "Visby CF",
    fontWeight: 800,
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "140%",
    letterSpacing: "normal"
  },
  h3: {
    fontFamily: "Visby CF",
    fontWeight: "bold",
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "140%",
    letterSpacing: "normal"
  },
  h4: {
    fontFamily: "Visby CF",
    fontWeight: 800,
    fontSize: "1rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "130%",
    letterSpacing: "normal"
  },
  h5: {
    fontFamily: "Visby CF",
    fontWeight: "bold",
    fontSize: "1rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "130%",
    letterSpacing: "normal"
  },
  body1: {
    fontFamily: "Open Sans",
    fontWeight: "normal",
    fontSize: "1.25rem",
    fontStyle: "normal",
    lineHeight: "150%",
    letterSpacing: "normal"
  },
  body2: {
    fontFamily: "Open Sans",
    fontWeight: "normal",
    fontSize: "1rem",
    fontStyle: "normal",
    lineHeight: "150%",
    letterSpacing: "normal"
  },
  overline: {
    fontFamily: "Visby CF",
    fontWeight: 800,
    fontSize: "0.875rem",
    fontStyle: "normal",
    lineHeight: "130%",
    letterSpacing: "0.05em",
    textTransform: "uppercase"
  },
  caption: {
    fontFamily: "Open Sans",
    fontWeight: "normal",
    fontSize: "0.875rem",
    fontStyle: "normal",
    lineHeight: "130%",
    letterSpacing: "normal"
  }
};

type Props = Omit<React.ComponentProps<typeof Typography>, "variant"> & {
  variant?: Variant;
};

const CoreTypography: React.FC<Props> = ({ children, variant, ...rest }) => {
  const coreVariant: Variant = variant ?? "body2";

  return (
    <Typography variant={coreVariant} {...rest}>
      {children}
    </Typography>
  );
};

export default CoreTypography;
