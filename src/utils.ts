import { rangePaginationType } from "./types/pagination"

export const getCurrencyFormat = (value: number) => {
  return Intl.NumberFormat('es-Es', {
    style: 'currency',
    currency: 'COP'
  }).format(value)
}

export const getRangePaginationByPage = (page: number) : rangePaginationType => {
  const rangeDiff = 15

  return {
    min: page * rangeDiff,
    max: ( (page * rangeDiff) + rangeDiff ) - 1
  }
}