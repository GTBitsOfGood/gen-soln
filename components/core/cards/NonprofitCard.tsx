import React from "react";

import { Chip } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import router from "next/router";

import { CoreButton } from "@core/buttons";
import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import config from "config";
import { NonprofitCardData } from "utils/types";

interface StyleProps {
  logoImage: string;
}

const useStyles = makeStyles<Theme, StyleProps>(({ palette }) =>
  createStyles({
    card: {
      width: 555,
      height: 339,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: palette.background.paper,
      /* 1px borders don't play nice on Chrome, so we use an equivalent
       * box-shadow and wrap the div in another div */
      boxShadow: `0 0 0 1px ${palette.object.lightOutline}`
    },
    cardContainer: {
      width: 556,
      height: 340,
      padding: 1,
      "&:focusVisible": {
        outline: "none"
      }
    },
    content: {
      display: "flex",
      flexDirection: "column"
    },
    header: {
      position: "relative",
      height: 176,
      marginBottom: 6,
      color: palette.background.paper,
      outline: "none",
      display: "flex",
      alignItems: "center",
      borderRadius: "10px 10px 0 0",
      overflow: "hidden",
      "&::before": {
        content: '""',
        backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(/backgrounds/nonprofitBackground.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.8
      }
    },
    logo: {
      width: 124,
      height: 124,
      marginLeft: 24,
      backgroundColor: palette.background.paper,
      content: props => props.logoImage,
      borderRadius: "50%",
      zIndex: 1
    },
    headerInfo: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 42,
      zIndex: 1
    },
    location: {
      marginTop: 8
    },
    cause: {
      height: 34,
      marginTop: 12,
      background: palette.background.paper,
      color: palette.text.primary,
      textTransform: "capitalize",
      pointerEvents: "none"
    },
    aboutContainer: {
      width: 478,
      height: 54,
      marginTop: 20,
      marginLeft: 24,
      fontSize: 14,
      lineHeight: "18.2px",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    donateContainer: {
      display: "flex",
      marginTop: 20,
      marginLeft: 24
    },
    supporters: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: palette.primary.main,
      marginLeft: 16
    }
  })
);

interface Props {
  // see NonprofitCardData under util/types
  nonprofitCardData: NonprofitCardData;
  onClick: () => void;
}

const NonprofitCard: React.FC<Props> = ({ nonprofitCardData, onClick }) => {
  const logoImage = nonprofitCardData.logo;

  const {
    card,
    cardContainer,
    content,
    header,
    logo,
    headerInfo,
    location,
    cause,
    aboutContainer,
    donateContainer,
    supporters
  } = useStyles({ logoImage });

  return (
    <FocusVisibleOnly onClick={onClick}>
      <div className={cardContainer}>
        <div className={card}>
          <div className={header}>
            <img className={logo} alt={`${nonprofitCardData.name}`} />
            <div className={headerInfo}>
              <CoreTypography variant="h2">
                {nonprofitCardData.name}
              </CoreTypography>
              <CoreTypography variant="h5" className={location}>
                Atlanta, GA
              </CoreTypography>
              <Chip
                label={"Causes"} //nonprofitCardData.cause.toLowerCase()}
                className={cause}
              />
            </div>
          </div>
          <div className={content}>
            <div className={aboutContainer}>
              <CoreTypography variant="caption">
                {nonprofitCardData.about}
              </CoreTypography>
            </div>
            <div className={donateContainer}>
              <CoreButton
                variant="contained"
                onClick={() => {
                  void router.push(
                    config.pages.donate(),
                    config.pages.donate(nonprofitCardData._id)
                  );
                }}
              >
                Donate
              </CoreButton>
              <div className={supporters}>
                <CoreTypography variant="h4">5 Supporters</CoreTypography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusVisibleOnly>
  );
};

export default NonprofitCard;
