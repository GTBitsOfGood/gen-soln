import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import makeStyles from "@material-ui/core/styles/makeStyles";

import DonationPageFormBodyNonprofitDescription from "./DonationPageFormBodyNonprofitDescription";
import DonationPageFormBodyStateProvider from "./DonationPageFormBodyStateProvider";

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
}

const DonationPageFormBody: React.FC<Props> = ({
  description,
  selectedNonprofitId
}) => {
  const { container } = useStyles();
  const [hasDonationCompleted, setHasDonationCompleted] = useState(false);

  const donationCompletedCallback = useCallback(() => {
    setHasDonationCompleted(true);
  }, []);

  return (
    <div className={container}>
      <DonationPageFormBodyNonprofitDescription description={description} />
      {hasDonationCompleted ? (
        <DonationPageThankYou />
      ) : (
        <DonationPageFormBodyStateProvider
          donationCompletedCallback={donationCompletedCallback}
          selectedNonprofitId={selectedNonprofitId}
        />
      )}
    </div>
  );
};

export default DonationPageFormBody;
