import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface SummaryModalVisibleSliceState {
	value: boolean
}

const initialState: SummaryModalVisibleSliceState = {
	value: false,
}

export const summaryModalVisibleSlice = createSlice({
	name: "summaryModalVisible",
	initialState,
	reducers: {
		setSummaryModalVisible: (state) => {
			state.value = true
		},
		setSummaryModalInvisible: (state) => {
			state.value = false
		},
	},
})

export const { setSummaryModalInvisible, setSummaryModalVisible } =
	summaryModalVisibleSlice.actions

export const selectSummaryModalVisible = (state: RootState) =>
	state.summaryModalVisible.value

export default summaryModalVisibleSlice.reducer
