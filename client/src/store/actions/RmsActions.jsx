
import axios from "axios";
import { toastFunction } from "../../components/ToastFunction";
import { USER_URL, BASE_URL,ROLE_URL,COMPANY_URL } from "../../utils/Constants";
import { useDispatch, useSelector } from 'react-redux';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';
export const GET_USERS_REQUESTID = 'GET_USERS_REQUESTID';
export const GET_USERS_SUCCESSID = 'GET_USERS_SUCCESSID';
export const GET_USERS_FAILID = 'GET_USERS_FAILID';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const GET_ROLES_REQUEST = 'GET_ROLES_REQUEST';
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_FAIL = 'GET_ROLES_FAIL';
export const GET_COMPANY_REQUEST = 'GET_COMPANY_REQUEST';
export const GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS';
export const GET_COMPANY_FAIL = 'GET_COMPANY_FAIL';



export const fetchUserData= (id) => async (dispatch) => {
  try {
    
    const response = await axios.get(`${BASE_URL}${USER_URL}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

      dispatch({
        type: GET_USERS_SUCCESSID,
        payload: response.data,
      });
    
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILID,
      payload: error.message || "An error occurred",
    });
  }
};


export const fetchData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${USER_URL}`);
   
    dispatch({ type: GET_USERS_SUCCESS , payload: response.data });
    console.log("Data fetched successfully");
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL , payload: error });
    console.error("Error fetching data:", error);

  }
};



export const fetchCompanyData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COMPANY_REQUEST }); 
    const response = await axios.get(`${BASE_URL}${COMPANY_URL}`);

    dispatch({ type: GET_COMPANY_SUCCESS, payload: response.data }); 
    
  } catch (error) {
    dispatch({ type: GET_COMPANY_FAIL, payload: error.message || "An error occurred" }); 
  }
};
export const fetchRoleData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ROLES_REQUEST }); // Dispatch request action
    const response = await axios.get(`${BASE_URL}${ROLE_URL}`);

    dispatch({ type:GET_ROLES_SUCCESS, payload: response.data }); // Dispatch success action with fetched data
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

export const updateUserData = (id, updatedUserData) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}${USER_URL}/${id}`, updatedUserData);
   
    dispatch({ type: UPDATE_USER_SUCCESS , payload: response.data });
    console.log("User data updated successfully");
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL , payload: error });
    console.error("Error updating user data:", error);
  }
};

export const deleteUser = (id) => async (dispatch) => { 
  try {
    await axios.delete(`${BASE_URL}${USER_URL}/${id}`);
    dispatch(fetchData());
  
  } catch (error) {
    console.error("Error deleting user:", error);
   
  }
};

