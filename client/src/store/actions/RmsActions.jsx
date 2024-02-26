// import axios from "axios";

// import { USER_URL,BASE_URL,api } from "../../utils/Constant";
// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk"; // Correct import


// const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
// const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
// const GET_USERS_FAIL = 'GET_USERS_FAIL';

// export const createUsers = (formData) => async (dispatch) => {
//   try {
//     dispatch({ type: GET_USERS_REQUEST }); // Corrected action type
//     const response = await api.post("/users", formData, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     if (response.status === 201) {
//       dispatch({ type: GET_USERS_SUCCESS, payload: response.data }); // Corrected action type
//     }
//   } catch (error) {
//     dispatch({ type: GET_USERS_FAIL, payload: error });
//   }
// };

