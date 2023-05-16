import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export type Weeks = {
	[key: string]: string
}

export interface WeekState {
	value: {
    weeks: Weeks,
    currentWeek: string
  }
}

const initialState: WeekState = {
	value: {
    weeks: {},
    currentWeek: ""
  },
}

export const weekSlice = createSlice({
	name: "weekSlice",
	initialState,
	reducers: {
		setWeeks: (state, action: PayloadAction<Weeks>) => {
			state.value.weeks = action.payload
		},
		resetWeeks: (state) => {
			state.value.weeks = {}
		},
    resetCurrentWeek: (state) => {
			state.value.currentWeek = ""
		},
		setCurrentWeek: (state, action: PayloadAction<string>) => {
			state.value.currentWeek = action.payload
		},
	},
})

export const { resetWeeks, setWeeks, resetCurrentWeek, setCurrentWeek } = weekSlice.actions

export const selectWeeks = (state: RootState) => state.weekSlice.value

export default weekSlice.reducer
