import supabase from '@src/supabase'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { IncomeCategoryType, IncomeType, PaymentMethodType } from '@src/types/collections'
import { getAllPaymentMethods } from '@src/services/paymentMethods'
import { handleRequestError } from '@src/services/utils'
import { getAllIncomeCategories } from '@src/services/incomeCategories'
import { getFormData, handleFormBadFilled, isFormWellFilled } from '@src/utils'

type dropDownType = {
  key: number,
  text: string,
  value: number
}

const useIncomeCreation = () => {
  const [paymentMethods, setPaymentMehtods] = useState<dropDownType[]>([])
  const [incomeCategories, setIncomeCategories] = useState<dropDownType[]>([])
  const formRef = useRef<HTMLFormElement>()

  const handleAddIncome = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if(!isFormWellFilled(formRef.current)) {
      return handleFormBadFilled()
    }

    const currentFormData = getFormData(formRef.current)
    formRef?.current?.reset()
    const { error } = await supabase.from('ingresos').insert([currentFormData])

    if (!error) {
      toast.success('Ingreso creado con éxito')
    }    
  }

  const fetchAndSetPaymentMethods = async () => {
    const transformDataForTableView = (data: PaymentMethodType[]) :  dropDownType[] => {
      return data.map(paymentMethod => ({
        key: paymentMethod.id,
        text: paymentMethod.metodo,
        value: paymentMethod.id
      }))
    }

    try {
      const { data, error} = await getAllPaymentMethods()

      if(error){
        setPaymentMehtods([])
        return handleRequestError(error, 'Error al cargar métodos de pago')
      }

      const tranformedData = transformDataForTableView(data)
      setPaymentMehtods(tranformedData)
    } catch (error: any) {
      setPaymentMehtods([])
      handleRequestError(error, 'Error al cargar métodos de pago')
    }
  }

  const fetchAndSetIncomeCategories = async () => {
    const transformDataForTableView = (data: IncomeCategoryType[]) :  dropDownType[] => {
      return data.map(paymentMethod => ({
        key: paymentMethod.id,
        text: paymentMethod.categoria,
        value: paymentMethod.id
      }))
    }

    try {
      const { data, error} = await getAllIncomeCategories()

      if(error){
        setIncomeCategories([])
        return handleRequestError(error, 'Error al cargar categorias de ingresos')
      }

      const tranformedData = transformDataForTableView(data)
      setIncomeCategories(tranformedData)
    } catch (error: any) {
      setIncomeCategories([])
      handleRequestError(error, 'Error al cargar categorias de ingresos')
    }
  }

  useEffect(() => {
    (async () => {
      await fetchAndSetPaymentMethods()
      await fetchAndSetIncomeCategories()
    })()
  }, [])

  return (
    { paymentMethods, incomeCategories, handleAddIncome, isFormWellFilled, formRef }
  )
}
export default useIncomeCreation
