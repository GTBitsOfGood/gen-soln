import { createContext, Dispatch } from "react";

import { PayloadAction, createSlice, AnyAction } from "@reduxjs/toolkit";

export interface AmountStepProps {
  radioButtonAmount: number | null;
  otherAmount: number;
}

export interface BillingStepProps {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PaymentStepProps {}

export interface ReviewStepProps {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
  amount: number;
  email: string;
}

type State = {
  curStepIndex: number;
  isCurStepCompleted: boolean;
  billingStep: BillingStepProps;
  amountStep: AmountStepProps;
  paymentStep: PaymentStepProps;
};

export const AMOUNTS = [25, 50, 100, 250, 500];

export const MIN_OTHER_AMOUNT = "0.5";
export const MAX_OTHER_AMOUNT = "2000";

export const initialState: State = {
  curStepIndex: 0,
  // The first step, DonationPageFormAmountStep, is complete by default since the first radio button is selected
  isCurStepCompleted: true,
  billingStep: {
    firstName: "",
    lastName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: ""
  },
  amountStep: {
    radioButtonAmount: AMOUNTS[0],
    otherAmount: +MIN_OTHER_AMOUNT
  },
  paymentStep: {}
};

const name = "donationPageSlice";
const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    incrementStep(state) {
      state.curStepIndex++;
      // A safe assumption to make, may not always hold true. Also, maybe the form UI takes time to load, in that case it won't be prudent to enable the continue button:
      state.isCurStepCompleted = false;
    },
    setStep(state, { payload }: PayloadAction<number>) {
      state.curStepIndex = payload;
    },
    setIsCurStepCompleted(state, { payload }: PayloadAction<boolean>) {
      state.isCurStepCompleted = payload;
    },
    setRadioButtonAmount(
      { amountStep },
      { payload }: PayloadAction<number | null>
    ) {
      amountStep.radioButtonAmount = payload;
    },
    setOtherAmount({ amountStep }, { payload }: PayloadAction<number>) {
      amountStep.otherAmount = payload;
    },
    setBillingStepField(
      { billingStep },
      {
        payload
      }: PayloadAction<{
        key: keyof BillingStepProps;
        value: string;
      }>
    ) {
      billingStep[payload.key] = payload.value;
    },
    setZipcode({ billingStep }, { payload }: PayloadAction<string>) {
      // From https://github.com/medipass/react-credit-card-input/blob/master/src/utils/formatter.js#L135
      billingStep.zipcode = (payload.match(/\d+/g) || []).join("");
    }
  }
});

export const DonationPageStateDispatch = createContext<Dispatch<
  AnyAction
> | null>(null);

export const {
  incrementStep,
  setStep,
  setIsCurStepCompleted,
  setRadioButtonAmount,
  setOtherAmount,
  setBillingStepField,
  setZipcode
} = actions;

export default reducer;
