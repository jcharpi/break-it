import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface Weeks {
    [key: string]: string
}

export interface WeekState {
    value: Weeks
}

const initialState: WeekState = {
    value: {}
}

export const weekSlice = createSlice({
    name: "summaryModalVisible",
    initialState,
    reducers: {
        setWeeks: (state, action: PayloadAction<Weeks>) => {
            state.value = action.payload
        },
        resetWeeks: (state) => {
            state.value = {}
        },
    },
})

export const { resetWeeks, setWeeks } = weekSlice.actions

export const selectWeeks = (state: RootState) => state.weeks.value

export default weekSlice.reducer
