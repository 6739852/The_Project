import { LineAxisOutlined } from "@mui/icons-material";
import { createAsyncThunk, current, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const signInSupplier = createAsyncThunk(
  "supplier-SignIn",
  async (supplier, thunkApi) => {
    debugger;
    try {
      let { data } = await axios.post(
        "https://localhost:7022/api/Supplier/SignIn",
        supplier
      );
      console.log(data);
      if (data) {
        localStorage.setItem("token", data.token);
      } else {
        console.log("Token not received:", data);
      }
      return data;
    } catch (error) {
      console.error("Error during SignIn:", error);
      throw error;
    }
  }
);
//פונקציה שמחלצת את הנתונים מהטוקן
function parseJwt() {
  const t = localStorage.getItem("token");
  if (!t) {
    console.error("No token found in localStorage");
    return null;
  }

  try {
    const base64Url = t.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}

//תפקיד: להוציא את המשתמש שיצא מהמערכת
// export const logout = createAsyncThunk("supplier/logout", async () => {
//   const response = await fetch("http://localhost:5173/user/logout");
//   if (response.ok) {
//     return null;
//   }
// });

// תפקיד: להוסיף משתמש חדש למערכת
export const registerSupplier = createAsyncThunk("supplier/register", async (user, thunkApi) => {
  const response = await fetch("https://localhost:7022/api/User/SignUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
});

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    currentUser: parseJwt() || null,
    token: localStorage.getItem("token") || null,
    status: null,
    groups: [],
    message: null,
  },
  reducers: {
  },

extraReducers: (builder) => {
    builder.addCase(signInSupplier.fulfilled, (state, action) => {
      state.token = action.payload.token; // שמירת הטוקן בסטור
      // state.currentUser = parseJwt(); // חילוץ המשתמש מהטוקן ושמירתו
      const payload = parseJwt(); // חילוץ הנתונים מהטוקן
      console.log("Parsed Supplier Payload:", payload); // ודאי שהפענוח עובד
      state.currentUser = payload; // שמירת הנתונים ב-Redux
      state.message = "התחברת בהצלחה";
      state.status = "success";
    }).addCase(signInSupplier.rejected, (state, action) => {
      state.status = "failed";
      state.message = "ישנה תקלה בהתחברות";
    }).addCase(signInSupplier.pending, (state, action) => {
      state.status = "loading";
      state.message = "מתבצעת התחברות";
    }).addCase(registerSupplier.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.message = "התחברת בהצלחה";
      state.status = "success";
    }).addCase(registerSupplier.rejected, (state, action) => {
      state.status = "failed";
      state.message = "ישנה תקלה בהתחברות";
    }).addCase(registerSupplier.pending, (state, action) => {
      state.status = "loading";
      state.message = "מתבצעת התחברות";
    })
  } 
});

export const { login } = supplierSlice.actions
export default supplierSlice.reducer