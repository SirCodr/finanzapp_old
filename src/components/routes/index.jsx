import Bills from '@pages/bills'
import Dashboard from '@pages/dashboard'
import Layout from '@components/layout'
import { Route, Routes } from 'react-router-dom'

import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-alpine.css'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='bills'>
          <Route index element={<Bills />} />
          <Route path='create' element={<h1>create</h1>} />
        </Route>
      </Route>
    </Routes>
  )
}
export default AppRoutes
