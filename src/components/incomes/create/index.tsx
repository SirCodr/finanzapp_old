import { Card, Dropdown, Input } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import useIncomeCreation from '@src/hooks/useIncomeCreation'
import { useMemo, useState } from 'react'
import { DateTime } from 'luxon'

const IncomesCreate = () => {
  const { handleAddIncome, setInputValueByName, formRef } = useIncomeCreation()

  const metodos = [
    { key: 1, text: 'Efectivo', value: 1 },
    { key: 2, text: 'Transferencia', value: 2 }
  ]

  const categorias = [
    { key: 1, text: 'Prestámo', value: 1 },
    { key: 2, text: 'Salario', value: 2 },
    { key: 3, text: 'Plataformas digitales', value: 3 }
  ]

  const [startDate, setStartDate] = useState(new Date())
  const dateFormatted = useMemo(() => {
    return DateTime.fromJSDate(startDate).toFormat('yyyy-LL-dd')
  }, [startDate])

  return (
    <form className='w-full' ref={formRef}>
      <Card style={{ width: '100%', maxWidth: '450px' }}>
        <Card.Content>
          <Card.Header className='w-full items-center' style={{ display: 'flex' }}>
            <span>Agregar Ingreso</span>
            <button
              className='ml-auto bg-blue-600 px-4 py-2 rounded text-white'
              onClick={handleAddIncome}
            >
              Agregar
            </button>
          </Card.Header>
        </Card.Content>
        <Card.Content extra className='w-full flex flex-col gap-y-6'>
          <section className='flex gap-x-4'>
            <div className='flex flex-col'>
              <label htmlFor='methods_select'>Métodos</label>
              <Dropdown
                placeholder='Metodos'
                search
                selection
                options={metodos}
                onChange={(e, { value }) => { setInputValueByName('metodo_pago_id', value) }}
              />
              <input type='text' className='data-input' name='metodo_pago_id' hidden />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='categories_select'>Categorias</label>
              <Dropdown
                placeholder='Categorias'
                search
                selection
                options={categorias}
                onChange={(e, { value }) => { setInputValueByName('categoria_id', value) }}
              />
              <input type='text' className='data-input' name='categoria_id' hidden />
            </div>
          </section>
          <section className='flex gap-x-4 full'>
            <div className='flex flex-col w-full'>
              <label htmlFor='description_input'>Descripción</label>
              <Input
                placeholder='Descripción'
                className='w-full'
                id='description_input'
                onChange={(e, { value }) => { setInputValueByName('descripcion', value) }}
              />
              <input type='text' className='data-input' name='descripcion' hidden />
            </div>
          </section>
          <section className='flex gap-x-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor='valor_input'>Valor</label>
              <Input label='$' placeholder='Valor' onChange={(e, { value }) => { setInputValueByName('valor', value) }} />
              <input type='text' className='data-input' name='valor' hidden />
            </div>
            <div>
              <label htmlFor='datepicker_input'>Fecha</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => { setStartDate(date) }}
                isClearable
                placeholderText='Fecha'
              />
              <input type='text' className='data-input' name='fecha' value={dateFormatted} hidden />
            </div>
          </section>
        </Card.Content>
      </Card>
    </form>
  )
}
export default IncomesCreate
