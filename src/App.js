import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <>
        <Router>
          <Routes>
              <Route path='/' element={ <Register /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='/login' element={ <Login  /> } />
              <Route path='/dashboard' element={ <Dashboard  /> } />
          </Routes>
        </Router>
    </>
  )
}

export default App