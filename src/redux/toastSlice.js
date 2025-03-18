import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    pushMessage(state, action) {
      const { text, status } = action.payload;
      const id = Date.now();
      state.messages.push({ id, text, status });
    },
    removeMessage(state, action) {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
    },
  }
});

export const { pushMessage, removeMessage } = toastSlice.actions;
export default toastSlice.reducer;
