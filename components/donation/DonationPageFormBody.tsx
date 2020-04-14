import React, {
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useState
} from "react";
import dynamic from "next/dynamic";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStripePayment from "./useStripePayment";

import ButtonWithNonprofitColor from "components/ButtonWithNonprofitColor";
import DonationPageFormNavigation from "./DonationPageFormNavigation";

import {
  AmountStepProps,
  ContactStepProps,
  PaymentStepProps,
  DonationPageStateDispatch,
  State,
  incrementStep,
  setIsContinueButtonDisabled
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
    flex: 5,
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
}

const DonationPageFormBody: React.FC<Props> = ({
  description,
  state: {
    curStepIndex,
    maxCurStepIndex,
    isContinueButtonDisabled,
    contactStep,
    amountStep,
    paymentStep
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!e.currentTarget.reportValidity()) return;

      if (curStepIndex === STEPS.length - 1) {
        try {
          setIsSubmitting(true);
          // TODO: Check if we should use paymentStep.name instead
          const name = `${contactStep.firstName} ${contactStep.lastName}`;
          const amount = amountStep.radioButtonAmount ?? amountStep.otherAmount;
          await processPayment(
            name,
            contactStep.email,
            paymentStep.zipcode,
            amount
          );
        } catch (err) {
          // setCheckoutError(err);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        dispatch && dispatch(incrementStep());
      }
    },
    [
      dispatch,
      curStepIndex,
      amountStep.otherAmount,
      amountStep.radioButtonAmount,
      contactStep.email,
      contactStep.firstName,
      contactStep.lastName,
      paymentStep.zipcode,
      processPayment
    ]
  );

  useEffect(() => {
    dispatch && dispatch(setIsContinueButtonDisabled(!isReady || isSubmitting));
  }, [dispatch, isReady, isSubmitting]);

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
          {isSubmitting && (
            <CircularProgress
              className={rightMargin}
              color="inherit"
              size={16}
            />
          )}
          Continue
        </ButtonWithNonprofitColor>
        <AdminLoginLink />
      </div>
    </form>
  );
};

export default DonationPageFormBody;
