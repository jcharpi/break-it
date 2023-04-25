import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export enum CurrentWeeks {
    WEEK_0 = "week0",
    WEEK_1 = "week1",
    WEEK_2 = "week2",
    WEEK_3 = "week3",
    WEEK_4 = "week4",
    WEEK_5 = "week5",
    WEEK_6 = "week6",
    WEEK_7 = "week7",
    WEEK_8 = "week8",
    WEEK_9 = "week9",
}

export interface CurrentWeekState {
  value: CurrentWeeks
}

const initialState: CurrentWeekState = {
  value: CurrentWeeks.WEEK_0
}

export const currentWeekSlice = createSlice({
  name: "occurrences",
  initialState,
  reducers: {
    resetCurrentWeek: (state) => {
      state.value = CurrentWeeks.WEEK_0
    },
    setCurrentWeek: (state, action: PayloadAction<CurrentWeeks>) => {
      state.value = action.payload
    }
  },
})

export const { resetCurrentWeek, setCurrentWeek } = currentWeekSlice.actions

export const selectCurrentWeek = (state: RootState) => state.currentWeek.value

export default currentWeekSlice.reducer
