import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, saveUser } from "./adminAPI";

const initialState = {
  success: false,
  user: null,
  userLoading: false,
  immutableUser: null,
  isSupervisor: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const getUserThunk = createAsyncThunk(
  "admin/getUser",
  async ({ userId }) => {
    return await getUser({ userId });
    // The value we return becomes the `fulfilled` action payload
  }
);

export const updateUserThunk = createAsyncThunk(
  "admin/saveUser",
  async ({ userId, updatedUser }) => {
    return await saveUser({ userId, updatedUser });
    // The value we return becomes the `fulfilled` action payload
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetUser: (state, action) => {
      state.user = {
        ...state.user,
        ...state.immutableUser,
      };
    },
    setUserQueues: (state, action) => {
      state.user = {
        ...state.user,
        features: {
          ...state.user.features,
          matching: { ...state.user.features.matching, queues: action.payload },
        },
      };
    },
    setUserAttributes: (state, action) => {
      state.user = {
        ...state.user,
        features: {
          ...state.user.features,
          matching: {
            ...state.user.features.matching,
            attributes: action.payload,
          },
        },
      };
    },
  },
  // // The `reducers` field lets us define reducers and generate associated actions
  // reducers: {
  //   increment: (state) => {
  //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
  //     // doesn't actually mutate the state because it uses the Immer library,
  //     // which detects changes to a "draft state" and produces a brand new
  //     // immutable state based off those changes
  //     state.value += 1;
  //   },
  //   decrement: (state) => {
  //     state.value -= 1;
  //   },
  //   // Use the PayloadAction type to declare the contents of `action.payload`
  //   incrementByAmount: (state, action) => {
  //     state.value += action.payload;
  //   },
  // },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: {
    [getUserThunk.fulfilled]: (state, action) => {
      return {
        ...state,
        success: true,
        user: action.payload,
        userLoading: false,
        immutableUser: action.payload,
        isSupervisor: action.payload.role == "SUPERVISOR",
      };
    },
    [getUserThunk.rejected]: (state, action) => {
      return {
        ...state,
        success: false,
        user: null,
        immutableUser: null,
        userLoading: false,
      };
    },
    [getUserThunk.pending]: (state, action) => {
      return {
        ...state,
        userLoading: true,
      };
    },
    [updateUserThunk.fulfilled]: (state, action) => {
      return {
        ...state,
        success: true,
        user: action.payload,
        userLoading: false,
        immutableUser: action.payload,
        isSupervisor: action.payload.role == "SUPERVISOR",
      };
    },
    [updateUserThunk.rejected]: (state, action) => {
      return {
        ...state,
        success: false,
        user: null,
        userLoading: false,
        immutableUser: null,
      };
    },
    [updateUserThunk.pending]: (state, action) => {
      return {
        ...state,
        userLoading: true,
      };
    },
  },
});
export const { setUserQueues, setUserAttributes, resetUser } =
  adminSlice.actions;

export default adminSlice.reducer;
