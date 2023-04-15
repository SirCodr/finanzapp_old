import { IncomesWithForeigns } from '@src/types/collections'
import supabase from '@src/supabase'

export const getAllIncomes = async () => {
  return await supabase.from('ingresos').select('id, metodo:metodo_pago_id(metodo), categoria:categoria_id(categoria), descripcion, valor, fecha').returns<IncomesWithForeigns[]>()
}

export const deleteIncomeById = async (id: number) => {
  return await supabase.from('ingresos').delete().eq('id', id)
}