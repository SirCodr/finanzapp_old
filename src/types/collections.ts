import { Database } from "./supabase";

export type IncomeType = Database["public"]["Tables"]["ingresos"]["Row"];
export type Expenditure = Database["public"]["Tables"]["gastos"]["Row"];
export type PaymentMethodType = Database["public"]["Tables"]["metodo_pagos"]["Row"];
export type IncomeCategoryType = Database["public"]["Tables"]["categoria_ingresos"]["Row"];
export type ExpenditureCategoryType = Database["public"]["Tables"]["categoria_gastos"]["Row"];


export interface IncomesWithForeigns extends Omit<IncomeType, "metodo_pago_id, categoria_id"> {
  metodo: PaymentMethodType,
  categoria: IncomeCategoryType
}

export interface ExpenditureWithForeigns extends Omit<Expenditure, "metodo_pago_id, categoria_id"> {
  metodo: PaymentMethodType,
  categoria: ExpenditureCategoryType
} 