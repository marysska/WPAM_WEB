import {
    GET_CANCEL, GET_GROUPS
  } from '../types';
  
  const initialState = {
    classesCancelled : null
  };
  

  
export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CANCEL:
        return {
          ...state,
          classesCancelled: action.payload.canceled
        };
      case GET_GROUPS:
        return {
          ...state,
          groupList: action.payload.groups
        };
      default:
        return state;
    }
  }