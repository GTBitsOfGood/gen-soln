import { createContext, Dispatch } from "react";

import { PayloadAction, createSlice, AnyAction } from "@reduxjs/toolkit";

import { PlaceType } from "components/LocationAutocompleteInput";

export interface AmountStepProps {
  radioButtonAmount: number | null;
  otherAmount: number;
}

export interface ContactStepProps {
  firstName: string;
  lastName: string;
  email: string;
  address: PlaceType | null;
}

export interface PaymentStepProps {
  nameOnCard: string;
  zipcode: string;
}

type State = {
  curStepIndex: number;
  isCurStepCompleted: boolean;
  contactStep: ContactStepProps;
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
  contactStep: {
    firstName: "",
    lastName: "",
    email: "",
    address: null
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
    setContactStepField(
      { contactStep },
      {
        payload
      }: PayloadAction<{
        key: keyof Omit<ContactStepProps, "address">;
        value: string;
      }>
    ) {
      contactStep[payload.key] = payload.value;
    },
    setAddress({ contactStep }, { payload }: PayloadAction<PlaceType | null>) {
      contactStep.address = payload;
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
  setIsCurStepCompleted,
  setRadioButtonAmount,
  setOtherAmount,
  setContactStepField,
  setAddress,
  setNameOnCard,
  setZipcode
} = actions;

export default reducer;
