import supabase from '@src/supabase'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { IncomeCategoryType, IncomeType, PaymentMethodType } from '@src/types/collections'
import { getAllPaymentMethods } from '@src/services/paymentMethos'
import { useAppDispatch } from './useApp'
import { handleRequestError } from '@src/services/utils'
import { getAllIncomeCategories } from '@src/services/incomeCategories'
import { IncomesWithForeigns } from '@src/types/collections'

type dropDownType = {
  key: number,
  text: string,
  value: number
}

const useIncomeCreation = () => {
  const [paymentMethods, setPaymentMehtods] = useState<dropDownType[]>([])
  const [incomeCategories, setIncomeCategories] = useState<dropDownType[]>([])
  const [formData, setFormData] = useState<IncomeType | object>({})
  const formRef = useRef<HTMLFormElement>()
  const dispatch = useAppDispatch()

  const handleAddIncome = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if(!isFormWellFilled()) {
      return handleFormBadFilled()
    }

    const currentFormData = getFormData()
    formRef?.current?.reset()
    const { error } = await supabase.from('ingresos').insert([currentFormData])

    if (!error) {
      toast.success('Ingreso creado con éxito')
    }    
  }

  const getFormData = () : IncomesWithForeigns => {
    const entries = Object.fromEntries(new FormData(formRef.current))
    return { ...entries, id: 0 }
  }

  const setInputValueByName = (name: string, value: string) => {
    const input = document.querySelector(`input[name=${name}]`) as HTMLInputElement
    input.value = value
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

  const isFormWellFilled = () : boolean => {
    const requiredInputsForm = formRef.current?.querySelectorAll('input[required]') as NodeListOf<HTMLInputElement>
    const isSomeRequiredInputEmpty = Array.from(requiredInputsForm).some(requiredInput => requiredInput.value.trim() === '') as boolean

    return !isSomeRequiredInputEmpty
  }

  const handleFormBadFilled = () => {
    toast.error('Llene todos los campos obliagtorios')
  }

  useEffect(() => {
    (async () => {
      await fetchAndSetPaymentMethods()
      await fetchAndSetIncomeCategories()
    })()
  }, [])

  return (
    { paymentMethods, incomeCategories, handleAddIncome, setInputValueByName, isFormWellFilled, formRef }
  )
}
export default useIncomeCreation
