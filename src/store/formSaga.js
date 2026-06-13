import { takeLatest, put, select } from 'redux-saga/effects';
import { submitFormStart, submitFormSuccess, submitFormFailure } from './formSlice';

function* handleFormSubmit() {
  try {
    const state = yield select();
    const { email, privacyAccepted } = state.form;

    // Create form data for Netlify
    const formData = new URLSearchParams();
    formData.append('form-name', 'early-access');
    formData.append('email', email);
    formData.append('privacy', privacyAccepted ? 'on' : 'off');

    // Submit to Netlify
    const response = yield fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    yield put(submitFormSuccess());
  } catch (error) {
    yield put(submitFormFailure(error.message || 'Submission failed. Please try again.'));
  }
}

export default function* formSaga() {
  yield takeLatest(submitFormStart.type, handleFormSubmit);
}
