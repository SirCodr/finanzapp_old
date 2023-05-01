import { useNavigate } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

const ExpendituresHeader = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h5>Gastos</h5>
      <div className='flex justify-between'>
        <section>
          <span>Todos los gastos</span>
        </section>
        <section className='flex gap-x-4'>
          <Button icon>
            <Icon name='filter' />
            <span>Filtros</span>
          </Button>
          <Button>Comparar con presupuesto</Button>
          <Button primary onClick={() => { navigate('../create') }}>Agregar gasto</Button>
        </section>
      </div>
    </div>
  )
}
export default ExpendituresHeader
