import { useState } from 'react'
import OptionsButton from '@src/glbComponents/OptionsButton'
import {  useMemo } from 'react'
import { getCurrencyFormat } from '@src/utils'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IncomesWithForeigns } from '@src/types/collections'
import { getExpenditures } from '@src/services/expenditures'

const useExpenditure = () => {
  const [page, setPage] = useState<number>(0)

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor: number, incomes: IncomesWithForeigns[]}>(
    ['incomes', page],
    getExpenditures,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )

  const expenditures = useMemo(() => {
    if(data && data?.pages && data?.pages.length) {
      return data?.pages.flatMap(page => page.expenditures)
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
    if (!expenditures || !expenditures.length) return []

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
            return params.value ? params.value[header] : null
          }

          return value
        }
      }
      return columnHeaderDef
    })
  }, [expenditures])

  return {
    expenditures: expenditures ?? [],
    isLoading,
    isError: isError ,
    columnDefs,
    page,
    fetchNextPage,
    hasNextPage
  }
}
export default useExpenditure
