import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import achievementSlice from "../reducers/achievementSlice"
import activeSliderSlice from "../reducers/activeSliderSlice"
import firstLoadSlice from "../reducers/firstLoadSlice"
import occurrenceReducer from "../reducers/occurrenceSlice"

export const store = configureStore({
  reducer: {
    achievements: achievementSlice,
    activeSlider: activeSliderSlice,
    firstLoad: firstLoadSlice,
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
