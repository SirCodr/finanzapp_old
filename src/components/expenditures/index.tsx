import ExpendituresHeader from './Header'
import View from './View'

const ExpendituresView = () => {
  return (
    <section className='grid grid-rows-[auto_1fr_30px] w-full h-full'>
      <ExpendituresHeader />
      <View />
    </section>
  )
}
export default ExpendituresView
