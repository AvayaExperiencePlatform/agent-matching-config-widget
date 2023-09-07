import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import stateReducer from "../features/state/stateSlice";
import adminReducer from "../features/admin/adminSlice";
import queuesReducer from "../features/queues/queuesSlice";
import attributesReducer from "../features/attributes/attributesSlice";
import groupsReducer from "../features/groups/groupsSlice";

export const componentSlice = createSlice({
  name: "component",
  initialState: {
    name: "state",
  },
  reducers: {
    setComponent: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = action.payload;
    },
  },
});

const allReducers = combineReducers({
  component: componentSlice.reducer,
  state: stateReducer,
  admin: adminReducer,
  queues: queuesReducer,
  attributes: attributesReducer,
  groups: groupsReducer
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  if (action.type === "RESET_COMPONENT") {
    state[action.payload.name] = undefined;
  }

  if (action.type == "SET_COMPONENT") {
    state.component = action.payload;
  }

  return allReducers(state, action);
};
export const store = configureStore({
  reducer: rootReducer,
});
