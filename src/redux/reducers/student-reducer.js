import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get('/api/students');
  return response.data;
});

export const checkStudentAccount = createAsyncThunk('students/checkStudentAccount', async (user) => {
  
  const params = {
    username: user.username,
    password : user.password
  };

  const response = await axios.get('/api/students/checkaccount',{ params } );
  return response.data;
});

export const addStudent = createAsyncThunk('student/addStudent', async (student) => {
  const newStudent = {
        IDNum: student.IDNum,
        firstName: student.firstName,
        lastName: student.lastName,
        userName: student.userName,
        password: student.password,
  };

  const response = await axios.post('/api/students', newStudent);
    return response.data;
});

export const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    IDNum: '',
    firstName: '',
    lastName: ''
  },
  reducers: {
    setStudentData: (state, action) => {
      //console.log(action.payload);
      //alert(action.payload.IDNum);
      state.IDNum = action.payload.IDNum;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    logOutStudent: (state) => {
      state.IDNum = '';
      state.firstName = '';
      state.lastName = '';
    }
  },
  extraReducers: {
    [fetchStudents.pending]: (state, action) => {
      //alert('pending!');
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.students = action.payload;
    },
    [fetchStudents.error]: (state, action) => {
      alert("Failed to get Students");
    },
    [checkStudentAccount.fulfilled]: (state, action) => {
      state.IDNum = action.payload.IDNum;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    [checkStudentAccount.error]: (state, action) => {
      alert("Failed to verify student account");
    },
  }
});

export const { setStudentData, logOutStudent } = studentSlice.actions;
export default studentSlice.reducer;