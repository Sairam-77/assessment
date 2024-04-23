import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectorRoute from './pages/ProtectorRoute'
import Home from './pages/home'
import { Login } from './pages/login'
import Register from './pages/register'


function App() {


  return <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Register />} />

        <Route element={<ProtectorRoute />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </Router>

  </>
}

export default App
