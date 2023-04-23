import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface ActiveSliderState {
  value: boolean
}

const initialState: ActiveSliderState = {
  value: false,
}

export const activeSliderSlice = createSlice({
  name: "activeSlider",
  initialState,
  reducers: {
    setActiveSlider: (state) => {
      state.value = true
    },
    setInactiveSlider: (state) => {
      state.value = false
    }
  },
})

export const { setActiveSlider, setInactiveSlider } = activeSliderSlice.actions

export const selectActiveSlider = (state: RootState) => state.activeSlider.value

export default activeSliderSlice.reducer
