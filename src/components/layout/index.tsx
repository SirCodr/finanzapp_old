import { Outlet } from 'react-router-dom'
import ToggleSideBar from './ToggleSideBar'
import SideBar from './SideBar'

const Layout = () => {
  return (
    <div className='grid grid-cols-[auto_1fr] w-full h-full'>
      <aside className=''>
        <SideBar />
      </aside>
      <section className='grid grid-rows-[auto_1fr]'>
        <header className='flex'>
          <ToggleSideBar />
          Header
        </header>
        <main className='px-4 py-5'>
          <Outlet />
        </main>
      </section>
    </div>
  )
}
export default Layout
