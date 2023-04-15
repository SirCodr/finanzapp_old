import { AgGridReact } from 'ag-grid-react'
import useIncomeView from '@src/hooks/useIncomeView'
import { Loader } from 'semantic-ui-react'

const View = () => {
  const { data, isLoading, columnDefs } = useIncomeView()

  if (!data || !data.length) return <></>

  return (
    <div
      className='ag-theme-alpine w-full h-full'
    >
      {isLoading ? <Loader active content='Cargando...' /> :
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
      />}
    </div>
  )
}
export default View
