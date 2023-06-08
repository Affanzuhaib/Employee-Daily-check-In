import {
  BrowserRouter,
  Routes,
  Route,
  json,
  Navigate,
} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './components/Admindashboard';
import { useState,useEffect } from 'react';
import UserContext from './features/userContext';


function App() {
    const [user, setUser] = useState(null);
    console.log(user)
    // Check if user data exists in local storage and set it as the initial user state
    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={user && user.role === 'Admin' ? <Signup/> : <Navigate to={'/'}/>}/>
        <Route path='/dashboard' element={user && user.role === 'Employee' ? <Dashboard/> : <Navigate to={'/'}/>}/>
        <Route path='/admindashboard' element={user && user.role === 'Admin' ? <AdminDashboard/> : <Navigate to={'/'}/>}/>
      </Routes>
 </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;
