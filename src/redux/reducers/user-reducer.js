import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkUser = createAsyncThunk('user/checkUser', async (user) => {
  
  const params = {
    username: user.username,
    password : user.password
  };

  const response = await axios.get('/api/users',{ params } );
  return response.data;
});


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: '',
      isAdmin: false
    },
    loading: 'idle',
    currentRequestId: undefined,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user.username  = action.payload.username;
      state.user.isAdmin = action.payload.isAdmin;
    },
    logoutUser: (state) => {
      state.user.username = '';
      state.user.isAdmin = false;
    }
  },
  extraReducers: {
    [checkUser.pending]: (state, action) => {
      // if (state.loading === 'idle') {
      //   state.loading = 'pending'
      //   state.currentRequestId = action.meta.requestId
      // }
    },
    [checkUser.fullfilled]: (state, action) => {
      // console.log("action", action);
      // console.log("action.payload", action.payload)
      // const { requestId } = action.meta
      // if (state.loading === 'pending' && state.currentRequestId === requestId) {
      //   state.loading = 'idle'
      //   //state.entities.push(action.payload)
      //   state.user = action.payload;
      //   state.currentRequestId = undefined
      // }
      //alert('fulfilled!');
    },
    [checkUser.rejected]: (state, action) => {
      // const { requestId } = action.meta
      // if (state.loading === 'pending' && state.currentRequestId === requestId) {
      //   state.loading = 'idle'
      //   state.error = action.error
      //   state.currentRequestId = undefined
      // }
      alert("Error in checking user");
    }
  }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;