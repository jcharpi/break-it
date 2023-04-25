import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface HelpModalVisibleSliceState {
	value: boolean
}

const initialState: HelpModalVisibleSliceState = {
	value: false,
}

export const helpModalVisibleSlice = createSlice({
	name: "helpModalVisible",
	initialState,
	reducers: {
		toggleHelpModalVisible: (state) => {
			state.value = !state.value
		},
		setHelpModalInvisible: (state) => {
			state.value = false
		},
	},
})

export const { toggleHelpModalVisible, setHelpModalInvisible } =
	helpModalVisibleSlice.actions

export const selectHelpModalVisible = (state: RootState) =>
	state.helpModalVisible.value

export default helpModalVisibleSlice.reducer
