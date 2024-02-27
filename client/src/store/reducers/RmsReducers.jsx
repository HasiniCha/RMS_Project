

// Initial state
const initialState = {
  loading: false,
  users: [],
  error: null
};

// Action types
const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAIL = 'GET_USERS_FAIL';
const GET_USERS_REQUESTID = 'GET_USERS_REQUESTID';
const GET_USERS_SUCCESSID = 'GET_USERS_SUCCESSID';
const GET_USERS_FAILID = 'GET_USERS_FAILID';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

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
    case GET_USERS_SUCCESSID:
      return { ...state, loading: false, users: action.payload, error: null };
    case GET_USERS_FAILID:
      return { ...state, loading: false, error: action.payload };
    case CREATE_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload], error: null };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => user.id === action.payload.id ? action.payload : user),
        error: null
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        error: null
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [action.payload], 
        error: null
      };
    default:
      return state;
  }
};

