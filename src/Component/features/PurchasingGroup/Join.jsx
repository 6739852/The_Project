import React, { useState } from 'react';
import { TextField, Button, Container, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}

export default function Join() {
  const location = useLocation();
  const productId = location.state?.productId; 
  const token = localStorage.getItem("token");
  const parsedData = parseJwt(token);
  const userId = parsedData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    countryCode: '+972',
  });

  //פונקציה שצעדכנת את הנתונים מהטופס
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  //פונקציה של שליחת הטופס
  const handleSubmit = (e) => {
    e.preventDefault();
    addUserToGroup(userId, productId);
    alert("you joined successfully!");
    navigate('/Cart');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: "24vh" }}>
      <Box sx={{ backgroundColor: '#ffffff', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <h3 style={{ margin: 0, color: '#505050' }}> שמחים שבחרת להצטרף אלינו</h3>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField fullWidth name="firstName" label="שם פרטי" variant="outlined" value={formData.firstName} onChange={handleChange} required />
          <TextField fullWidth name="lastName" label="שם משפחה" variant="outlined" value={formData.lastName} onChange={handleChange} required />
          <TextField fullWidth name="email" label="דוא״ל" type="email" variant="outlined" value={formData.email} onChange={handleChange} required />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }} variant="outlined">
              <InputLabel>ארץ</InputLabel>
              <Select name="countryCode" value={formData.countryCode} onChange={handleChange} label="ארץ">
                <MenuItem value="+972">ישראל (+972)</MenuItem>
                <MenuItem value="+1">ארה"ב (+1)</MenuItem>
                <MenuItem value="+44">בריטניה (+44)</MenuItem>
                <MenuItem value="+33">צרפת (+33)</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth name="phone" label="מספר טלפון" type="tel" variant="outlined" value={formData.phone} onChange={handleChange} required />
          </Box>
          <TextField fullWidth name="password" label="סיסמה" type="password" variant="outlined" value={formData.password} onChange={handleChange} required />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ 
              py: 1.5, 
              backgroundColor: '#505050', 
              color: '#ffffff', 
              '&:hover': { 
                backgroundColor: '#ffffff', 
                color: '#505050' 
              } 
            }}
          >
            הצטרף
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
