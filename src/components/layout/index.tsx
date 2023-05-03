import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Header from './Header'

const Layout = () => {
  return (
    <div className='grid grid-cols-[auto_1fr] w-full h-full'>
      <aside className=''>
        <SideBar />
      </aside>
      <section className='grid grid-rows-[auto_1fr]'>
        <Header />
        <main className='px-4 py-5'>
          <Outlet />
        </main>
      </section>
    </div>
  )
}
export default Layout
