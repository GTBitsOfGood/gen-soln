import { useCallback, useMemo, useState } from "react";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import * as stripeJs from "@stripe/stripe-js";

import { createPaymentIntent } from "requests/donation";

const CENTS_IN_DOLLAR = 100;

interface StripePaymentMethod {
  paymentMethod?: stripeJs.PaymentMethod | undefined;
  error?: stripeJs.StripeError | undefined;
}

const useStripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const isReady = useMemo(() => stripe != null && elements != null, [
    stripe,
    elements
  ]);

  const [
    paymentMethodReq,
    setPaymentMethod
  ] = useState<StripePaymentMethod | null>(null);

  const createPaymentMethod = useCallback(
    async (name: string, email: string, zipcode: string) => {
      if (!elements || !stripe) {
        throw new Error("Not ready to process payments just yet!");
      }

      const billingDetails: stripeJs.PaymentMethodCreateParams.BillingDetails = {
        name,
        email,
        address: {
          postal_code: zipcode
        }
      };

      const card = elements.getElement("cardNumber");

      if (!card) {
        throw new Error("Couldn't get cardNumber Stripe element!");
      }

      const paymentReq = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: billingDetails
      });
      setPaymentMethod(paymentReq);
    },
    [elements, stripe]
  );

  const processPayment = useCallback(
    async (email: string, amount: number, stripeAccount: string) => {
      if (!stripe) {
        throw new Error("Not ready to process payments just yet!");
      }

      if (!paymentMethodReq) {
        throw new Error("Invalid payment method!");
      }

      // NOTE: amount needs to be converted to cents via CENTS_IN_DOLLAR
      const clientSecret = await createPaymentIntent(
        amount * CENTS_IN_DOLLAR,
        email,
        stripeAccount
      );

      if (paymentMethodReq.error) {
        throw new Error(paymentMethodReq.error.message);
      }

      if (!paymentMethodReq.paymentMethod) {
        throw new Error(
          "createPaymentMethod returned an invalid payment method!"
        );
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
        receipt_email: email
      });

      if (error) {
        throw error;
      }
    },
    [stripe, paymentMethodReq]
  );

  return { isReady, processPayment, createPaymentMethod };
};

export default useStripePayment;
