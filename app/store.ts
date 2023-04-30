import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import achievementSlice from "../reducers/achievementSlice"
import activeSliderSlice from "../reducers/activeSliderSlice"
import currentWeekSlice from "../reducers/currentWeekSlice"
import firstLoadSlice from "../reducers/firstLoadSlice"
import goalDecrementSlice from "../reducers/goalDecrementSlice"
import habitSlice from "../reducers/habitSlice"
import modalVisibleSlice from "../reducers/modalVisibleSlice"
import addButtonSlice from "../reducers/addButtonSlice"
import weekSlice from "../reducers/weekSlice"

import { combineReducers } from "@reduxjs/toolkit"

import AsyncStorage from "@react-native-async-storage/async-storage"
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist"

const rootReducer = combineReducers({
	achievementSlice: achievementSlice,
	activeSliderSlice: activeSliderSlice,
	currentWeekSlice: currentWeekSlice,
	firstLoadSlice: firstLoadSlice,
	goalDecrementSlice: goalDecrementSlice,
	habitSlice: habitSlice,
	modalVisibleSlice: modalVisibleSlice,
	addButtonSlice: addButtonSlice,
	weekSlice: weekSlice,
})

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	blacklist: ["modalVisibleSlice"],
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
