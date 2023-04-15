import { Database } from "./supabase";

export type IncomesType = Database["public"]["Tables"]["ingresos"]["Row"];
export type PaymentMethodsType = Database["public"]["Tables"]["metodo_pagos"]["Row"];
export type IncomesCategoryType = Database["public"]["Tables"]["categoria_ingresos"]["Row"];
export type ExpendituresCategoryType = Database["public"]["Tables"]["categoria_gastos"]["Row"];


export interface IncomesWithForeigns extends Omit<IncomesType, "metodo_pago_id, categoria_id"> {
  metodo: PaymentMethodsType,
  categoria: IncomesCategoryType
}