import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user-reducer';
import bookReducer from './reducers/book-reducer';
import searchReducer from './reducers/search-reducer';
import studentReducer from './reducers/student-reducer';

export default configureStore({
  reducer: {
    user: userReducer,
    libro: bookReducer,
    search: searchReducer,
    students: studentReducer,
  },
});
