import React, { useCallback, useMemo, useContext, useState } from "react";
import dynamic from "next/dynamic";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStripePayment from "./useStripePayment";

import ButtonWithNonprofitColor from "components/ButtonWithNonprofitColor";
import DonationPageFormNavigation from "./DonationPageFormNavigation";

const DonationPageThankYou = dynamic(() => import("./DonationPageThankYou"));

import { createDonation } from "requests/donation";

import {
  AmountStepProps,
  ContactStepProps,
  PaymentStepProps,
  DonationPageStateDispatch,
  State,
  incrementStep,
  setDonationCompleted
} from "./reducer";
import AdminLoginLink from "components/AdminLoginLink";

const white = "white";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "3.5vh 3vh", // Keep in sync with footerContainer style in DonationPageThankYou
    backgroundColor: white
  },
  contentContainer: {
    flex: 7,
    marginTop: 8,
    marginBottom: 8,
    minHeight: 260
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
  },
  rightMargin: {
    marginRight: 8
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
    component: dynamic<PaymentStepProps>(
      () => import("./DonationPageFormPaymentStep"),
      options
    )
  }
];

interface Props {
  description: string;
  state: State;
  selectedNonprofitId: string;
}

const DonationPageFormBody: React.FC<Props> = ({
  description,
  selectedNonprofitId,
  state: {
    curStepIndex,
    maxCurStepIndex,
    isContinueButtonDisabled,
    contactStep,
    amountStep,
    paymentStep,
    donationCompleted
  }
}) => {
  const {
    container,
    contentContainer,
    buttonContainer,
    textContainer,
    rightMargin
  } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isReady, processPayment } = useStripePayment();

  const isLastStep = useMemo(() => curStepIndex === STEPS.length - 1, [
    curStepIndex
  ]);

  const amount = useMemo(
    () => amountStep.radioButtonAmount ?? amountStep.otherAmount,
    [amountStep.otherAmount, amountStep.radioButtonAmount]
  );
  const ctaText = useMemo(
    () => (isLastStep ? `Donate $${amount.toFixed(2)}` : "Continue"),
    [isLastStep, amount]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!e.currentTarget.reportValidity()) return;

      if (isLastStep) {
        try {
          setIsSubmitting(true);
          // TODO: Check if we should use paymentStep.name instead
          const name = `${contactStep.firstName} ${contactStep.lastName}`;
          const email = contactStep.email;
          await processPayment(
            name,
            contactStep.email,
            paymentStep.zipcode,
            amount
          );
          // TODO: What should we do if Stripe has processed the payment correctly, but our createDonation API call errored?
          await createDonation({
            name,
            email,
            amount,
            nonprofitId: selectedNonprofitId
          });

          dispatch && dispatch(setDonationCompleted(true));
        } catch (err) {
          // TODO: Not sure how else to handle and display the error
          alert(err.message);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        dispatch && dispatch(incrementStep());
      }
    },
    [
      dispatch,
      amount,
      contactStep.email,
      contactStep.firstName,
      contactStep.lastName,
      paymentStep.zipcode,
      processPayment,
      isLastStep,
      selectedNonprofitId
    ]
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
        Component = step.component;
        return <Component {...paymentStep} />;

      default: {
        const _exhaustiveCheck: never = step;
        return _exhaustiveCheck;
      }
    }
  }, [step, contactStep, amountStep, paymentStep]);

  const nonprofitDescriptionJSX = (
    <div className={textContainer}>
      <Typography>{description}</Typography>
    </div>
  );

  return donationCompleted ? (
    <div className={container}>
      {nonprofitDescriptionJSX}
      <DonationPageThankYou />
    </div>
  ) : (
    <form className={container} onSubmit={handleSubmit}>
      {nonprofitDescriptionJSX}
      <DonationPageFormNavigation
        curStepIndex={curStepIndex}
        maxCurStepIndex={maxCurStepIndex}
        stepTitles={STEPS.map(_ => _.title)}
      />
      <div className={contentContainer}>{componentJSX}</div>
      <div className={buttonContainer}>
        <ButtonWithNonprofitColor
          disabled={isContinueButtonDisabled || !isReady || isSubmitting}
          type="submit"
        >
          {isSubmitting && (
            <CircularProgress
              className={rightMargin}
              color="inherit"
              size={16}
            />
          )}
          {ctaText}
        </ButtonWithNonprofitColor>
        <AdminLoginLink />
      </div>
    </form>
  );
};

export default DonationPageFormBody;
