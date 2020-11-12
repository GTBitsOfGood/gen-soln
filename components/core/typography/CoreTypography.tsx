import React from "react";

import { Typography } from "@material-ui/core";

type Variant = keyof typeof typographyStyles;

export const typographyStyles = {
  h1: {
    fontFamily: "VisbyCF-ExtraBold",
    fontWeight: 800,
    fontSize: "2.25rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "150%",
    letterSpacing: "normal"
  },
  h2: {
    fontFamily: "VisbyCF-ExtraBold",
    fontWeight: 800,
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "140%",
    letterSpacing: "normal"
  },
  h3: {
    fontFamily: "VisbyCF-Bold",
    fontWeight: "bold",
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "140%",
    letterSpacing: "normal"
  },
  h4: {
    fontFamily: "VisbyCF-ExtraBold",
    fontWeight: 800,
    fontSize: "1rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "130%",
    letterSpacing: "normal"
  },
  h5: {
    fontFamily: "VisbyCF-Bold",
    fontWeight: "bold",
    fontSize: "1rem",
    fontStyle: "normal",
    fontFeatureSettings: "'liga' off",
    lineHeight: "130%",
    letterSpacing: "normal"
  },
  body1: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "normal",
    fontSize: "1.25rem",
    fontStyle: "normal",
    lineHeight: "150%",
    letterSpacing: "normal"
  },
  body2: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "normal",
    fontSize: "1rem",
    fontStyle: "normal",
    lineHeight: "150%",
    letterSpacing: "normal"
  },
  overline: {
    fontFamily: "VisbyCF-ExtraBold",
    fontWeight: 800,
    fontSize: "0.875rem",
    fontStyle: "normal",
    lineHeight: "130%",
    letterSpacing: "0.05em",
    textTransform: "uppercase"
  },
  caption: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "normal",
    fontSize: "0.875rem",
    fontStyle: "normal",
    lineHeight: "130%",
    letterSpacing: "normal"
  }
} as const;

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
