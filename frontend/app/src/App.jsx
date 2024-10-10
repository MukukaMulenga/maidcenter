import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Authpage from './pages/Authpage';
import Dashbord from './pages/Dashbord';
import PrivateRoute from './components/privateRoute';
import Userstable from './components/Userstable';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/authpage/:role' element={<Authpage />} />
        <Route path='/dashbord' element={<Dashbord />}/>
        <Route path='/users' Component={Userstable}/>
      
      </Routes>
    </Router>
  );
}

export default App;
