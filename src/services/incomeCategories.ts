import supabase from '@src/supabase'
import { IncomesCategoryType } from '@src/types/collections'

export const getAllIncomeCategories = async () => {
  return await supabase.from('categoria_ingresos').select('id, categoria').returns<IncomesCategoryType[]>()
}
