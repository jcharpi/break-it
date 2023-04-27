import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface FirstLoadSliceState {
	value: boolean
}

const initialState: FirstLoadSliceState = {
	value: true,
}

export const firstLoadSliderSlice = createSlice({
	name: "firstLoad",
	initialState,
	reducers: {
		setPreviouslyLoaded: (state) => {
			state.value = false
		},
	},
})

export const { setPreviouslyLoaded } = firstLoadSliderSlice.actions

export const selectFirstLoad = (state: RootState) => state.firstLoadSlice.value

export default firstLoadSliderSlice.reducer
