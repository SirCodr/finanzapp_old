import supabase from '@src/supabase'
import { PaymentMethodsType } from '@src/types/collections'

export const getAllPaymentMethods = async () => {
  return await supabase.from('metodo_pagos').select('id, metodo').returns<PaymentMethodsType[]>()
}