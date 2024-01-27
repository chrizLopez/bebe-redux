// store.js

import { createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  registeredUsers: [],
};

const reducer = (state = initialState , action) => {
  switch (action.type) {
    case "REGISTER_USER":
      AsyncStorage.setItem("store", JSON.stringify([...state.registeredUsers, action.payload]))
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
