import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import todoReducer from '../redux/todoSlice';
import storeResetReducer from '../redux/storeResetSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  storeReset: storeResetReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'storeReset/reset') {
    state = undefined; // Clear the state
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
