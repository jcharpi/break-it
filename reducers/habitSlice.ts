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
	value: {
		habit: Habit
		completed: boolean
	}
}

const initialState: HabitState = {
	value: {
		habit: {
			gem: Gem.SILVER,
			goal: 0,
			habitName: "",
		},
		completed: false,
	},
}

export const habitSlice = createSlice({
	name: "habit",
	initialState,
	reducers: {
		completedHabit: (state) => {
			state.value.completed = true
		},
		setHabit: (state, action: PayloadAction<Habit>) => {
			state.value.habit = action.payload
		},
		resetHabit: (state) => {
			state.value.habit = {
				gem: Gem.SILVER,
				goal: 0,
				habitName: "",
			}
			state.value.completed = false
		},
		resetHabitName: (state) => {
			state.value.habit = {
				...state.value.habit,
				habitName: "",
			}
		},
	},
})

export const { completedHabit, setHabit, resetHabit, resetHabitName } =
	habitSlice.actions

export const selectHabit = (state: RootState) => state.habitSlice.value

export default habitSlice.reducer
