import { Income } from "@src/types/income"
import { IncomeError, Incomes } from "./IncomesType"
import { PayloadAction } from "@reduxjs/toolkit"
import { IncomesWithForeigns } from "@src/types/collections"

export const incomesReducers = {
  setData: (state: Incomes, action: PayloadAction<IncomesWithForeigns[]>) => {
    state.data = action.payload
  },
  setLoading: (state: Incomes, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload
  },
  setError: (state: Incomes, action: PayloadAction<IncomeError>) => {
    state.error = action.payload
  },
  removeIncomeById: (state: Incomes, action: PayloadAction<number>) => {
    state.data = state.data.filter(income => income.id !== action.payload)
  }
}