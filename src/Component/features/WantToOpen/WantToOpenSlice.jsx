import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//פוקנציה שמקבלת ID של הצעה לקבוצת רכישה ומחזירה אותו
export const getFaveById = createAsyncThunk( 'wantToOpen/getFaveById',
  async (id) => {
    try {
      const response = await axios.get(`https://localhost:7022/api/WantToOpen/${id}`, {
      // params: { id: id },// שולח את ה-ID בפרמטרים של ה-URL
      });
      console.log(response.data)
      return response.data; // מחזיר את המידע שהתקבל מהשרת
      } catch (error) {
      return {}; // מחזיר null במקרה של שגיאה
    }
});

//פונקציה שמחזירה את כל ההצעות לקבוצות רכישה
export const suggestGroup = createAsyncThunk("user/WantToOpen", async (wantToOpen, thunkApi) => {
  const response = await fetch("https://localhost:7022/api/WantToOpen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wantToOpen),
  });
  if (!response.ok) {
    return thunkApi.rejectWithValue("שגיאה בשליחת הבקשה");
  }
  return response.json(); // החזרת הנתונים
});

export const wantToOpenSlice = createSlice({
  name: "wantToOpen",
  initialState: {
    currentUser: null,
    wantToOpens: [],
    wantToOpen:{},
    message: null,
    status: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(suggestGroup.fulfilled, (state, action) => {
        console.log("Parsed User Payload:", action.payload); // הצגת הנתונים בקונסול
        state.currentUser = action.payload; // שמירת הנתונים ב-Redux
        state.message = "הבקשה נשלחה בהצלחה";
        state.status = "success";
      })
      .addCase(suggestGroup.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "ישנה תקלה בשליחת הבקשה";
      })
      .addCase(suggestGroup.pending, (state) => {
        state.status = "loading";
        state.message = "שולח בקשה...";
      })
      .addCase(getFaveById.fulfilled, (state, action) => {
        console.log("Parsed User Payload:", action.payload); // הצגת הנתונים בקונסול
        state.wantToOpen = action.payload; // שמירת הנתונים ב-Redux
        state.message = "הבקשה נשלחה בהצלחה";
        state.status = "success";
      })
      .addCase(getFaveById.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload || "ישנה תקלה בשליחת הבקשה";
      })
      .addCase(getFaveById.pending, (state) => {
        state.status = "loading";
        state.message = "שולח בקשה...";
      });
  },
});
export default wantToOpenSlice.reducer;
