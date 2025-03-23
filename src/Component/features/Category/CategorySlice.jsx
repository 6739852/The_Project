import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState={
    categories: [], 
    status: 'idle', 
    error: null 
}

// קריאה נכונה עם try-catch וכתובת API תקינה
export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://localhost:7022/api/Category'); 
            if (!response.ok) throw new Error('Failed to fetch');
            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // fetchCategories: (state, action) => {
        //     fetch('http://localhost:7022/api/Category')
        //     .then(response => response.json())
        //     .then(data => {
        //         state.categories = data;
        //     })
        //     .catch(error => {
        //         console.error('Error fetching category', error);
        //     });
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});
export default categorySlice.reducer;
