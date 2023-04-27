import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface Achievement {
	gem: "silver" | "gold" | "diamond"
	habitName: string
}

export interface AchievementState {
	value: Achievement[]
}

const initialState: AchievementState = {
	value: [],
}

export const achievementSlice = createSlice({
	name: "achievements",
	initialState,
	reducers: {
		addAchievement: (state, action: PayloadAction<Achievement>) => {
			state.value = [...state.value, action.payload]
		},
	},
})

export const { addAchievement } = achievementSlice.actions

export const selectAchievements = (state: RootState) => state.achievementSlice.value

export default achievementSlice.reducer
