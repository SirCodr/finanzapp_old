import { toast } from 'react-toastify'
import { rangePaginationType } from './types/pagination'

export const getCurrencyFormat = (value: number) => {
  return Intl.NumberFormat('es-Es', {
    style: 'currency',
    currency: 'COP'
  }).format(value)
}

export const getRangePaginationByPage = (page: number): rangePaginationType => {
  const rangeDiff = 15

  return {
    min: page * rangeDiff,
    max: page * rangeDiff + rangeDiff - 1
  }
}

export const isFormWellFilled = (
  container: HTMLElement | undefined
): boolean => {
  const requiredInputsForm = !container
    ? []
    : (container.querySelectorAll(
        'input[required]'
      ) as NodeListOf<HTMLInputElement>)
  const isSomeRequiredInputEmpty = Array.from(requiredInputsForm).some(
    (requiredInput) => requiredInput.value.trim() === ''
  ) as boolean

  return !isSomeRequiredInputEmpty
}

export const setInputValueByName = (name: string, value: string) => {
  const input = document.querySelector(
    `input[name=${name}]`
  ) as HTMLInputElement
  input.value = value
}

export const getFormData = (form:HTMLFormElement|undefined) => {
    if(!form) return null

    const entries = Object.fromEntries(new FormData(form))
    return { ...entries}
  }

export const handleFormBadFilled = () => {
  toast.error('Llene todos los campos obligatorios')
}
