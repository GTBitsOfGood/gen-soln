import React, { useCallback, useMemo, useState, useReducer } from "react";
import dynamic from "next/dynamic";

import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStripePayment from "./useStripePayment";

import ButtonWithNonprofitColor from "components/ButtonWithNonprofitColor";
import DonationPageFormNavigation from "./DonationPageFormNavigation";

import { createDonation } from "requests/donation";

import reducer, {
  AmountStepProps,
  ContactStepProps,
  PaymentStepProps,
  initialState,
  DonationPageStateDispatch,
  incrementStep
} from "./reducer";
import AdminLoginLink from "components/AdminLoginLink";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 0.8,
    flexDirection: "column"
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
  donationCompletedCallback: () => void;
  selectedNonprofitId: string;
}

const DonationPageFormBodyStateProvider: React.FC<Props> = ({
  donationCompletedCallback,
  selectedNonprofitId
}) => {
  const {
    container,
    contentContainer,
    buttonContainer,
    rightMargin
  } = useStyles();
  const [
    {
      curStepIndex,
      isContinueButtonDisabled,
      contactStep,
      amountStep,
      paymentStep
    },
    dispatch
  ] = useReducer(reducer, initialState);

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

          donationCompletedCallback();
          // Don't call setIsSubmitting(false) after this -- donationCompletedCallback() will unmount this component
        } catch (err) {
          // TODO: Not sure how else to handle and display the error
          setIsSubmitting(false);
          alert(err.message);
        }
      } else {
        dispatch(incrementStep());
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
      selectedNonprofitId,
      donationCompletedCallback
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

  return (
    <DonationPageStateDispatch.Provider value={dispatch}>
      <form className={container} onSubmit={handleSubmit}>
        <DonationPageFormNavigation
          curStepIndex={curStepIndex}
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
    </DonationPageStateDispatch.Provider>
  );
};

export default DonationPageFormBodyStateProvider;
