import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// תפקיד: להוסיף משתמש חדש למערכת
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
      });
  },
});

export default wantToOpenSlice.reducer;
