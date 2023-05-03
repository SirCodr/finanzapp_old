import { Card, Dropdown, Input } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import useExpenditureCreation from '@src/hooks/useExpenditureCreation'

const ExpendituresCreation = () => {
  const {
    paymentMethods,
    expenditureCategories,
    handleAddExpenditure,
    setInputValueByName,
    formRef,
  } = useExpenditureCreation()
  
  const [startDate, setStartDate] = useState(new Date())
  const dateFormatted = useMemo(() => {
    if(!startDate) return ''

    return DateTime.fromJSDate(startDate).toFormat('yyyy-LL-dd')
  }, [startDate])

  return (
    <form className='w-full' ref={formRef}>
      <Card style={{ width: '100%', maxWidth: '450px' }}>
        <Card.Content>
          <Card.Header
            className='w-full items-center'
            style={{ display: 'flex' }}
          >
            <span>Agregar Gasto</span>
            <button
              className='ml-auto bg-blue-600 px-4 py-2 rounded text-white'
              onClick={handleAddExpenditure}
            >
              Agregar
            </button>
          </Card.Header>
        </Card.Content>
        <Card.Content extra className='w-full flex flex-col gap-y-6'>
          <section className='flex gap-x-4'>
            <div className='flex flex-col'>
              <label htmlFor='methods_select'>Método (*)</label>
              <Dropdown
                placeholder='Metodo'
                search
                selection
                options={paymentMethods}
                onChange={(e, { value }) => {
                  setInputValueByName('metodo_pago_id', value)
                }}
              />
              <input
                type='text'
                className='data-input'
                name='metodo_pago_id'
                required
                hidden
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='categories_select'>Categoria (*)</label>
              <Dropdown
                placeholder='Categoria'
                search
                selection
                options={expenditureCategories}
                onChange={(e, { value }) => {
                  setInputValueByName('categoria_id', value)
                }}
              />
              <input
                type='text'
                className='data-input'
                name='categoria_id'
                required
                hidden
              />
            </div>
          </section>
          <section className='flex gap-x-4 full'>
            <div className='flex flex-col w-full'>
              <label htmlFor='description_input'>Descripción</label>
              <Input
                placeholder='Descripción'
                className='w-full'
                id='description_input'
                onChange={(e, { value }) => {
                  setInputValueByName('descripcion', value)
                }}
              />
              <input
                type='text'
                className='data-input'
                name='descripcion'
                hidden
              />
            </div>
          </section>
          <section className='flex gap-x-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor='valor_input'>Valor (*)</label>
              <Input
                label='$'
                placeholder='Valor'
                onChange={(e, { value }) => {
                  setInputValueByName('valor', value)
                }}
              />
              <input type='text' className='data-input' name='valor' required hidden />
            </div>
            <div>
              <label htmlFor='datepicker_input'>Fecha (*)</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date)
                }}
                isClearable
                placeholderText='Fecha'
              />
              <input
                type='text'
                className='data-input'
                name='fecha'
                value={dateFormatted}
                required
                hidden
              />
            </div>
          </section>
        </Card.Content>
      </Card>
    </form>
  )
}
export default ExpendituresCreation
