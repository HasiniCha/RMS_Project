// import { combineReducers } from 'redux';

// const initialState = {

// };

// export const getUserInfo = (state = {
//     loading:initialState.loading,
//     getUsersInfo:initialState.getUsersInfo,
//     getUsersError:initialState.getUsersError
// }, action) => {
//     switch (action.type) {
//       case 'GET_USERS_REQUSET':
//         return { ...state, loading: !initialState.loading, getUsersError:initialState.getUsersError};
//       case 'GET_USERS_SUCESS':
//         return { ...state, loading: !initialState.loading, getUsersError:action.payload};
//       case 'GET_USERS_FAIL':
//         return { ...state, loading: !initialState.loading, getUsersError:action.payload};
//       case 'RESET_GET_USERS':
//         return { ...state,userInfo:initialState.userInfo, getUsersError:initialState.getUsersError};
//       default:
//         return state;
//     }
//   };

//   export const manageTodoReducer = (state = {
//     loading:initialState.loading,
//     getUsersInfo:initialState.getUsersInfo,
//     getUsersError:initialState.getUsersError
// }, action) => {
//     switch (action.type) {
//       case 'GET_USERS_REQUSET':
//         return { ...state, loading: !initialState.loading, getUsersError:initialState.getUsersError};
//       case 'GET_USERS_SUCESS':
//         return { ...state, loading: !initialState.loading, getUsersError:action.payload};
//       case 'GET_USERS_FAIL':
//         return { ...state, loading: !initialState.loading, getUsersError:action.payload};
//       case 'RESET_GET_USERS':
//         return { ...state,userInfo:initialState.userInfo, getUsersError:initialState.getUsersError};
//       default:
//         return state;
//     }
//   };