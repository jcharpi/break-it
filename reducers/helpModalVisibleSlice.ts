import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface HelpModalVisibleSliceState {
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
    setHelpModalVisible: (state) => {
        state.value = true
    },
    setHelpModalInvisible: (state) => {
        state.value = false
    },
  },
})

export const { toggleHelpModalVisible, setHelpModalVisible, setHelpModalInvisible } = helpModalVisibleSlice.actions

export const selectHelpModalVisible = (state: RootState) => state.helpModalVisible.value

export default helpModalVisibleSlice.reducer
