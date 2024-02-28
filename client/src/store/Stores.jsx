import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Import thunk correctly
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

// Assuming these selectors are used to extract data from your Redux state
export const selectUserData = (state) => state.userData;
