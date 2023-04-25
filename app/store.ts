import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import achievementSlice from "../reducers/achievementSlice"
import activeSliderSlice from "../reducers/activeSliderSlice"
import firstLoadSlice from "../reducers/firstLoadSlice"
import goalDecrementSlice from "../reducers/goalDecrementSlice"
import habitSlice from "../reducers/habitSlice"
import helpModalVisibleSlice from "../reducers/helpModalVisibleSlice"
import occurrenceSlice from "../reducers/occurrenceSlice"
import resetSlice from "../reducers/resetSlice"
import summaryModalVisibleSlice from "../reducers/summaryModalVisibleSlice"
import weekSlice from "../reducers/weekSlice"

import { combineReducers } from '@reduxjs/toolkit'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'

const rootReducer = combineReducers({
  achievements: achievementSlice,
  activeSlider: activeSliderSlice,
  firstLoad: firstLoadSlice,
  goalDecrement: goalDecrementSlice,
  habit: habitSlice,
  helpModalVisible: helpModalVisibleSlice,
  occurrences: occurrenceSlice,
  reset: resetSlice,
  summaryModalVisible: summaryModalVisibleSlice,
  weeks: weekSlice
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ["helpModalVisible", "summaryModalVisible"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>