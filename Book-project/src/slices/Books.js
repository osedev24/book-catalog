import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");

const apiKey = process.env.API_KEY;
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (query) => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=${apiKey}`
    )
    return res.data.items // array of books
  }
)

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
  },
  reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.books = action.payload;
        });
}
});

export const {} = bookSlice.actions;
export default bookSlice.reducer;

