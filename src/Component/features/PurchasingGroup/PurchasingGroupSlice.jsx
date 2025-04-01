import { Category } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//כל המשתנים שקשורים לקבוצות רכישה הקיימות
const initialState = {
  purchasingGroups: [],
  purchasingGroupsId: [], 
  purchasingGroupOne: {},  
  purchasingGroupFave: [],  
  RankPurchasingGroup: [], 
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
        params: { id: id },// שולח את ה-ID בפרמטרים של ה-URL
      });
      console.log(response.data)
      return response.data; // מחזיר את המידע שהתקבל מהשרת
    } catch (error) {
      return []; // מחזיר null במקרה של שגיאה
    }
  });
//פונקציה שמחזירה את הקבוצות רכישה של אותו משתמש שהוא משתמש בהם
  export const getPurchasingGroupsByIdUser = createAsyncThunk( 'purchasingGroups/fetchByUserId',
    async (id) => { 
      try {
        const response = await axios.get(`https://localhost:7022/api/User/GetPurchasingGroup`, {
          params: { id: id },// שולח את ה-ID בפרמטרים של ה-URL
        });
        console.log(response.data)
        return response.data; // מחזיר את המידע שהתקבל מהשרת
      } catch (error) {
        return []; // מחזיר null במקרה של שגיאה
      }
    });
  //פונקציה שמביאה את כל הקבוצות שמחכות במועדפים
  export const getFave = createAsyncThunk( 'purchasingGroups/fetchFave',
    async (id) => { 
      try {
        const response = await axios.get(`https://localhost:7022/api/Supplier/GetWantToOpen`, {
          params: { id: id },// שולח את ה-ID בפרמטרים של ה-URL
        });
        console.log(response.data)
        return response.data; // מחזיר את המידע שהתקבל מהשרת
      } catch (error) {
        return []; // מחזיר null במקרה של שגיאה
      }
    });
  //פונקציה שמביאה את כל הקבוצות שמחכות במועדפים לפי משתמש
  export const getFaveUser = createAsyncThunk( 'purchasingGroups/getFaveUser',
    async (id) => { 
      try {
        const response = await axios.get(`https://localhost:7022/api/User/GetWantToOpen`, {
          params: { id: id },// שולח את ה-ID בפרמטרים של ה-URL
        });
        console.log(response.data)
        return response.data; // מחזיר את המידע שהתקבל מהשרת
      } catch (error) {
        return []; // מחזיר null במקרה של שגיאה
      }
    });
//פונקציה שמעדכנת את הנתונים של הקבוצת רכישה

//פונקציה שמקבלת ID של מוצר ומחזירה אותו
export const getGroupById = createAsyncThunk( 'purchasingGroupOne/getGroupById',
      async (id) => { 
        try {
          const response = await axios.get(`https://localhost:7022/api/PurchasingGroup/${id}`, {
            params: { id: id },// שולח את ה-ID בפרמטרים של ה-URL
          });
          console.log(response.data)
          return response.data; // מחזיר את המידע שהתקבל מהשרת
        } catch (error) {
          return {}; // מחזיר null במקרה של שגיאה
        }
      });
