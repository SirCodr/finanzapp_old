import { AgGridReact } from 'ag-grid-react'
import InfinityScrollButton from '@src/glbComponents/InfinityScrollButton'
import useExpenditure from '@src/hooks/useExpenditure'
import { handleRequestError } from '@src/services/utils'
import { Loader } from 'semantic-ui-react'

const View = () => {
  const {
    expenditures,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    columnDefs
  } = useExpenditure()

  if (!expenditures && isLoading) return <Loader active content='Cargando...' />

  if (isError) {
    handleRequestError(isError, 'No se pudo obtener los ingresos')
  }

  return (
    <div className='ag-theme-alpine w-full h-full'>
      <AgGridReact columnDefs={columnDefs} rowData={expenditures} />
      <InfinityScrollButton
        nextResultsAvailable={hasNextPage}
        isLoading={expenditures && isLoading}
        onClick={fetchNextPage}
      />
    </div>
  )

  return <></>
}
export default View
