import { AgGridReact } from 'ag-grid-react'
import useIncome from '@src/hooks/useIncome'
import { Loader } from 'semantic-ui-react'
import InfinityScrollButton from '@src/glbComponents/InfinityScrollButton'
import { handleRequestError } from '@src/services/utils'

const View = () => {
  const { incomes, isLoading, isError, fetchNextPage, hasNextPage, columnDefs } = useIncome()
  
  if (!incomes && isLoading) return <Loader active content='Cargando...' />
  
  if (isError) {
    handleRequestError(isError, 'No se pudo obtener los ingresos')
  }

  return (
    <div className='ag-theme-alpine w-full h-full'>
      <AgGridReact columnDefs={columnDefs} rowData={incomes} />
      <InfinityScrollButton
        nextResultsAvailable={hasNextPage}
        isLoading={incomes && isLoading}
        onClick={fetchNextPage}
      />
    </div>
  )
}
export default View