//פונקציה שמוסיפה ניקוד לקבוצת רכישה      
const API_BASE_URL = 'https://localhost:7022/api/PurchasingGroup'; 
export const addScope = async (id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/AddScope/${id}`);
        console.log('Scope updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating scope:', error.response?.data || error.message);
        throw error;
    }
};
//פונקציה שמחזירה קבוצות רכישה לפי קטגוריות
// export const getGroupByIdGroup = async (id) => {
//   try {
//       const response = await axios.get(`https://localhost:7022/api/PurchasingGroup/category/${id}`);
//       console.log('Data fetched successfully:', response.data);
//       return response.data;
//   } catch (error) {
//       console.error('Error fetching data:', error.response?.data || error.message);
//       throw error;
//   }
// };
//פונקציה שמחזירה את הקבוצות רכישה לפי קטגוריה
export const getGroupByIdGroup = createAsyncThunk( 'purchasingGroups/getGroupByIdGroup',
  async (id) => { 
    try {
      const response = await axios.get(`https://localhost:7022/api/PurchasingGroup/category/${id}`, {
        params: { id: id },// שולח את ה-ID בפרמטרים של ה-URL
      });
      console.log(response.data)
      return response.data; // מחזיר את המידע שהתקבל מהשרת
    } catch (error) {
      return {}; // מחזיר null במקרה של שגיאה
    }
  });
//פונקציה שמחזירה מהשרת את הקבוצות רכישה לפי חיפוש של מה שמוכל בשם או בתאור 
  export const searchProducts = createAsyncThunk(
    "purchasingGroups/searchProducts",
    async (searchQuery) => {
      const response = await fetch(`https://localhost:7022/api/PurchasingGroup/search?query=${searchQuery}`);
      if (!response.ok) throw new Error("לא נמצאו תוצאות");
      return await response.json();
    }
  );
  //פונקציה שמחזירה את הקבוצות רכישה שנסגרות היום
  export const GetGroupsClosingToday = createAsyncThunk(
    "purchasingGroups/GetGroupsClosingToday",
    async () => {
      debugger
      const response = await fetch(`https://localhost:7022/api/PurchasingGroup/closing-today`);
      if (!response.ok) throw new Error("לא נמצאו תוצאות");
      return await response.json();
    }
  );
  
//פונקציה שמחזירה את הקבוצה מספר X מבחינת הניקוד
export const getPurchaseGroupByRank = async (rank) => {
  try {
    const response = await axios.get(`https://localhost:7022/api/PurchasingGroup/rank/${rank}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching group:", error);
  }
};

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
        state.purchasingGroupsId = action.payload;
    });
    builder.addCase(getPurchasingGroupsById.rejected, (state, action) => {
        state.purchasingGroupsId = [];
    }); 
    builder.addCase(getPurchasingGroupsById.pending, (state, action) => {
    });
    builder.addCase(getFave.fulfilled, (state, action) => {
        state.purchasingGroupFave = action.payload;
    });
    builder.addCase(getFave.rejected, (state, action) => {
        state.purchasingGroupFave = [];
    }); 
    builder.addCase(getFave.pending, (state, action) => {
    });
    builder.addCase(getFaveUser.fulfilled, (state, action) => {
        state.purchasingGroupFave = action.payload;
    });
    builder.addCase(getFaveUser.rejected, (state, action) => {
        state.purchasingGroupFave = [];
    }); 
    builder.addCase(getFaveUser.pending, (state, action) => {
    });
    builder.addCase(getGroupById.fulfilled, (state, action) => {
      state.purchasingGroupOne = action.payload;
    });
    builder.addCase(getGroupById.rejected, (state, action) => {
      state.purchasingGroupOne = {};
    }); 
    builder.addCase(getGroupById.pending, (state, action) => {
    });
    builder.addCase(getGroupByIdGroup.fulfilled, (state, action) => {
      state.purchasingGroups = action.payload;
    });
    builder.addCase(getGroupByIdGroup.rejected, (state, action) => {
      state.purchasingGroups = [];
    }); 
    builder.addCase(getGroupByIdGroup.pending, (state, action) => {
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.purchasingGroups = action.payload;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.purchasingGroups = [];
    }); 
    builder.addCase(searchProducts.pending, (state, action) => {
    });
    builder.addCase(GetGroupsClosingToday.fulfilled, (state, action) => {
      state.purchasingGroups = action.payload;
    });
    builder.addCase(GetGroupsClosingToday.rejected, (state, action) => {
      state.purchasingGroups = [];
    }); 
    builder.addCase(GetGroupsClosingToday.pending, (state, action) => {
    });
  }}
);
//פונקציות המייצרות את הפעולות
export const { addPurchasingGroup, deletePurchasingGroup, updatePurchasingGroup } = purchasingGroupSlice.actions;
//פונקציות המחזירות את הקבוצות רכישה
export default purchasingGroupSlice.reducer;