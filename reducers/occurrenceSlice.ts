import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface OccurrenceState {
	value: number
}

const initialState: OccurrenceState = {
	value: 0,
}

export const occurrenceSlice = createSlice({
	name: "occurrences",
	initialState,
	reducers: {
		addOccurrence: (state) => {
			state.value += 1
		},
		resetOccurrences: (state) => {
			state.value = 0
		},
		setOccurrences: (state, action: PayloadAction<number>) => {
			state.value = action.payload
		},
	},
})

export const { addOccurrence, resetOccurrences, setOccurrences } =
	occurrenceSlice.actions

export const selectOccurrences = (state: RootState) => state.occurrences.value

export default occurrenceSlice.reducer
