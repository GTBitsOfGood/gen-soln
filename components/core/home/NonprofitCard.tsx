import { url } from "inspector";

import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import { NonprofitCardData } from "utils/types";

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
    header: {
      marginBottom: 6,
      /* line-clamp isn't supported yet, so the next four rules handle it for us */
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 2,
      overflow: "hidden"
    },
    body: {
      marginBottom: 6
    },
    meta: {
      color: palette.primary.main,
      marginBottom: 6
    },
    banner: (nonprofitcardData: { background: string }) => ({
      height: "200px",
      "background-size": "cover",
      backgroundImage: nonprofitcardData.background,
      opacity: "80%"
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
  const { card, cardContainer, content, image, header, banner } = useStyles(
    nonprofitCardData
  );

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
          </div>
          <div className={content}>
            <CoreTypography variant="h4" className={header}>
              {nonprofitCardData.name}
            </CoreTypography>
          </div>
        </div>
      </div>
    </FocusVisibleOnly>
  );
};

export default NonprofitCard;
