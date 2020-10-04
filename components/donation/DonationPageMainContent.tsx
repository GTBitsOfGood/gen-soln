import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import makeStyles from "@material-ui/core/styles/makeStyles";

import DonationPageNonprofitDescription from "./DonationPageNonprofitDescription";
import DonationPageForm from "./form/DonationPageForm";

const DonationPageThankYou = dynamic(() => import("./DonationPageThankYou"));

const white = "white";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "3.5vh 3vh", // Keep in sync with footerContainer style in DonationPageThankYou
    backgroundColor: white
  }
});

interface Props {
  description: string;
  selectedNonprofitId: string;
  stripeAccount: string;
}

const DonationPageMainContent: React.FC<Props> = ({
  description,
  selectedNonprofitId,
  stripeAccount
}) => {
  const { container } = useStyles();
  const [hasDonationCompleted, setHasDonationCompleted] = useState(false);

  const donationCompletedCallback = useCallback(() => {
    setHasDonationCompleted(true);
  }, []);

  return (
    <div className={container}>
      <DonationPageNonprofitDescription description={description} />
      {hasDonationCompleted ? (
        <DonationPageThankYou />
      ) : (
        <DonationPageForm
          donationCompletedCallback={donationCompletedCallback}
          selectedNonprofitId={selectedNonprofitId}
          stripeAccount={stripeAccount}
        />
      )}
    </div>
  );
};

export default DonationPageMainContent;
