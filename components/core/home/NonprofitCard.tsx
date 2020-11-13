import { url } from "inspector";

import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { signIn } from "next-auth/client";

import { CoreButton } from "@core/buttons";
import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import { NonprofitCardData } from "utils/types";

import config from "../../../config";

const useStyles = makeStyles(({ palette }: Theme) =>
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
      width: 555,
      height: 339,
      padding: 1,
      "&:focusVisible": {
        outline: "none"
      }
    },
    image: {
      display: "block",
      height: 128,
      width: "inherit",
      objectFit: "cover"
    },
    content: {
      padding: "16px 24px"
    },
    name: {
      color: "white",
      "margin-left": 50,
      "margin-top": 20
    },
    description: {
      "font-size": 14
    },
    button: {
      width: "160px",
      margin: "20px 0px"
    },
    banner: (nonprofitcardData: { background: string }) => ({
      height: "200px",
      "background-size": "cover",
      backgroundImage:
        `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ` +
        nonprofitcardData.background,
      opacity: "90%",
      display: "flex",
      flexDirection: "row"
    })
  })
);

interface Props {
  nonprofitCardData: NonprofitCardData;
  onClick: () => void;
}

const NonprofitCard = (props: Props) => {
  const { nonprofitCardData, onClick } = props;
  const logo_path: string = nonprofitCardData.logo.split('"')[1];
  const {
    card,
    cardContainer,
    content,
    image,
    name,
    banner,
    description,
    button
  } = useStyles(nonprofitCardData);

  return (
    <FocusVisibleOnly onClick={onClick}>
      <div className={cardContainer}>
        <div className={card}>
          <div className={banner}>
            <img
              src={logo_path}
              className={image}
              alt={`${nonprofitCardData.name}`}
            />
            <div>
              <CoreTypography variant="h3" className={name}>
                {nonprofitCardData.name}
              </CoreTypography>
            </div>
          </div>
          <div className={content}>
            <CoreTypography variant="body1" className={description}>
              {nonprofitCardData.about}
            </CoreTypography>
            <CoreButton
              variant="contained"
              onClick={e => {
                e.preventDefault();
                window.location.replace(
                  config.pages.nonprofit(nonprofitCardData._id)
                );
              }}
              className={button}
            >
              Donate
            </CoreButton>
          </div>
        </div>
      </div>
    </FocusVisibleOnly>
  );
};

export default NonprofitCard;
