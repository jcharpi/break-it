import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface CurrentWeekState {
	value: string
}

const initialState: CurrentWeekState = {
	value: "",
}

export const currentWeekSlice = createSlice({
	name: "currentWeek",
	initialState,
	reducers: {
		resetCurrentWeek: (state) => {
			state.value = ""
		},
		setCurrentWeek: (state, action: PayloadAction<string>) => {
			state.value = action.payload
		},
	},
})

export const { resetCurrentWeek, setCurrentWeek } = currentWeekSlice.actions

export const selectCurrentWeek = (state: RootState) =>
	state.currentWeekSlice.value

export default currentWeekSlice.reducer
