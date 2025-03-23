import { LineAxisOutlined } from "@mui/icons-material";
import { createAsyncThunk, current, createSlice } from "@reduxjs/toolkit";

//תפקיד: להכניס את המשתמש שנכנס למערכת
export const signInServer = createAsyncThunk("user/login", async (user, thunkApi) => {
  const response = await fetch("https://localhost:7022/api/User/SignIn", {
    // : "include", // חובה כדי לשלוח ולהחזיר Cookies
    method: "POST",
    headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(user),
  });
  if (response.ok) {
     const data = await response.json();
     console.log("data",data)
     return data;
  }

    // let {data}=await axios.post("https://localhost:7022/api/User/SignIn",user)
    // console.log("data",data)
    // return data
});

//תפקיד: להוציא את המשתמש שיצא מהמערכת
// export const logout = createAsyncThunk("user/logout", async () => {
//   const response = await fetch("http://localhost:5173/user/logout");
//   if (response.ok) {
//     return null;
//   }
// });

// תפקיד: להוסיף משתמש חדש למערכת
export const register = createAsyncThunk("user/register", async (user, thunkApi) => {
  const response = await fetch("https://localhost:7022/api/User/SignUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
});

export const userSlice = createSlice({
  initialState: {
    currentUser: null,
  },
  name: 'user',
  status: null,
  groups: [],
  message: null,
  token: null,
  reducers: {
  },

extraReducers: (builder) => {
    builder.addCase(signInServer.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.message = "התחברת בהצלחה";
      state.status = "success";
    }).addCase(signInServer.rejected, (state, action) => {
      state.status = "failed";
      state.message = "ישנה תקלה בהתחברות";
    }).addCase(signInServer.pending, (state, action) => {
      state.status = "loading";
      state.message = "מתבצעת התחברות";
    }).addCase(register.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.message = "התחברת בהצלחה";
      state.status = "success";
    }).addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.message = "ישנה תקלה בהתחברות";
    }).addCase(register.pending, (state, action) => {
      state.status = "loading";
      state.message = "מתבצעת התחברות";
    })
  } 
});

export const { login } = userSlice.actions
export default userSlice.reducer