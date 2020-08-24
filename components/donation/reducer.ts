import { createContext, Dispatch } from "react";

import { PayloadAction, createSlice, AnyAction } from "@reduxjs/toolkit";

export interface AmountStepProps {
  radioButtonAmount: number | null;
  otherAmount: number;
}

export interface ContactStepProps {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PaymentStepProps {
  nameOnCard: string;
  zipcode: string;
}

type State = {
  curStepIndex: number;
  isContinueButtonDisabled: boolean;
  contactStep: ContactStepProps;
  amountStep: AmountStepProps;
  paymentStep: PaymentStepProps;
};

export const AMOUNTS = [25, 50, 100, 250, 500];

export const MIN_OTHER_AMOUNT = "0.5";
export const MAX_OTHER_AMOUNT = "2000";

export const initialState: State = {
  curStepIndex: 0,
  isContinueButtonDisabled: false,
  contactStep: {
    firstName: "",
    lastName: "",
    email: ""
  },
  amountStep: {
    radioButtonAmount: AMOUNTS[0],
    otherAmount: +MIN_OTHER_AMOUNT
  },
  paymentStep: {
    nameOnCard: "",
    zipcode: ""
  }
};

const name = "donationPageSlice";
const { actions, reducer } = createSlice({
  name,
  initialState,
  reducers: {
    incrementStep(state) {
      state.curStepIndex++;
      // A safe assumption to make, may not always hold true. Also, maybe the form UI takes time to load, in that case it won't be prudent to enable the continue button:
      state.isContinueButtonDisabled = true;
    },
    setStep(state, { payload }: PayloadAction<number>) {
      state.curStepIndex = payload;
    },
    setIsContinueButtonDisabled(state, { payload }: PayloadAction<boolean>) {
      state.isContinueButtonDisabled = payload;
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
    setContactStepField(
      { contactStep },
      { payload }: PayloadAction<{ key: keyof ContactStepProps; value: string }>
    ) {
      contactStep[payload.key] = payload.value;
    },
    setNameOnCard({ paymentStep }, { payload }: PayloadAction<string>) {
      paymentStep.nameOnCard = payload;
    },
    setZipcode({ paymentStep }, { payload }: PayloadAction<string>) {
      // From https://github.com/medipass/react-credit-card-input/blob/master/src/utils/formatter.js#L135
      paymentStep.zipcode = (payload.match(/\d+/g) || []).join("");
    }
  }
});

export const DonationPageStateDispatch = createContext<Dispatch<
  AnyAction
> | null>(null);

export const {
  incrementStep,
  setStep,
  setIsContinueButtonDisabled,
  setRadioButtonAmount,
  setOtherAmount,
  setContactStepField,
  setNameOnCard,
  setZipcode
} = actions;

export default reducer;
