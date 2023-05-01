import { AgGridReact } from 'ag-grid-react'
import useIncomeView from '@src/hooks/useIncome'
import { Button, Loader, Pagination } from 'semantic-ui-react'
import InfinityScrollButton from '@src/glbComponents/InfinityScrollButton'

const View = () => {
  // if (!data.length && isLoading) return <Loader active content='Cargando...' />

  return (
    <div className='ag-theme-alpine w-full h-full'>
      <AgGridReact columnDefs={[]} rowData={[]} />
      <InfinityScrollButton
        nextResultsAvailable={false}
        nextPage={15}
        isLoading={false}
        onClick={()=>{}}
      />
    </div>
  )

  return <></>
}
export default View
