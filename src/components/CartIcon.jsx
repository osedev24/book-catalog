import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CountCart } from '../slices/Books';
import { Link } from 'react-router-dom';

const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector((state) => state.books.cartCount);
    
    useEffect(() => {
        dispatch(CountCart());
    }, [dispatch])
  return (
    <div>
         <div className='float-end p-2'>
          <Link to="/cart">
        <i className="fas fa-shopping-cart  text-2xl" >
        </i>
        <b className='bg-blue-500 text-white rounded-4xl p-1'>({cartCount})</b>
          </Link>
        </div>
        <div className="clear-both"></div>
    </div>
  )
}

export default CartIcon