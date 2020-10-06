import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CreateCSSProperties } from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import { typographyStyles } from "@core/typography";

type Props = Omit<React.ComponentProps<typeof Button>, "color" | "size">;

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    contained: {
      textTransform: "capitalize"
    },
    outlined: {
      textTransform: "capitalize",
      padding: "4px 14px", // to take into account the higher borderWidth
      borderWidth: 2,
      borderColor: palette.primary.main,
      "&:hover": {
        borderWidth: 2,
        borderColor: palette.primary.main
      }
    },
    text: {
      paddingLeft: 12,
      paddingRight: 12
    },
    label: ({ variant }: Props) => {
      let labelStyle;

      switch (variant) {
        case "contained":
        case "outlined":
          labelStyle = typographyStyles["h4"];
          break;
        case "text":
        case undefined:
          labelStyle = typographyStyles["overline"];
          break;
        default: {
          const _exhaustiveCheck: never = variant;
          return _exhaustiveCheck;
        }
      }

      return labelStyle as CreateCSSProperties;
    },
    root: {
      minWidth: 99,
      height: 37,
      borderRadius: 100
    }
  })
);

const CoreButton: React.FC<Props> = props => {
  const { root, label, outlined, contained, text } = useStyles(props);
  const { children, ...rest } = props;

  return (
    <Button
      classes={{ root, label, outlined, contained, text }}
      color="primary"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CoreButton;
