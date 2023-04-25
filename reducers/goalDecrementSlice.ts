import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface GoalDecrementState {
	value: number
}

const initialState: GoalDecrementState = {
	value: 1,
}

export const goalDecrementSlice = createSlice({
	name: "goalDecrement",
	initialState,
	reducers: {
		setGoalDecrement: (state, action: PayloadAction<number>) => {
			state.value = action.payload
		},
		resetGoalDecrement: (state) => {
			state.value = 1
		},
	},
})

export const { setGoalDecrement, resetGoalDecrement } =
	goalDecrementSlice.actions

export const selectGoalDecrement = (state: RootState) =>
	state.goalDecrement.value

export default goalDecrementSlice.reducer
