// store.js

import { createStore } from "redux";

const initialState = {
  registeredUsers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, action.payload],
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
