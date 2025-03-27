import { Category } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//כל המשתנים שקשורים לקבוצות רכישה הקיימות
const initialState = {
  purchasingGroups: [], 
  //קבוצת רכישה ספציפית 
  purchasingGroupsId: [], 
  purchasingGroup: {
       },  
};

// פונקציה שמביאה את כל קבוצות הרכישה מהשרת
export const fetchPurchasingGroups = createAsyncThunk(
    'purchasingGroup/fetchPurchasingGroups',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://localhost:7022/api/PurchasingGroup');
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error fetching purchasing groups');
        }
    }
);
//פונקציה שמחזירה את הקבוצות רכישה של אותו משתמש
export const getPurchasingGroupsById = createAsyncThunk( 'purchasingGroups/fetchByUserId',
  async (id) => { 
    try {
      const response = await axios.get(`https://localhost:7022/api/Supplier/GetPurchasingGroup`, {
        params: { id: id }, // שולח את ה-ID בפרמטרים של ה-URL
      });
      return response.data; // מחזיר את המידע שהתקבל מהשרת
    } catch (error) {
      console.error("Error fetching purchasing groups:", error);
      return null; // מחזיר null במקרה של שגיאה
    }
  });
//פונקציות המטפלות בקבוצות רכישה
export const purchasingGroupSlice = createSlice({
    
    name: 'purchasingGroup',
    initialState,

    reducers:{
        updatePurchasingGroup(state, action) {
            const index = state.purchasingGroups.findIndex((purchasingGroup) => purchasingGroup.id === action.payload.id);
            if (index !== -1) {
            state.purchasingGroups[index] = action.payload;
            }
        },
        setPurchasingGroups(state, action) {
            state.purchasingGroups = action.payload;
        },
        fetchPurchasingGroups: (state, action) => {
            fetch('https://localhost:7022/api/PurchasingGroup')
            .then(response => response.json())
            .then(data => {
                state.purchasingGroups = data;
            })
            .catch(error => {
                console.error('Error fetching purchasing groups:', error);
            });
        }
    },
    extraReducers: (builder) => {builder.addCase(fetchPurchasingGroups.fulfilled, (state, action) => {
        state.purchasingGroups = action.payload;
    });
    builder.addCase(fetchPurchasingGroups.rejected, (state, action) => {
        state.purchasingGroups = [];
    }); 
    builder.addCase(fetchPurchasingGroups.pending, (state, action) => {
    });
    builder.addCase(getPurchasingGroupsById.fulfilled, (state, action) => {
        state.purchasingGroups = action.payload;
    });
    builder.addCase(getPurchasingGroupsById.rejected, (state, action) => {
        state.purchasingGroups = [];
    }); 
    builder.addCase(getPurchasingGroupsById.pending, (state, action) => {
    });
}}
);
//פונקציות המייצרות את הפעולות
export const { addPurchasingGroup, deletePurchasingGroup, updatePurchasingGroup } = purchasingGroupSlice.actions;
//פונקציות המחזירות את הקבוצות רכישה
export default purchasingGroupSlice.reducer;