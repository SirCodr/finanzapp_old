import { AgGridReact } from 'ag-grid-react'
import { useEffect, useMemo, useState } from 'react'
import supabase from '@src/supabase'

const View = () => {
  const [data, setData] = useState([])

  const currencyFormat = (params) => {
    return Intl.NumberFormat('es-Es', { style: 'currency', currency: 'COP' }).format(params.value)
  }

  const columnDefs = useMemo(() => {
    if (!data.length) return []

    return Object.keys(data[0]).map(header => {
      const columnHeaderDef = { field: header }

      if (header === 'valor') {
        columnHeaderDef.valueFormatter = currencyFormat
      }

      return columnHeaderDef
    })
  }, [data])

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase.from('ingresos').select('metodo, categoria, descripcion, valor, fecha')
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
