import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
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
    const [imageError, setImageError] = useState(false);
    
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
        <h2 className='text-2xl text-center mb-2 font-bold'>Available Books</h2>
        <hr className='mx-18' />
       </Suspense>
        {/* <h1>Books Component</h1> */}
        <Suspense fallback={<div className='text-center'>Loading...</div>}>

        <div className='flex flex-wrap justify-between space-y-1 px-18'>

        {
            books.map((book,idx) => {
                 if (idx < books.length - 1) {
                return(
                  <>
                  
                {/* <div ref={lastItemRef} key={book.id} className='p-3  w-1/4'>
                    <div className='p-3 border'>
                        <h2 className='text-center font-bold '>{book.volumeInfo.title.substr(0,50)}</h2>
                        <center style={{ maxHeight: '150px', overFlow: 'hidden' }}>
                            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                        </center>
                        <button className='p-3 border-o rounded bg-blue-500 text-white cursor-pointer' onClick={() => dispatch(AddToCart(book.id))}>Add to cart</button>
                    </div>
            </div>  */}

                  <article ref={lastItemRef} key={book.id} className=" w-1/2 p-3 sm:w-full md:w-full ">
      <div  className="flex flex-col sm:flex-row border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-white">
        <div className="relative w-full sm:w-48 h-64 sm:h-full bg-gray-100">
          <img
            src={imageError ? `https://via.placeholder.com/190x285/f3f4f6/303030?text=${encodeURIComponent(book.title)}`: book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            onError={() => setImageError(true)}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          />
          
        </div>
        
        <div className="flex-1 p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1 line-clamp-2">{book.volumeInfo.title.substr(0,50)}</h3>
            <p className="text-sm text-gray-600">{book.volumeInfo.authors}</p>
          </div>
          
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">{book.volumeInfo.description}</p>
          
          <div className="flex items-center justify-between mt-auto">
            {/* ISBN */}
            <span className="text-xs text-gray-500">Published in <b>{book.volumeInfo.publishedDate}</b></span>
            {/* ISBN: {book.volumeInfo?.industryIdentifiers[0].identifier} */}
            <button  onClick={() => dispatch(AddToCart(book.id))} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
                  </>
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