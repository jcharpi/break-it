import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import occurrenceReducer from "../actions/occurrenceSlice"
import activeSliderSlice from "../actions/activeSliderSlice";

export const store = configureStore({
  reducer: {
    activeSlider: activeSliderSlice,
    occurrences: occurrenceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
