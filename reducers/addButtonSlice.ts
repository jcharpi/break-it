import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface AddButtonState { 
	value: {
		occurrences: number,
		reset: boolean,
		addButtonPressed: boolean
	}
}

const initialState: AddButtonState = {
	value: {
		occurrences: 0,
		reset: false,
		addButtonPressed: false
	},
}

export const addButtonSlice = createSlice({
	name: "addButton",
	initialState,
	reducers: {
		addOccurrence: (state) => {
			state.value.occurrences += 1
		},
		resetOccurrences: (state) => {
			state.value.occurrences = 0
		},
		setOccurrences: (state, action: PayloadAction<number>) => {
			state.value.occurrences = action.payload
		},
		setResetFalse: (state) => {
			state.value.reset = false
		},
		setResetTrue: (state) => {
			state.value.reset = true
		},
		setAddButtonPressedTrue: (state) => {
			state.value.addButtonPressed = true
		},
		setAddButtonPressedFalse: (state) => {
			state.value.addButtonPressed = false
		}
	},
})

export const { 
	addOccurrence, 
	resetOccurrences, 
	setOccurrences, 
	setResetFalse, 
	setResetTrue,
	setAddButtonPressedTrue,
	setAddButtonPressedFalse
} = addButtonSlice.actions

export const selectAddButton = (state: RootState) => state.addButtonSlice.value

export default addButtonSlice.reducer
