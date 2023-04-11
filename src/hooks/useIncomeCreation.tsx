import supabase from '@src/supabase'
import { useRef } from 'react'
import { toast } from 'react-toastify'

const useIncomeCreation = () => {
  const formRef = useRef()

  const handleAddIncome = async (e) => {
    e.preventDefault()
    const formData = getFormData()
    const { error } = await supabase.from('ingresos').insert([formData])

    if (!error) {
      toast.success('Ingreso creado con éxito')
    }
  }

  const getFormData = () => {
    return Object.fromEntries(new FormData(formRef.current))
  }

  const setInputValueByName = (name, value) => {
    document.querySelector(`input[name=${name}]`).value = value
  }

  return (
    { handleAddIncome, setInputValueByName, formRef }
  )
}
export default useIncomeCreation
