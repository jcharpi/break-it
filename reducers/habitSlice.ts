import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export enum Gem {
	SILVER = "silver",
	GOLD = "gold",
	DIAMOND = "diamond",
}

export interface Habit {
	gem: Gem
	goal: number
	habitName: string
}

export interface HabitState {
	value: Habit
}

const initialState: HabitState = {
	value: {
		gem: Gem.SILVER,
		goal: 0,
		habitName: "",
	},
}

export const habitSlice = createSlice({
	name: "habit",
	initialState,
	reducers: {
		setHabit: (state, action: PayloadAction<Habit>) => {
			state.value = action.payload
		},
		resetHabit: (state) => {
			state.value = {
				gem: Gem.SILVER,
				goal: 0,
				habitName: "",
			}
		},
    resetHabitName: (state) => {
			state.value = {
				...state.value,
				habitName: "",
			}
		},
	},
})

export const { setHabit, resetHabit, resetHabitName } = habitSlice.actions

export const selectHabit = (state: RootState) => state.habitSlice.value

export default habitSlice.reducer
