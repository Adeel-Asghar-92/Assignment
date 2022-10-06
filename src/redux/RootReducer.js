import { combineReducers } from "redux";
import { BankReducer } from "./reducer/BankReducer.js";
const rootReducer = combineReducers({
  Banks:BankReducer,
});

export default rootReducer;
