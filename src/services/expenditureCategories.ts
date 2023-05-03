import supabase from '@src/supabase'
import { ExpenditureCategoryType } from '@src/types/collections'

export const getAllExpenditureCategories = async () => {
  return await supabase.from('categoria_gastos').select('id, categoria').returns<ExpenditureCategoryType[]>()
}
 