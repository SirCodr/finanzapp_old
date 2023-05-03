import { useMemo, useRef } from 'react'
import { getAllPaymentMethods } from '@src/services/paymentMethods'
import { useQuery } from '@tanstack/react-query'
import { getAllExpenditureCategories } from '@src/services/expenditureCategories'
import { getFormData, handleFormBadFilled, isFormWellFilled } from '@src/utils'
import supabase from '@src/supabase'
import { toast } from 'react-toastify'

const useExpenditureCreation = () => {
  const formRef = useRef<HTMLFormElement>()
  const {
    data: paymentMethodsData,
    isLoading: isPaymentMethodsLoading,
    isError: isPaymentMethodsError
  } = useQuery(['paymentMethods'], getAllPaymentMethods)

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError
  } = useQuery(['expenditureCategories'], getAllExpenditureCategories)

  const paymentMethods = useMemo(() => {
    return paymentMethodsData?.data
      ?.map(({ id, metodo }) => {
        return {
          key: id,
          text: metodo,
          value: id
        }
      })
      .sort((a, b) => a.text.localeCompare(b.text))
  }, [paymentMethodsData])

  const expenditureCategories = useMemo(() => {
    return categoriesData?.data
      ?.map(({ id, categoria }) => {
        return {
          key: id,
          text: categoria,
          value: id
        }
      })
      .sort((a, b) => a.text.localeCompare(b.text))
  }, [categoriesData])

  const handleAddExpenditure = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault()

    if (!isFormWellFilled(formRef.current)) {
      return handleFormBadFilled()
    }

    const currentFormData = getFormData(formRef.current)
    formRef?.current?.reset()
    const { error } = await supabase.from('gastos').insert([currentFormData])

    if (!error) {
      toast.success('Ingreso creado con éxito')
    }
  }

  const setInputValueByName = (name: string, value: string) => {
    const input = document.querySelector(
      `input[name=${name}]`
    ) as HTMLInputElement
    input.value = value
  }

  return {
    paymentMethods,
    expenditureCategories,
    setInputValueByName,
    handleAddExpenditure,
    formRef
  }
}
export default useExpenditureCreation
