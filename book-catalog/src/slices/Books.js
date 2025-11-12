import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, startIndex = 0 }, { rejectWithValue }) => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=10&key=${apiKey}`
    )
    return {
        items: res.data.items || [],
        query,
        startIndex,
      };
  }
)

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    cartCount: 0,
    loading: false,
    error: null,
    hasMore: true,       // whether more pages exist
    pageSize: 10,     // number of items per page
  },
  reducers: {

      AddToCart: (state, action) => {
          const Cart = localStorage.getItem('booksCart') ? JSON.parse(localStorage.getItem('booksCart')) : [];
          //Check if book already in cart
          if(Cart.find((item) => item.id === action.payload)) {
           alert('Book already in cart');
            return;
          }
          Cart.push({'id': action.payload}); 
          localStorage.setItem('booksCart', JSON.stringify(Cart));
          state.cart = Cart;
          state.cartCount = Cart.length; 
          alert('Book added to cart');
      },
      RemoveFromCart: (state, action) => {
          const Cart = localStorage.getItem('booksCart') ? JSON.parse(localStorage.getItem('booksCart')) : [];
          const updatedCart = Cart.filter((item) => item.id !== action.payload); 
          localStorage.setItem('booksCart', JSON.stringify(updatedCart));
          state.cart = updatedCart;
          state.cartCount = updatedCart.length; 
      },
      CountCart: (state, action) => {
          const Cart = localStorage.getItem('booksCart') ? JSON.parse(localStorage.getItem('booksCart')) : [];
          state.cartCount = Cart.length;
      },
      resetBooksForQuery: (state, action) => {
      state.query = action.payload;
      state.books = [];
      state.loading = false;
      state.error = null;
      state.hasMore = true;
    },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        const { items } = action.payload;
        // append items
        state.books = [...state.books, ...items];

        // If returned less than pageSize, no more pages
        if (items.length < state.pageSize) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
      })
}
});

export const {AddToCart, CountCart, resetBooksForQuery, RemoveFromCart} = bookSlice.actions;
export default bookSlice.reducer;

