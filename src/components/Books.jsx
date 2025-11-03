import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../slices/Books'

const Books = () => {
    const dispatch = useDispatch()
    const book = useSelector((state) => state.books.books)

    
    useEffect(() => {
        dispatch(fetchBooks('soyinka'))
        
    }, [dispatch])
  return (
    <div>
        <h1>Books Component</h1>
        <div className='flex bg-amber-400'>

        {
            book.map((book) => (
                <div key={book.id} className='m-3 p-3 border w-1/3'>
                <h2>{book.volumeInfo.title}</h2>
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            </div>
                ) )
            }
        </div>
    </div>
  )
}

export default Books