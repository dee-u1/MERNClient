import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('/api/books');
  return response.data;
});

export const fetchAvailableBooks = createAsyncThunk('books/fetchAvailableBooks', async () => {
  const response = await axios.get('/api/books/available');
  return response.data;
});

export const fetchStudentReservations = createAsyncThunk('books/fetchStudentReservations', async () => {
  const response = await axios.get('/api/books/studentreservations');
  return response.data;
});

export const fetchStudentReservationsInvididual = createAsyncThunk('books/fetchStudentReservationsInvididual', async (IDNum) => {
  const response = await axios.get(`/api/books/reservations/${IDNum}`);
  return response.data;
});

export const addNewReservations = createAsyncThunk('books/addNewReservations', async (books) => {
  const response = await axios.post('/api/books/reservations', books);
  return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const newBook = {
      ISBN: book.ISBN,
      title : book.title,
      author: book.author,
      edition: book.edition,
      publication: book.publication,
      reservedBy: ''
  };
  const response = await axios.post('/api/books', newBook);
    return response.data;
});

export const cancelReservedBook = createAsyncThunk('books/cancelReservedBook', async (book) => {
  //cannot pass an object in DELETE
  const response = await axios.delete(`/api/books/cancelreservations/${book.ISBN}&${book.IDNum}` );
  return response.data;
});

export const removeBook = createAsyncThunk('books/remove', async (id) => {
  const response = await axios.delete(`/api/books/${id}`);
  return response.data;
});

export const updateBook = createAsyncThunk('book/updateBook', async (book) => {
  const response = await axios.put(`/api/books/${book.ISBN}`, book)
  return response.data;
});

export const bookSlice = createSlice({
  name: 'libro',
  initialState: {
    books: [],
    allReservedBooks: []
  },
  reducers: {
    // fetchBooks: (state, action) => {
    //   state.books = action.payload;
    // }
    setBooks: (state, action) => {
      state.books = action.payload;
    }
  },
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      //alert('pending!');
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
    [fetchBooks.error]: (state, action) => {
      alert("Failed to get Books");
    },
    [fetchStudentReservations.fulfilled]: (state, action) => {
      state.allReservedBooks = action.payload;
    },
    [fetchStudentReservations.error]: (state, action) => {
      alert("Failed to get All Reserved Books");
    },
    [addBook.fulfilled]: (state, action) => {
      state.books = action.payload;
        //state.books = [action.payload.data, ...state.books];
    },
    [addBook.rejected]: (state, action) => {
      alert("Error on adding books");
    },
    [removeBook.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
    [removeBook.rejected]: (state, action) => {
      alert("Error on deleting book");
    },
    [updateBook.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
    [updateBook.rejected]: (state, action) => {
      alert("Error updating book");
    },
    [fetchStudentReservationsInvididual.fulfilled]: (state, action) => {
      state.allReservedBooks = action.payload;
    },
    [fetchStudentReservationsInvididual.error]: (state, action) => {
      alert("Failed to get All Reserved Books");
    },
    [addNewReservations.fulfilled]: (state, action) => {
      state.allReservedBooks = action.payload;
    },
    [addNewReservations.error]: (state, action) => {
      alert("Failed to save new reservations");
    },
    [cancelReservedBook.fulfilled]: (state, action) => {
      state.allReservedBooks = action.payload;
    },
    [cancelReservedBook.error]: (state, action) => {
      alert("Failed to cancel book reservation");
    },
    [fetchAvailableBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
    [fetchAvailableBooks.error]: (state, action) => {
      alert("Failed to get available Books");
    },
  }
});

export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;