import React, { useState } from 'react';
import { TextField, Button, Container, Box, MenuItem, Select, FormControl, InputLabel,InputAdornment} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


const addUserToGroup = async (groupId, userId) => {
  try {
      const response = await fetch(`https://localhost:7022/api/PurchasingGroup/${groupId}/add-user/${userId}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
      });

      const data = await response.json();
      if (response.ok) {
          alert("User added successfully");
      } else {
          alert("Failed to add user: " + data.message);
      }
  } catch (error) {
      console.error("Error adding user:", error);
  }
};
//פונקציה שמחלצת את הנתונים מהטוקן
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1]; // לוקח את החלק האמצעי של ה-JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // מתקנן תווים
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload); // מחזיר אובייקט JSON עם הנתונים
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}


export default function Join() {

  const location = useLocation();
  const productId = location.state?.productId; 

  const token=localStorage.getItem("token");
  const parsedData = parseJwt(token);

  const userId = parsedData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  console.log("User ID:", userId);


  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserToGroup(userId, productId)
    alert("you joined seccssefully!")
    navigate('/Cart')
  };

  return (
    <Container maxWidth="xs">
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          mt: 4 
        }}
      >
        <h1>hi, you are happpy you selected to join us😁</h1>
        <TextField
          fullWidth
          name="firstName"
          label="שם פרטי"
          variant="outlined"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          name="lastName"
          label="שם משפחה"
          variant="outlined"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          name="email"
          label="דוא״ל"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel>מספר טלפון</InputLabel>
          <Select
            name="phonePrefix"
            label="מספר טלפון"
            defaultValue="+972"
            startAdornment={<InputAdornment position="start">+972</InputAdornment>}
          >
            <MenuItem value="+972">ישראל</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          name="phone"
          label="מספר טלפון"
          type="tel"
          variant="outlined"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          name="password"
          label="סיסמה"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          name="confirmPassword"
          label="אימות סיסמה"
          type="password"
          variant="outlined"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ 
            py: 1.5,
            backgroundColor: '#0077cc',
            '&:hover': {
              backgroundColor: '#005fa3'
            }
          }}
        >
          join
        </Button>
      </Box>
    </Container>
  );
}