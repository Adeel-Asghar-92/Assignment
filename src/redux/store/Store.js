import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../RootReducer";

export const StoreConfig = createStore(rootReducer, applyMiddleware(thunk));
