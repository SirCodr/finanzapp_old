import Incomes from '@src/pages/incomes'
import Dashboard from '@pages/dashboard'
import Layout from '@components/layout'
import { Route, Routes } from 'react-router-dom'

import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-alpine.css'
import PageNotFound from '@src/pages/PageNotFound'
import IncomesCreationPage from '@src/pages/incomes/create'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='incomes'>
          <Route index element={<Incomes />} />
          <Route path='create' element={<IncomesCreationPage />} />
        </Route>
        <Route path='expenditures'>
          <Route index element={<>view expenditures</>} />
          <Route path='create' element={<h1>create expenditures</h1>} />
        </Route>
        <Route path='budget'>
          <Route index element={<>view budget</>} />
          <Route path='create' element={<h1>create budget</h1>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
