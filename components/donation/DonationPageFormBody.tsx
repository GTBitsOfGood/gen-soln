import React, { useCallback, useMemo, useContext } from "react";
import dynamic from "next/dynamic";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import ButtonWithNonprofitColor from "components/ButtonWithNonprofitColor";
import DonationPageFormNavigation from "./DonationPageFormNavigation";

import {
  AmountStepProps,
  ContactStepProps,
  DonationPageStateDispatch,
  State,
  incrementStep
} from "./reducer";
import AdminLoginLink from "components/AdminLoginLink";

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
    display: "flex",
    flex: 0.75,
    flexDirection: "column",
    alignItems: "center",
    minHeight: 72
  },
  textContainer: {
    flex: 1.5
  }
});

const options = {
  ssr: false
};

const STEPS = [
  {
    title: "Donation Amount" as const,
    component: dynamic<AmountStepProps>(
      () => import("./DonationPageFormAmountStep"),
      options
    )
  },
  {
    title: "Contact" as const,
    component: dynamic<ContactStepProps>(
      () => import("./DonationPageFormContactStep"),
      options
    )
  },
  {
    title: "Payment" as const,
    component: null
  }
];

interface Props {
  description: string;
  state: State;
}

const DonationPageFormBody: React.FC<Props> = ({
  description,
  state: {
    curStepIndex,
    maxCurStepIndex,
    isContinueButtonDisabled,
    contactStep,
    amountStep
  }
}) => {
  const {
    container,
    contentContainer,
    buttonContainer,
    textContainer
  } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // TODO: code added for temporary purposes, until the "Thank you for your donation" is implemented
      curStepIndex < STEPS.length - 1 && dispatch && dispatch(incrementStep());
    },
    [dispatch, curStepIndex]
  );

  const step = STEPS[curStepIndex];
  const componentJSX = useMemo(() => {
    let Component;
    switch (step.title) {
      case "Donation Amount":
        Component = step.component;
        return <Component {...amountStep} />;

      case "Contact":
        Component = step.component;
        return <Component {...contactStep} />;

      case "Payment":
        return null;

      default: {
        const _exhaustiveCheck: never = step;
        return _exhaustiveCheck;
      }
    }
  }, [step, contactStep, amountStep]);

  return (
    <form className={container} onSubmit={handleSubmit}>
      <div className={textContainer}>
        <Typography>{description}</Typography>
      </div>
      <DonationPageFormNavigation
        curStepIndex={curStepIndex}
        maxCurStepIndex={maxCurStepIndex}
        stepTitles={STEPS.map(_ => _.title)}
      />
      <div className={contentContainer}>{componentJSX}</div>
      <div className={buttonContainer}>
        <ButtonWithNonprofitColor
          disabled={isContinueButtonDisabled}
          type="submit"
        >
          Continue
        </ButtonWithNonprofitColor>
        <AdminLoginLink />
      </div>
    </form>
  );
};

export default DonationPageFormBody;
