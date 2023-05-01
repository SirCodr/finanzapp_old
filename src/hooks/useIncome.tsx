import { useState } from 'react'
import OptionsButton from '@src/glbComponents/OptionsButton'
import { getIncomes } from '@src/services/incomes'
import { useEffect, useMemo } from 'react'
import { getCurrencyFormat, getRangePaginationByPage } from '@src/utils'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IncomesWithForeigns } from '@src/types/collections'

const useIncome = () => {
  const [page, setPage] = useState<number>(0)

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor: number, incomes: IncomesWithForeigns[]}>(
    ['incomes', page],
    getIncomes,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )

  const incomes = useMemo(() => {
    if(data && data?.pages && data?.pages.length) {
      return data?.pages.flatMap(page => page.incomes)
    }

    return []
  }, [data])
  
  const columns = [
    'metodo',
    'categoria',
    'descripcion',
    'valor',
    'fecha',
    'actions'
  ]

  const columnDefs = useMemo(() => {
    if (!incomes || !incomes.length) return []

    return columns.map((header) => {
      const columnHeaderDef = {
        field: header,
        cellRenderer: (params) => {
          let value = params.value as string
          let header = params.colDef.field

          if (header === 'valor') {
            value = getCurrencyFormat(params.value)
          }

          if (header === 'actions') {
            return (
              <OptionsButton
                agGridParams={params}
                onClick={() => {
                  // fetchIncomeDeleteById(params.data.id)
                }}
              />
            )
          }

          if (typeof params.value === 'object') {
            return params.value[header]
          }

          return value
        }
      }
      return columnHeaderDef
    })
  }, [incomes])

  return {
    incomes: incomes ?? [],
    isLoading,
    isError: isError ,
    columnDefs,
    page,
    fetchNextPage,
    hasNextPage
  }
}
export default useIncome
