import React, { lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, CountCart, fetchBooks } from '../slices/Books'
// import CartIcon from './CartIcon'

const CartIcon = lazy(() => import('./CartIcon'));
const Books = () => {
    const dispatch = useDispatch()
    const { books, loading, error, hasMore, query, pageSize } = useSelector((state) => state.books);
    const cartCount = useSelector((state) => state.books.cartCount);
    
    // sentinel ref for intersection observer
    const observerRef = useRef(null);
    
    useEffect(() => {
         if (books.length === 0) {
      dispatch(fetchBooks({ query: 'a', startIndex: 0 }));
    }
        // dispatch(fetchBooks('a'))
        dispatch(CountCart());
        
    }, [dispatch])

    // callback for intersection observer
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (!hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // startIndex = current length
          const startIndex = books.length;
          dispatch(fetchBooks({ query, startIndex }));
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, books.length, dispatch, query]
  );
  return (
      <div>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
       <CartIcon />
       </Suspense>
        {/* <h1>Books Component</h1> */}
        <Suspense fallback={<div className='text-center'>Loading...</div>}>

        <div className='flex flex-wrap justify-between space-y-1'>

        {
            books.map((book,idx) => {
                 if (idx < books.length - 1) {
                return(
                <div ref={lastItemRef} key={book.id} className='p-3  w-1/4'>
                    <div className='p-3 border'>
                        <h2 className='text-center font-bold '>{book.volumeInfo.title.substr(0,50)}</h2>
                        <center style={{ maxHeight: '150px', overFlow: 'hidden' }}>
                            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                        </center>
                        <button className='p-3 border-o rounded bg-blue-500 text-white cursor-pointer' onClick={() => dispatch(AddToCart(book.id))}>Add to cart</button>
                    </div>
            </div> 
                )
            }
        } )
            }
        </div>
    </Suspense>
     {loading && <p className="mt-4">Loading...</p>}
      {!hasMore && <p className="mt-4 text-gray-500">No more results</p>}
      {error && <p className="text-red-500">Error: {String(error)}</p>}
    </div>
  )
}

export default Books