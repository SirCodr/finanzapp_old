import { IncomesWithForeigns } from "@src/types/collections";

export type Incomes = {
  data: [] | IncomesWithForeigns[],
  nextResultsAvailable: boolean,
  isLoading: boolean,
  error: IncomeError
}

export type IncomeError = {
  status: boolean,
  message: string
}