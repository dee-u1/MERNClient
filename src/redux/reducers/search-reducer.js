import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        word: '',
        option: ''
    },
    reducers: {
        setSearchCriteria: (state, action) => {
            state.word = action.payload.word;
            state.option = action.payload.option;
        },
        clearSearchCriteria: (state, action) => {
            state.word = '';
            state.option = '';
        },
    }
});

export const { setSearchCriteria, clearSearchCriteria } = searchSlice.actions;
export default searchSlice.reducer;