import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import achievementSlice from "../reducers/achievementSlice"
import activeSliderSlice from "../reducers/activeSliderSlice"
import firstLoadSlice from "../reducers/firstLoadSlice"
import goalDecrementSlice from "../reducers/goalDecrementSlice"
import occurrenceReducer from "../reducers/occurrenceSlice"

export const store = configureStore({
  reducer: {
    achievements: achievementSlice,
    activeSlider: activeSliderSlice,
    firstLoad: firstLoadSlice,
    goalDecrement: goalDecrementSlice,
    occurrences: occurrenceReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
