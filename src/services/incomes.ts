import { IncomesWithForeigns } from '@src/types/collections'
import supabase from '@src/supabase'
import { getRangePaginationByPage } from '@src/utils'

export const getIncomes = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const rangePagination = getRangePaginationByPage(pageParam)
  return await supabase
    .from('ingresos')
    .select(
      'id, metodo:metodo_pago_id(metodo), categoria:categoria_id(categoria), descripcion, valor, fecha'
    )
    .range(rangePagination.min, rangePagination.max)
    .returns<IncomesWithForeigns[]>()
    .then((res) => {
      
      return {
        incomes: res.data,
        nextCursor: res.data?.length ? (pageParam + 1) : false
      }
    })
}

export const deleteIncomeById = async (id: number) => {
  return await supabase.from('ingresos').delete().eq('id', id)
}
