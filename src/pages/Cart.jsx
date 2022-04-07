import React, { useEffect, useState } from 'react'
import CartLine from '../components/CartLine'
import {useHistory} from 'react-router-dom'
import { auth} from '../config/Config'
const Cart = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(!user){
        history.push('/login');
      }
      else{
        setUser(user);
      }
    })
  })
  return (
    <div>
      <CartLine user = {user}/>
    </div>
  )
}

export default Cart