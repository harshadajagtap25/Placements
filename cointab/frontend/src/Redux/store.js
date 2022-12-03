import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as AuthReducer } from "./AuthReducer/reducer";

const store = createStore(AuthReducer, applyMiddleware(thunk));

export { store };
