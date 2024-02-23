import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";

const middleware=[thunk];

const rootReducer = combineReducers([

//state
])

const store =createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;

