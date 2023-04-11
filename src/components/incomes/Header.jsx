import { useNavigate } from 'react-router-dom'

const IncomesHeader = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h5>Ingresos</h5>
      <div className='flex justify-between'>
        <section>
          <span>Todos los ingresos</span>
        </section>
        <section>
          <button onClick={() => { navigate('./create') }}>Agregar ingreso</button>
        </section>
      </div>
    </div>
  )
}
export default IncomesHeader
