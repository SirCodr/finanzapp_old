import { IncomesWithForeigns } from "@src/types/collections";

export type Incomes = {
  data: [] | IncomesWithForeigns[],
  isLoading: boolean,
  error: IncomeError
}

export type IncomeError = {
  status: boolean,
  message: string
}