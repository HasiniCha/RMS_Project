import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Import thunk directly

import { userReducer } from './reducers/RmsReducers';

const middleware = [thunk];

const rootReducer = combineReducers({
    getUsers: userReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;
