import { createSlice } from "@reduxjs/toolkit"
import { incomesReducers } from "./incomesReducers"
import { Incomes } from "./IncomesType"

const initialState : Incomes = {
  data: [],
  isLoading: false,
  error: {
    status: false,
    message: ''
  }
}

export const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: incomesReducers
})

export const incomesActions = incomesSlice.actions

export default incomesSlice.reducer