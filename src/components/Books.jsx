import React, { lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, CountCart, fetchBooks } from '../slices/Books'
// import CartIcon from './CartIcon'

const CartIcon = lazy(() => import('./CartIcon'));
const Books = () => {
    const dispatch = useDispatch()
    const book = useSelector((state) => state.books.books)
    const cartCount = useSelector((state) => state.books.cartCount);
    
    useEffect(() => {
        dispatch(fetchBooks('a'))
        dispatch(CountCart());
        
    }, [dispatch])
  return (
      <div>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
       <CartIcon />
       </Suspense>
        {/* <h1>Books Component</h1> */}
        <Suspense fallback={<div className='text-center'>Loading...</div>}>

        <div className='flex flex-wrap justify-between space-y-1'>

        {
            book.map((book) => (
                <div key={book.id} className='p-3  w-1/4'>
                    <div className='p-3 border'>

                        <h2>{book.volumeInfo.title}</h2>
                        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                        <button className='p-3 border-o rounded bg-blue-500 text-white cursor-pointer' onClick={() => dispatch(AddToCart(book.id))}>Add to cart</button>
                    </div>
            </div>
                ) )
            }
        </div>
    </Suspense>
    </div>
  )
}

export default Books