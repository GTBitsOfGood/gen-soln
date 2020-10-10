import React from "react";

import { useRouter } from "next/router";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { CheckCircleIcon } from "@core/icons";

import config from "config";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 3
    },
    thankYouContainer: {
      display: "flex",
      flex: 2,
      flexDirection: "column",
      alignItems: "center"
    },
    footerContainer: {
      backgroundColor: palette.background.default,
      flex: 1,
      display: "flex",
      margin: "-3.5vh -3vh", // Keep in sync with container style in DonationPageFormBody
      padding: "3.5vh 3vh"
    },
    textContainer: {
      flex: 3.5
    },
    buttonContainer: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      flex: 1
    },
    icon: {
      color: "#FD8033", // TODO: use color from core/
      marginBottom: 16
    }
  })
);

const DonationPageThankYou: React.FC = () => {
  const {
    icon,
    container,
    thankYouContainer,
    footerContainer,
    textContainer,
    buttonContainer
  } = useStyles();
  const router = useRouter();

  return (
    <div className={container}>
      <div className={thankYouContainer}>
        <CheckCircleIcon fontSize="large" className={icon} />
        <Typography variant="h5">Thank you for your donation</Typography>
      </div>
      <div className={footerContainer}>
        <div className={textContainer}>
          <Typography variant="h6">
            Support more nonprofits at Bits of Good{" "}
          </Typography>
          <Typography variant="body2">
            The GT Bits of Good team connects our students with local nonprofits
            by building powerful web apps.
          </Typography>
        </div>
        <div className={buttonContainer}>
          <Button
            onClick={() => {
              void router.push(config.pages.index);
            }}
          >
            Visit Site
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationPageThankYou;
