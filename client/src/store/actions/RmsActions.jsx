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

import axios from "axios";
import { toastFunction } from "../../components/ToastFunction";
import { USER_URL, BASE_URL,ROLE_URL,COMPANY_URL } from "../../utils/Constants";
import { useDispatch, useSelector } from 'react-redux';

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAIL = 'GET_USERS_FAIL';
const GET_USERS_REQUESTID = 'GET_USERS_REQUESTID';
const GET_USERS_SUCCESSID = 'GET_USERS_SUCCESSID';
const GET_USERS_FAILID = 'GET_USERS_FAILID';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

const FETCH_COMPANY_SUCCESS='FETCH_COMPANY_SUCCESS';
const FETCH_ROLE_SUCCESS='FETCH_ROLE_SUCCESS';
const FETCH_USER_FAIL='FETCH_USER_FAIL';
const FETCH_COMPANY_FAIL='FETCH_COMPANY_FAIL';
const FETCH_ROLE_FAIL='FETCH_ROLE_FAIL';

export const fetchUserData= (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUESTID });
    const response = await axios.get(`${BASE_URL}${USER_URL}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: GET_USERS_SUCCESSID,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILID,
      payload: error.message || "An error occurred",
    });
  }
};
export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST }); // Dispatch request action
    const response = await axios.get(`${BASE_URL}${USER_URL}`);

    dispatch({ type: GET_USERS_SUCCESS, payload: response.data }); // Dispatch success action with fetched data
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error.message || "An error occurred" }); // Dispatch failure action with error message
  }
};



export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}${USER_URL}`, userData);
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
    toastFunction("User created successfully", false);
  } catch (error) {
    console.error("Error creating user:", error);
    toastFunction("Error creating user", true);
  }
};

export const updateUser = (id, updatedUserData) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}${USER_URL}/${id}`, updatedUserData);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
    toastFunction("User updated successfully", false);
  } catch (error) {
    console.error("Error updating user:", error);
    toastFunction("Error updating user", true);
  }
};

export const deleteUser = (id) => async (dispatch) => { // Changed from deleteUsers to deleteUser
  try {
    await axios.delete(`${BASE_URL}${USER_URL}/${id}`);
    dispatch(fetchUserData(id));
    toastFunction("Deleted Successfully", false);
  } catch (error) {
    console.error("Error deleting user:", error);
    toastFunction("Error deleting user", true);
  }
};

// export const fetchUserData = (id) => async (dispatch) => {
//   try {
//     // Fetch user data
//     const userResponse = await axios.get(`${BASE_URL}${USER_URL}/${id}`);
//     dispatch({ type: FETCH_USER_SUCCESS, payload: userResponse.data });

//     // Fetch company data
//     const companyResponse = await axios.get(`${BASE_URL}${COMPANY_URL}`);
//     dispatch({ type: FETCH_COMPANY_SUCCESS, payload: companyResponse.data });

//     // Fetch role data
//     const roleResponse = await axios.get(`${BASE_URL}${ROLE_URL}`);
//     dispatch({ type: FETCH_ROLE_SUCCESS, payload: roleResponse.data });
//   } catch (error) {
//     dispatch({ type: FETCH_USER_FAIL, payload: error });
//     dispatch({ type: FETCH_COMPANY_FAIL, payload: error });
//     dispatch({ type: FETCH_ROLE_FAIL, payload: error });
//     console.error("Error fetching data:", error);
//   }
// };