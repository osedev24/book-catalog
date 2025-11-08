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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.books = action.payload;
        });
}
});

export const {} = bookSlice.actions;
export default bookSlice.reducer;

