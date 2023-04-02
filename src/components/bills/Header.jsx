import { useNavigate } from 'react-router-dom'

const BillsHeader = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h5>Billing</h5>
      <div className='flex justify-between'>
        <section>
          <span>All bils</span>
        </section>
        <section>
          <button onClick={() => { navigate('./create') }}>Create bill</button>
        </section>
      </div>
    </div>
  )
}
export default BillsHeader
