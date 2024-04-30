import {
    UPDATE_PROFILE,
    UPDATE_HOMEPAGE
  } from "./actions";
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: [...action.profile],
        };
  
      case UPDATE_HOMEPAGE:
        return {
          ...state,
          categories: [...action.categories],
        };
  
      default:
        return state;
    }
  };