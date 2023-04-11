import { AgGridReact } from 'ag-grid-react'
import { useEffect, useMemo, useState } from 'react'
import supabase from '@src/supabase'
import OptionsButton from '@src/glbComponents/OptionsButton'

const View = () => {
  const [data, setData] = useState([])

  const currencyFormat = (value) => {
    return Intl.NumberFormat('es-Es', { style: 'currency', currency: 'COP' }).format(value)
  }

  const columns = ['metodo', 'categoria', 'descripcion', 'valor', 'fecha', 'actions']
  const columnDefs = useMemo(() => {
    if (!data.length) return []

    return columns.map(header => {
      const columnHeaderDef = {
        field: header,
        cellRenderer: params => {
          let value = params.value
          const header = params.colDef.field

          if (header === 'valor') {
            value = currencyFormat(params.value)
          }

          if (header === 'actions') {
            return <OptionsButton />
          }

          if (typeof params.value === 'object') {
            return params.value[header]
          }

          return value
        }
      }
      return columnHeaderDef
    })
  }, [data])

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase.from('ingresos').select('metodo:metodo_pago_id(metodo), categoria:categoria_id(categoria), descripcion, valor, fecha')
      setData(data)
    })()
  }, [])

  if (!data.length) return <></>

  return (
    <div
      className='ag-theme-alpine w-full h-full'
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
      />
    </div>
  )
}
export default View
