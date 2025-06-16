
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Login from './loginpage/Login'
import Dashboard from './dashboard/Dashboard'
import ProtectedRoute from './protectedRoute/ProtectedRoute'
import CreateEmployee from './createEmployee/CreateEmployee'

function App() {

  return (
    <>

     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path='/createemployee' element={<ProtectedRoute><CreateEmployee/></ProtectedRoute>}/>
      </Routes> 
  </>
  )
}

export default App
