import Incomes from '@src/pages/incomes'
import Dashboard from '@pages/dashboard'
import Layout from '@components/layout'
import { Navigate, Route, Routes } from 'react-router-dom'

import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-alpine.css'
import PageNotFound from '@src/pages/PageNotFound'
import IncomesCreationPage from '@src/pages/incomes/create'
import Calendar from '../Calendar'
import Expenditures from '../expenditures'
import ExpendituresCreation from '../expenditures/create'
import Login from '../login'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='incomes'>
          <Route index element={<Navigate to='all' />} />
          <Route path='all' element={<Incomes />} />
          <Route path='create' element={<IncomesCreationPage />} />
        </Route>
        <Route path='expenditures'>
          <Route index element={<Expenditures />} />
          <Route path='create' element={<ExpendituresCreation />} />
        </Route>
        <Route path='budget'>
          <Route index element={<>view budget</>} />
          <Route path='create' element={<h1>create budget</h1>} />
        </Route>
        <Route path='calendar' element={<Calendar />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
export default AppRoutes
