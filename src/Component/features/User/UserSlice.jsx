import { LineAxisOutlined } from "@mui/icons-material";
import { createAsyncThunk, current, createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import { signInSupplier } from "../Supplier/SupplierSlice";

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
// export const signInServer = createAsyncThunk(
//   "user-SignIn",
//   async (user, thunkApi) => {
//     try {
//       debugger
//       let { data } = await axios.post(
//         "https://localhost:7022/api/User/SignIn",
//         user
//       );
//       if (data) {
//         saveUserData(data);
//         // const decoded = jwtDecode(data); // פענוח הטוקן
//         // return {data,decoded};
//       } else {
//         signInSupplier(user);
//         console.log("User not found in main SignIn. Trying supplier SignIn...");
//       }
//     } catch (error) {
//       signInSupplier(user);
//       console.error("Error during User SignIn:", error);
//     }
//   }
// );
const saveUserData = (data) => {
  if (data && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("numOfGroup", data.numOfGroup);
    localStorage.setItem("numOfWaitingGroup", data.numOfWaitingGroup);
    localStorage.setItem("role", data.role);
  } else {
    console.error("⚠️ שגיאה: לא התקבל טוקן!", data);
  }
};

export const signInSupplier = createAsyncThunk(
  "supplier-SignIn",
  async (supplier, thunkApi) => {
    try {
      let { data } = await axios.post(
        "https://localhost:7022/api/Supplier/SignIn",
        supplier
      );
      if (data) {
        saveUserData(data);
        alert(
          `Hello "${data.name}"`,
        );
        return data;
      } else {
        console.log("⚠️ לא התקבל מידע על ספק", data);
        return thunkApi.rejectWithValue("ספק לא נמצא");
      }
    } catch (error) {
      const navigate=useNavigate();
      alert("אינך משתמש רשום עליך להירשם למערכת")
      navigate('/SignUp')
      console.error("❌ שגיאה בהתחברות ספק:", error);
      return thunkApi.rejectWithValue(error.response?.data || "שגיאת התחברות");
    }
  }
);

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
        alert(
          `Hello "${data.name}"`,
        );
        return data;
      } else {
        console.log("⚠️ משתמש לא נמצא, מנסה ספק...");
        return thunkApi.dispatch(signInSupplier(user));
      }
    } catch (error) {
      // const navigate=useNavigate();
      // alert("אינך משתמש רשום עליך להירשם למערכת")
      // navigate('/SignUp')
      console.error("❌ שגיאה בהתחברות משתמש:", error);
      return thunkApi.dispatch(signInSupplier(user));
    }
  }
);


//פונקציה שמחלצת את הנתונים מהטוקן
function parseJwt() {
  const t = localStorage.getItem("token");
  if (!t) {
    // console.error("No token found in localStorage");
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
    localStorage.setItem("role", data.role);
    localStorage.setItem("numOfCurrentGroups", data.numOfCurrentGroups);
    localStorage.setItem("numOfWaitingGroups", data.numOfWaitingGroups);
    return data;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: parseJwt() || null,
    // token: localStorage.getItem("token") || null,
    // numOfGroups: localStorage.getItem("numOfGroups") || null,
    // nupOfWaitingGroups: localStorage.getItem("numOfWaitingGroup") || null,
    token: null,
    numOfCurrentGroups: null,
    numOfWaitingGroups: null,
    name: localStorage.getItem("name") || "אורח",
    role: localStorage.getItem("role") || null,
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
      state.role = action.payload.role; // שמירת הטוקן בסטור
      state.numOfCurrentGroups=action.payload.numOfCurrentGroups;
      state.numOfWaitingGroups=action.payload.numOfWaitingGroups;
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