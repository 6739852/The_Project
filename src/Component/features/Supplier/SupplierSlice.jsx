import { LineAxisOutlined } from "@mui/icons-material";
import { createAsyncThunk, current, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

//פונקציה ששומרת את הדאטה בלוקלסטוראג
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

//פונקציה של התחברות ספק
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
        alert("אינך משתמש רשום עליך להירשם למערכת")
        // return thunkApi.rejectWithValue("ספק לא נמצא");
      }
    } catch (error) {
      alert("אינך משתמש רשום עליך להירשם למערכת")
      console.error("❌ שגיאה בהתחברות ספק:", error);
      return thunkApi.rejectWithValue(error.response?.data || "שגיאת התחברות");
    }
  }
);

// //פונקציה של התחברות ספק
// export const signInSupplier = createAsyncThunk(
//   "supplier-SignIn",
//   async (supplier, thunkApi) => {
//     try {
//       let { data } = await axios.post(
//         "https://localhost:7022/api/Supplier/SignIn",
//         supplier
//       );
//       console.log(data);
//       if (data) {
//         // localStorage.setItem("token", data.token);
//         saveUserData(data);
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

//תפקיד: להוציא את המשתמש שיצא מהמערכת
// export const logout = createAsyncThunk("supplier/logout", async () => {
//   const response = await fetch("http://localhost:5173/user/logout");
//   if (response.ok) {
//     return null;
//   }
// });

//פונקציה של הוסםפת קבוצת רכישה
export const addPurchasingGroup = createAsyncThunk("user/PurchasingGroup", async (purchasingGroup, thunkApi) => {
  const response = await fetch("https://localhost:7022/api/PurchasingGroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchasingGroup),
  });

  if (!response.ok) {
    return thunkApi.rejectWithValue("שגיאה בשליחת הבקשה");
  }
  return response.json(); 
});

// תפקיד: להוסיף משתמש חדש למערכת
export const registerSupplier = createAsyncThunk("supplier/register", async (supplier, thunkApi) => {
  debugger
  const response = await fetch("https://localhost:7022/api/Supplier/SignUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("numOfGroup", data.numOfGroup);
    localStorage.setItem("numOfWaitingGroup", data.numOfWaitingGroup);
    localStorage.setItem("role", data.role);
    return data;
  }
});

//פונקציה שמחזירה את רשימת הספקים
export const getSupplierList = createAsyncThunk('purchasingGroupOne/getSupplierList',
  async () => {
    try {
      const response = await axios.get(`https://localhost:7022/api/Supplier`, {
      });
      console.log(response.data)
      return response.data; // מחזיר את המידע שהתקבל מהשרת
    } catch (error) {
      return {}; // מחזיר null במקרה של שגיאה
    }
  });

//פונקציה שמחזירה ספק לפי ID
export const getSupplierById = createAsyncThunk('SupplierOne/getSupplierById',
  async (id) => {
    try {
      const response = await axios.get(`https://localhost:7022/api/Supplier/${id}`, {
        params: { id: id },
      });
      console.log(response.data)
      return response.data; 
    } catch (error) {
      return {}; 
    }
  });

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    supplierList: [],
    currentUser: parseJwt() || null,
    token: null,
    numOfCurrentGroups: null,
    numOfWaitingGroups: null,
    status: null,
    groups: [],
    message: null,
    supplierOne: {}
  },
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(signInSupplier.fulfilled, (state, action) => {
      state.token = action.payload.token; 
      state.role = action.payload.role;
      state.numOfCurrentGroups=action.payload.numOfCurrentGroups;
      state.numOfWaitingGroups=action.payload.numOfWaitingGroups;
      const payload = parseJwt();
      console.log("Parsed Supplier Payload:", payload); 
      state.currentUser = payload;
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
    }).addCase(getSupplierList.fulfilled, (state, action) => {
      state.supplierList = action.payload;
      state.message = "התחברת בהצלחה";
      state.status = "success";
    }).addCase(getSupplierList.rejected, (state, action) => {
      state.status = "failed";
      state.message = "ישנה תקלה בהתחברות";
    }).addCase(getSupplierList.pending, (state, action) => {
      state.status = "loading";
      state.message = "מתבצעת התחברות";
    }).addCase(getSupplierById.fulfilled, (state, action) => {
      state.supplierOne = action.payload;
      state.message = "התחברת בהצלחה";
      state.status = "success";
    }).addCase(getSupplierById.rejected, (state, action) => {
      state.status = "failed";
      state.message = "ישנה תקלה בהתחברות";
    }).addCase(getSupplierById.pending, (state, action) => {
      state.status = "loading";
      state.message = "מתבצעת התחברות";
    })
  }
});
export const { login } = supplierSlice.actions
export default supplierSlice.reducer