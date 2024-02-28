import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import thunk directly
import axios from "axios"; // Import axios for making HTTP requests

// Action types
const GET_USERS_REQUEST = "GET_USERS_REQUEST";
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const GET_USERS_FAIL = "GET_USERS_FAIL";
const GET_USERS_REQUESTID = "GET_USERS_REQUESTID";
const GET_USERS_SUCCESSID = "GET_USERS_SUCCESSID";
const GET_USERS_FAILID = "GET_USERS_FAILID";
const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const GET_ROLES_SUCCESS="GET_ROLES_SUCCESS";
const GET_COMPANY_SUCCESS="GET_COMPANY_SUCCESS";

const initialState = {
  loading: false,
  users: [],
  roles: [],
  company: [],
  error: null,
};

// Reducer function
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case GET_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_USERS_REQUESTID:
      return { ...state, loading: true, error: null };
    case  GET_USERS_SUCCESSID:
      return { ...state, loading: false, users: action.payload, error: null };
    case GET_USERS_FAILID:
      return { ...state, loading: false, error: action.payload };
    case CREATE_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload], error: null };
      
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
      };
       case GET_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
      };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: null
        };
      case UPDATE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [action.payload],
        error: null,
      };
    default:
      return state;
  }
};
