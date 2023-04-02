import BillsHeader from './Header'
import View from './View'

const BillsView = () => {
  return (
    <section className='grid grid-rows-[auto_1fr] w-full h-full'>
      <BillsHeader />
      <View />
    </section>
  )
}
export default BillsView
