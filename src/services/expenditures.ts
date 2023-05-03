import supabase from '@src/supabase'
import { ExpenditureWithForeigns } from '@src/types/collections'
import { getRangePaginationByPage } from '@src/utils'

export const getExpenditures = async ({
  pageParam = 0
}: {
  pageParam?: number
}) => {
  const rangePagination = getRangePaginationByPage(pageParam)
  return await supabase
    .from('gastos')
    .select(
      'id, metodo:metodo_pago_id(metodo), categoria:categoria_id(categoria), descripcion, valor, fecha'
    )
    .range(rangePagination.min, rangePagination.max)
    .returns<ExpenditureWithForeigns[]>()
    .then((res) => {
      return {
        expenditures: res.data,
        nextCursor: res.data?.length ? pageParam + 1 : false
      }
    })
}
