import { EDIT_BANK } from "../types/Type";

const initialState = {
  bank: {},
};
export const BankReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_BANK:
      return {
        ...state,
        bank: action.bank,
      };

    default:
      return state;
  }
};
