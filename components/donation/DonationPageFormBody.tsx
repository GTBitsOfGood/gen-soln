import React, { useState, useCallback, useMemo } from "react";
import dynamic, { DynamicOptions } from "next/dynamic";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import ButtonWithCTA from "components/ButtonWithCTA";
import DonationPageFormNavigation from "./DonationPageFormNavigation";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white"
  },
  button: {
    width: "50%",
    alignSelf: "center"
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
  },
  verticalMargin: {
    marginTop: 8,
    marginBottom: 8
  }
});

const options: DynamicOptions = {
  ssr: false
};

const STEPS = [
  {
    title: "Donation Amount",
    component: dynamic(() => import("./DonationPageFormAmountStep"), options)
  },
  {
    title: "Contact",
    component: null
  },
  {
    title: "Payment",
    component: null
  }
];

const DonationPageFormBody: React.FC = () => {
  const {
    container,
    button,
    contentContainer,
    buttonContainer,
    text,
    verticalMargin
  } = useStyles();
  const [curStepIndex, setCurStepIndex] = useState(0);

  const onClick = useCallback(() => {
    // TODO: code added for temporary purposes, until the "Thank you for your donation" is implemented
    setCurStepIndex(Math.min(curStepIndex + 1, STEPS.length - 1));
  }, [curStepIndex]);

  const Component = useMemo(() => STEPS[curStepIndex].component, [
    curStepIndex
  ]);

  return (
    <div className={container}>
      <Typography className={`${text} ${verticalMargin}`}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </Typography>
      <DonationPageFormNavigation
        curStepIndex={curStepIndex}
        stepTitles={STEPS.map(_ => _.title)}
      />
      <div className={`${contentContainer} ${verticalMargin}`}>
        {Component && <Component />}
      </div>
      <div className={`${buttonContainer} ${verticalMargin}`}>
        <ButtonWithCTA className={button} onClick={onClick}>
          Continue
        </ButtonWithCTA>
      </div>
    </div>
  );
};

export default DonationPageFormBody;
