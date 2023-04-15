import OptionsButton from '@src/glbComponents/OptionsButton'
import { getAllIncomes } from '@src/services/incomes'
import { incomesActions } from '@src/store/incomes/incomesSlice'
import type { RootState } from '@src/store'
import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from './useApp'
import { deleteIncomeById } from '@src/services/incomes'
import { toast } from 'react-toastify'
import { PostgrestError } from '@supabase/supabase-js'

const useIncomeView = () => {
  const { data, isLoading } = useAppSelector(
    (state: RootState) => state.incomes
  )
  const dispatch = useAppDispatch()

  const columns = [
    'metodo',
    'categoria',
    'descripcion',
    'valor',
    'fecha',
    'actions',
  ]

  const getCurrencyFormat = (value: number) => {
    return Intl.NumberFormat('es-Es', {
      style: 'currency',
      currency: 'COP',
    }).format(value)
  }

  const fetchAndSetAllIncomes = async () => {
    const { setData, setLoading, setError } = incomesActions
    try {
      dispatch(setLoading(true))
      const { data, error } = await getAllIncomes()

      if (error) {
        dispatch(
          setError({
            status: true,
            message: error.message,
          })
        )
        dispatch(setData([]))
      }

      if (data && !error) {
        dispatch(setData(data))
      }
    } catch (e: unknown) {
      let errorMessage:string = ''
      if (typeof e === 'string') {
        errorMessage = e.toUpperCase()
      } else if (e instanceof Error) {
        errorMessage = e.message
      }
      dispatch(
        setError({
          status: true,
          message: errorMessage,
        })
      )
      dispatch(setData([]))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const fetchIncomeDeleteById = async (id:number) => {
    const { removeIncomeById, setLoading } = incomesActions

    const handleRequestOnError = (error: PostgrestError | null) => {
      toast.error('El registro no se pudo eliminar')
      console.warn('Error on delete request: ', error)
    }
    try {
      dispatch(setLoading(true))
      const {data, error} = await deleteIncomeById(id)
      
      if(error){
        return handleRequestOnError(error)
      }
      
      dispatch(removeIncomeById(id))
    } catch (error) {
      
    } finally {
      dispatch(setLoading(false))
    }
  }

  const columnDefs = useMemo(() => {
    if (!data || !data.length) return []

    return columns.map((header) => {
      const columnHeaderDef = {
        field: header,
        cellRenderer: (params) => {
          let value = params.value as string
          const header = params.colDef.field

          if (header === 'valor') {
            value = getCurrencyFormat(params.value)
          }

          if (header === 'actions') {
            return <OptionsButton agGridParams={params} onClick={()=>{fetchIncomeDeleteById(params.data.id)}} />
          }

          if (typeof params.value === 'object') {
            return params.value[header]
          }

          return value
        },
      }
      return columnHeaderDef
    })
  }, [data])

  useEffect(() => {
    fetchAndSetAllIncomes()
  }, [])

  return { data, isLoading, columnDefs }
}
export default useIncomeView
