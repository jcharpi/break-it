import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface ResetState {
	value: boolean
}

const initialState: ResetState = {
	value: false,
}

export const resetSlice = createSlice({
	name: "reset",
	initialState,
	reducers: {
		setResetFalse: (state) => {
			state.value = false
		},
		setResetTrue: (state) => {
			state.value = true
		},
	},
})

export const { setResetFalse, setResetTrue } = resetSlice.actions

export const selectReset = (state: RootState) => state.resetSlice.value

export default resetSlice.reducer
