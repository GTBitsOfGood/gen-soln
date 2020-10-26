import React, {
  useCallback,
  useMemo,
  useState,
  useReducer,
  useEffect
} from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import dynamic from "next/dynamic";
import { Router } from "next/router";

import { logDonation } from "requests/donation";

import DonationPageFormButton from "./DonationPageFormButton";
import DonationPageFormNavigation from "./DonationPageFormNavigation";
import reducer, {
  AmountStepProps,
  BillingStepProps,
  PaymentStepProps,
  initialState,
  DonationPageStateDispatch,
  incrementStep,
  ReviewStepProps
} from "./reducer";
import useStripePayment from "./useStripePayment";

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
    title: "Billing" as const,
    component: dynamic<BillingStepProps>(
      () => import("./DonationPageFormBillingStep"),
      options
    )
  },
  {
    title: "Payment" as const,
    component: dynamic<PaymentStepProps>(
      () => import("./DonationPageFormPaymentStep"),
      options
    )
  },
  {
    title: "Review" as const,
    component: dynamic<ReviewStepProps>(
      () => import("./DonationPageFormReviewStep"),
      options
    )
  }
];

interface Props {
  donationCompletedCallback: () => void;
  selectedNonprofitId: string;
  stripeAccount: string;
}

const DonationPageForm: React.FC<Props> = ({
  donationCompletedCallback,
  selectedNonprofitId,
  stripeAccount
}) => {
  const { container, contentContainer } = useStyles();
  const [
    { curStepIndex, isCurStepCompleted, billingStep, amountStep, paymentStep },
    dispatch
  ] = useReducer(reducer, initialState);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  const { isReady, processPayment, createPaymentMethod } = useStripePayment();

  const step = STEPS[curStepIndex];

  const isLastStep = useMemo(() => curStepIndex === STEPS.length - 1, [
    curStepIndex
  ]);

  const isPaymentStep = useMemo(() => step.title === "Payment", [step]);

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

      const name = `${billingStep.firstName} ${billingStep.lastName}`;

      if (isLastStep) {
        setIsSubmitting(true);

        try {
          // Deliberately limit this try-catch only to Stripe's payment processing.
          // Catching errors from other miscellaneous code might make it seem like the payment failed, even when it succeeded.
          await processPayment(billingStep.email, amount, stripeAccount);
        } catch (err) {
          // TODO: Not sure how else to handle and display the error
          setIsSubmitting(false);
          err instanceof Error && alert(err.message);
          return;
        }
        donationCompletedCallback(); // Don't call setIsSubmitting(false) after this -- donationCompletedCallback() will unmount this component
        // TODO: What should we do if Stripe has processed the payment correctly, but our logDonation API call errored?
        void logDonation({
          name,
          email: billingStep.email,
          amount,
          nonprofitId: selectedNonprofitId
        });
      } else {
        if (
          isPaymentStep &&
          billingStep.addressLine &&
          billingStep.city &&
          billingStep.state &&
          billingStep.country
        ) {
          await createPaymentMethod(
            name,
            billingStep.email,
            billingStep.zipcode,
            billingStep.city,
            billingStep.addressLine,
            billingStep.state,
            billingStep.country.slice(0, -1)
          );
        }
        dispatch(incrementStep());
      }
    },
    [
      dispatch,
      amount,
      billingStep.email,
      billingStep.firstName,
      billingStep.lastName,
      billingStep.zipcode,
      billingStep.addressLine,
      billingStep.city,
      billingStep.state,
      billingStep.country,
      processPayment,
      createPaymentMethod,
      isPaymentStep,
      isLastStep,
      selectedNonprofitId,
      donationCompletedCallback,
      stripeAccount
    ]
  );

  const componentJSX = useMemo(() => {
    let Component;
    switch (step.title) {
      case "Donation Amount":
        Component = step.component;
        return <Component {...amountStep} />;

      case "Billing":
        Component = step.component;
        return <Component {...billingStep} />;

      case "Payment":
        Component = step.component;
        return <Component {...paymentStep} />;

      case "Review":
        Component = step.component;
        return <Component />;

      default: {
        const _exhaustiveCheck: never = step;
        return _exhaustiveCheck;
      }
    }
  }, [step, billingStep, amountStep, paymentStep]);

  const routeChangeStart = useCallback(() => {
    setIsRouteChanging(true);
  }, []);

  useEffect(() => {
    // No need to call setIsRouteChanging(true) on routeChangeComplete since this entire component in re-mounted when that happens
    Router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      Router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [routeChangeStart]);

  const isContinueButtonDisabled = useMemo(
    () => !isCurStepCompleted || !isReady || isSubmitting || isRouteChanging,
    [isCurStepCompleted, isReady, isSubmitting, isRouteChanging]
  );

  return (
    <DonationPageStateDispatch.Provider value={dispatch}>
      <form className={container} onSubmit={handleSubmit}>
        <DonationPageFormNavigation
          curStepIndex={curStepIndex}
          stepTitles={STEPS.map(_ => _.title)}
        />
        <div className={contentContainer}>{componentJSX}</div>
        <DonationPageFormButton
          disabled={isContinueButtonDisabled}
          ctaText={ctaText}
          showLoadingIndicator={isSubmitting}
        />
      </form>
    </DonationPageStateDispatch.Provider>
  );
};

export default DonationPageForm;
