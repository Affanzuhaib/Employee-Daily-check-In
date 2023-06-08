import React, { useContext, useEffect } from 'react'
import UserContext from '../features/userContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const user = useContext(UserContext);
    //   console.log(user);
      
      const navigate = useNavigate()
    
      useEffect(() => {
        if(!user){
            navigate('/')
          }
      }, [user])
  return (
    <div>Dashboard <button onClick={() => localStorage.removeItem('user')}>logout</button></div>
  )
}

export default Dashboard
