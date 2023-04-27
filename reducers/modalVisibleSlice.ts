import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface ModalVisible {
	helpModalVisible: boolean,
	summaryModalVisible: boolean
}

export interface ModalVisibleState {
	value: ModalVisible
}

const initialState: ModalVisibleState = {
	value: {
		helpModalVisible: false,
		summaryModalVisible: false
	},
}

export const modalVisibleSlice = createSlice({
	name: "modalVisible",
	initialState,
	reducers: {
		toggleHelpModalVisible: (state) => {
			state.value.helpModalVisible = !state.value.helpModalVisible
		},
		setHelpModalInvisible: (state) => {
			state.value.helpModalVisible = false
		},
		setSummaryModalVisible: (state) => {
			state.value.summaryModalVisible = true
		},
		setSummaryModalInvisible: (state) => {
			state.value.summaryModalVisible = false
		},
	},
})

export const { toggleHelpModalVisible, setHelpModalInvisible, setSummaryModalVisible, setSummaryModalInvisible } = modalVisibleSlice.actions

export const selectModalVisible = (state: RootState) =>
	state.modalVisibleSlice.value

export default modalVisibleSlice.reducer
