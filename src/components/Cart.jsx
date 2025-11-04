import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Cart = () => {
  const cart = localStorage.getItem('booksCart') ? JSON.parse(localStorage.getItem('booksCart')) : [];
  const [cartBooks, setcartBooks] = useState([])
  const RemoveFromCart = (id) => {
      const updatedCart = cart.filter((item) => item.id !== id);
      localStorage.setItem('booksCart', JSON.stringify(updatedCart));
      setcartBooks(cartBooks.filter((book) => book.id !== id));
  }
  const fetchCartBooks = async () => {
    const results = await Promise.all(
        cart.map(async (item) => {
          const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${item.id}?key=AIzaSyAXVzoOrbcKnSAqhzXgQ78sPI0Y8PEkw48`
          );
          return res.data;
        })
      );
      setcartBooks(results);
    };
    useEffect(() => {
      fetchCartBooks();
    }, []);
  return (
    <div>
      <div className='p-3 flex justify-between w-4/5 mx-auto'>
        <div className='w-2/3'>
          <h1 className='font-bold text-lg'>My Cart</h1>
           {cartBooks.map((book) => (
          <div key={book.id} className="p-3 border border-blue-500 rounded mb-2 flex">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-20 h-auto mr-4"
            />
            <div className='w-1/1'>
              <h2 className="font-semibold">{book.volumeInfo.title}</h2>
              <p className='mt-3'>by <b>{book.volumeInfo.authors?.join(", ")}</b></p>
              <p className="text-sm mb-3 mt-3">
               Published on <b>{book.volumeInfo.publishedDate}</b>
              </p>
              <div className='float-end text-red-800 cursor-pointer' onClick={()=>{RemoveFromCart(book.id)}}>Remove</div>
            </div>
          </div>
        ))}

        {cartBooks.length === 0 && <p>No items in cart</p>}
        </div>
        <div className='shadow p-3 w-1/5 mb-3 mt-10 h-full'>
          <h2 className='font-bold text-lg mb-3'>Cart Summary</h2>
          <div className='mb-5 p-3'>
              <p className='mb-5'>Total items: <b>{cartBooks.length}</b></p>

              <button className='bg-blue-600 p-3 cursor-pointer w-full rounded-2xl text-white' onClick={()=>{alert('This is currently unavailable!')}}>Buy</button>
          </div>
        </div>
                
      </div>
                
    </div>
  )
}

export default Cart