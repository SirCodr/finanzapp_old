import { IncomesWithForeigns } from "@src/types/collections";

export interface Incomes {
  data: [] | IncomesWithForeigns[],
  isLoading: boolean,
  error: IncomeError
}

export type IncomeError = {
  status: boolean,
  message: string
}