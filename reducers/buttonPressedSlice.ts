import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface ButtonPressedState { 
	value: {
		addButtonPressed: boolean,
    helpPageButtonPressed: boolean,
    questionPageButtonPressed: boolean
	}
}

const initialState: ButtonPressedState = {
	value: {
		addButtonPressed: false,
    helpPageButtonPressed: false,
    questionPageButtonPressed: false
	},
}

export const buttonPressedSlice = createSlice({
	name: "buttonPressed",
	initialState,
	reducers: {
		setAddButtonPressedTrue: (state) => {
			state.value.addButtonPressed = true
		},
		setAddButtonPressedFalse: (state) => {
			state.value.addButtonPressed = false
		},
    setHelpPageButtonPressedTrue: (state) => {
			state.value.helpPageButtonPressed = true
		},
    setHelpPageButtonPressedFalse: (state) => {
			state.value.helpPageButtonPressed = false
		},
    setQuestionPageButtonPressedTrue: (state) => {
			state.value.questionPageButtonPressed = true
		},
    setQuestionPageButtonPressedFalse: (state) => {
			state.value.questionPageButtonPressed = false
		},
	},
})

export const { 
	setAddButtonPressedTrue,
	setAddButtonPressedFalse,
  setHelpPageButtonPressedTrue,
  setHelpPageButtonPressedFalse,
  setQuestionPageButtonPressedTrue,
  setQuestionPageButtonPressedFalse
} = buttonPressedSlice.actions

export const selectButtonPressed = (state: RootState) => state.buttonPressedSlice.value

export default buttonPressedSlice.reducer
