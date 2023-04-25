import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface ResetState {
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

export const selectReset = (state: RootState) => state.reset.value

export default resetSlice.reducer
