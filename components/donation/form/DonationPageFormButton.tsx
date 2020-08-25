import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

import ButtonWithNonprofitColor from "components/ButtonWithNonprofitColor";
import DonationPageFormAdminLoginLink from "./DonationPageFormAdminLoginLink";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 0.75,
    flexDirection: "column",
    alignItems: "center",
    minHeight: 72
  },
  rightMargin: {
    marginRight: 8
  }
});

interface Props {
  disabled: boolean;
  showLoadingIndicator: boolean;
  ctaText: string;
}

const DonationPageFormButton: React.FC<Props> = ({
  disabled,
  showLoadingIndicator,
  ctaText
}) => {
  const { container, rightMargin } = useStyles();

  return (
    <div className={container}>
      <ButtonWithNonprofitColor disabled={disabled} type="submit">
        {showLoadingIndicator && (
          <CircularProgress className={rightMargin} color="inherit" size={16} />
        )}
        {ctaText}
      </ButtonWithNonprofitColor>
      <DonationPageFormAdminLoginLink />
    </div>
  );
};

export default DonationPageFormButton;
