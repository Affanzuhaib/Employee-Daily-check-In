import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/Admindashboard';
import { useSelector } from 'react-redux';
import Users from './pages/Users';
import Worktask from './pages/Worktask';
// import EmployeeDetails from './pages/EmployeeDetails';

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/signup'
          element={user && user.role === 'Admin' ? <Signup /> : <Navigate to={'/'} />}
        />
        <Route
          path='/users'
          element={user && user.role === 'Admin' ? <Users /> : <Navigate to={'/'} />}
        />
        <Route
          path='/dashboard'
          element={user && user.role === 'Employee' ? <Dashboard /> : <Navigate to={'/'} />}
        />
        {/* <Route 
          path='/EmployeeDetails/:userId'
          element={user && user.role === 'Admin' ? <EmployeeDetails /> : <Navigate to={'/'} />}
        /> */}
        {/* <Route 
          path='/employee-detail/:userId'
          element={user && user.role === 'Admin' ? <EmployeeDetails /> : <Navigate to={'/'} />}
        /> */}
        <Route
          path='/Worktask'
          Component={user && user.role === 'Employee' ? <Worktask /> : <Navigate to={'/'} />}
        />
        <Route
          path='/admindashboard'
          element={user && user.role === 'Admin' ? <AdminDashboard /> : <Navigate to={'/'} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
