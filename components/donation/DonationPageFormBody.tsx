import React, { useState, useCallback, useMemo } from "react";
import dynamic, { DynamicOptions } from "next/dynamic";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import ButtonWithNonProfitColor from "components/ButtonWithNonProfitColor";
import DonationPageFormNavigation from "./DonationPageFormNavigation";

import { ContentComponentProps } from "./types";

const white = "white";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "3.5vh 3vh",
    backgroundColor: white
  },
  contentContainer: {
    flex: 3
  },
  buttonContainer: {
    textAlign: "center",
    flex: 0.75
  },
  text: {
    flex: 1
  }
});

const options: DynamicOptions<ContentComponentProps> = {
  ssr: false
};

const STEPS = [
  {
    title: "Donation Amount",
    component: dynamic<ContentComponentProps>(
      () => import("./DonationPageFormAmountStep"),
      options
    )
  },
  {
    title: "Contact",
    component: dynamic<ContentComponentProps>(
      () => import("./DonationPageFormContactStep"),
      options
    )
  },
  {
    title: "Payment",
    component: null
  }
];

const DonationPageFormBody: React.FC = () => {
  const { container, contentContainer, buttonContainer, text } = useStyles();
  const [curStepIndex, setCurStepIndex] = useState(1);
  const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(
    false
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // TODO: code added for temporary purposes, until the "Thank you for your donation" is implemented
      setCurStepIndex(Math.min(curStepIndex + 1, STEPS.length - 1));
    },
    [curStepIndex]
  );

  const handleContinueButtonDisabling = useCallback((disabled: boolean) => {
    // I am not that familiar with HTML's form validation API, so instead disable the button to handle custom logic:
    setIsContinueButtonDisabled(disabled);
  }, []);

  const Component = useMemo(() => STEPS[curStepIndex].component, [
    curStepIndex
  ]);

  return (
    <form className={container} onSubmit={handleSubmit}>
      <Typography className={text}>
        Mother Theresa once said, &quot;The needs are great, and none of us,
        including me, ever do great things. But we can all do small things, with
        great love, and together we can do something wonderful.&quot;
      </Typography>
      <DonationPageFormNavigation
        curStepIndex={curStepIndex}
        stepTitles={STEPS.map(_ => _.title)}
      />
      <div className={contentContainer}>
        {Component && (
          <Component
            setIsContinueButtonDisabled={handleContinueButtonDisabling}
          />
        )}
      </div>
      <div className={buttonContainer}>
        <ButtonWithNonProfitColor
          disabled={isContinueButtonDisabled}
          type="submit"
        >
          Continue
        </ButtonWithNonProfitColor>
      </div>
    </form>
  );
};

export default DonationPageFormBody;
