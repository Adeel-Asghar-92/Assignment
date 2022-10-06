import { EDIT_BANK } from "../types/Type";

export const editBank = (bank) => {
  return function (dispatch) {
    dispatch({ type: EDIT_BANK, bank });
  };
};
