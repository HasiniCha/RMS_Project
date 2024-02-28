import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from './reducers/RmsReducers';

const middleware = [thunk];

const rootReducer = combineReducers({
    userData: userReducer, 
});

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;


export const selectUserData = (state) => state.userData;
