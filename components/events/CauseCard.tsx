import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    background: "#FFFFFF",
    width: 358,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 0 0 1px #F0F0F0",
    outline: "none"
  },
  cardContainer: {
    position: "relative",
    width: 360,
    height: 202,
    padding: 1
  },
  image: {
    display: "block",
    width: "inherit",
    objectFit: "cover"
  },
  textContainer: {
    position: "absolute",
    width: 280,
    height: 68,
    left: "calc(50% - 280px/2)",
    top: "calc(50% - 68px/2)"
  },
  causeText: {
    color: "#FFFFFF",
    fontFamily: "Visby CF",
    fontSize: 24,
    fontWeight: 800,
    lineHeight: "140%",
    display: "flex",
    alignItems: "center",
    textAlign: "center"
  }
});

interface Props {
  cause: string;
  imagePath: string;
  onClick: () => void;
}

const CauseCardLarge: React.FC<Props> = ({ cause, imagePath, onClick }) => {
  const { card, cardContainer, textContainer, image, causeText } = useStyles();

  return (
    <div className={cardContainer}>
      <div
        className={card}
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex={0}
      >
        <img src={imagePath} className={image} alt={`${cause}`} />
        <div className={textContainer}>
          <Typography className={causeText}>{cause}</Typography>
        </div>
      </div>
    </div>
  );
};

export default CauseCardLarge;
