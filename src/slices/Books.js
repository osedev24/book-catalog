import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const apiKey = import.meta.env.VITE_APP_API_KEY;
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (query) => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=wole&maxResults=10&key=AIzaSyAXVzoOrbcKnSAqhzXgQ78sPI0Y8PEkw48`
    )
    return  res.data.items;

  }
)

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
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
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.books = action.payload;
        });
}
});

export const {AddToCart} = bookSlice.actions;
export default bookSlice.reducer;

