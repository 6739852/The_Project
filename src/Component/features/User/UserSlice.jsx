import { LineAxisOutlined } from "@mui/icons-material";
import { createAsyncThunk, current, createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";
import axios from 'axios';


// תפקיד: להכניס את המשתמש שנכנס למערכת
// export const signInServer = createAsyncThunk("user/login", async (user, thunkApi) => {
//   const response = await fetch("https://localhost:7022/api/User/SignIn", {
//     // : "include", // חובה כדי לשלוח ולהחזיר Cookies
//     method: "POST",
//     headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(user),
//   });
//   if (response.ok) {
//      const data = await response.json();
//      console.log("data",data)
//      return data;
//   }

//     // let {data}=await axios.post("https://localhost:7022/api/User/SignIn",user)
//     // console.log("data",data)
//     // return data
// });

// export const signInServer = createAsyncThunk(
//   "user-SignIn",
//   async (user, thunkApi) => {
//     try {
//       let { data } = await axios.post(
//         "https://localhost:7022/api/User/SignIn",
//         user
//       );
//       console.log(data);
//       if (data) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("name", data.name);
//         localStorage.setItem("numOfGroup", data.numOfGroup);
//         localStorage.setItem("numOfWaitingGroup", data.numOfWaitingGroup);
//         localStorage.setItem("role", data.role);
//       } else {
//         console.log("Token not received:", data);
//       }
//       return data;
//     } catch (error) {
//       console.error("Error during SignIn:", error);
//       throw error;
//     }
//   }
// );
export const signInServer = createAsyncThunk(
  "user-SignIn",
  async (user, thunkApi) => {
    try {
      let { data } = await axios.post(
        "https://localhost:7022/api/User/SignIn",
        user
      );

      if (data) {
        saveUserData(data);
        // const decoded = jwtDecode(data); // פענוח הטוקן
        // return {data,decoded};
      } else {
        console.log("User not found in main SignIn. Trying supplier SignIn...");
      }
    } catch (error) {
      console.error("Error during User SignIn:", error);
    }

    // ניסיון נוסף עבור ספקים אם הכניסה הרגילה נכשלה
    try {
      let { data } = await axios.post(
        "https://localhost:7022/api/Supplier/SignIn",
        user
      );

      if (data) {
        saveUserData(data);
        return data;
      } else {
        console.log("Supplier not found either.");
        return thunkApi.rejectWithValue("User or Supplier not found");
      }
    } catch (error) {
      console.error("Error during Supplier SignIn:", error);
      return thunkApi.rejectWithValue("Error during SignIn process");
    }
  }
);

// פונקציה לשמירת הנתונים ב-localStorage
const saveUserData = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("name", data.name);
  localStorage.setItem("numOfGroup", data.numOfGroup);
  localStorage.setItem("numOfWaitingGroup", data.numOfWaitingGroup);
  localStorage.setItem("role", data.role);
};

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
// function parseJwt(token) {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );
//   return JSON.parse(jsonPayload);
// }

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
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("numOfGroup", data.numOfGroup);
    localStorage.setItem("numOfWaitingGroup", data.numOfWaitingGroup);
    return data;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: parseJwt() || null,
    token: localStorage.getItem("token") || null,
    numOfGroups: localStorage.getItem("numOfGroups") || null,
    nupOfWaitingGroups: localStorage.getItem("numOfWaitingGroup") || null,
    name: localStorage.getItem("name") || "אורח",
    waitingGroup: [],
    status: null,
    groups: [],
    message: null,
  },
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(signInServer.fulfilled, (state, action) => {
      state.token = action.payload.token; // שמירת הטוקן בסטור
      const payload = parseJwt(); // חילוץ הנתונים מהטוקן
      console.log("Parsed User Payload:", payload); // ודאי שהפענוח עובד
      state.currentUser = payload; // שמירת הנתונים ב-Redux
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