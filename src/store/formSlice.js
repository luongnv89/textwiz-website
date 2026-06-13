import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  privacyAccepted: false,
  submitting: false,
  submitted: false,
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPrivacyAccepted: (state, action) => {
      state.privacyAccepted = action.payload;
    },
    submitFormStart: (state) => {
      state.submitting = true;
      state.error = null;
    },
    submitFormSuccess: (state) => {
      state.submitting = false;
      state.submitted = true;
      state.email = '';
      state.privacyAccepted = false;
    },
    submitFormFailure: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setEmail,
  setPrivacyAccepted,
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
