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
		goalExceededCheck: boolean
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
		goalExceededCheck: false,
	},
}

export const habitSlice = createSlice({
	name: "habit",
	initialState,
	reducers: {
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
		completedHabit: (state) => {
			state.value.completed = true
		},
		setGoalExceededCheckTrue: (state) => {
			state.value.goalExceededCheck = true
		},
		setGoalExceededCheckFalse: (state) => {
			state.value.goalExceededCheck = false
		},
	},
})

export const {
	setHabit,
	resetHabit,
	resetHabitName,
	completedHabit,
	setGoalExceededCheckTrue,
	setGoalExceededCheckFalse,
} = habitSlice.actions

export const selectHabit = (state: RootState) => state.habitSlice.value

export default habitSlice.reducer
