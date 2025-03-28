import React, { useState } from 'react';
import { TextField, Button, Container, Box, MenuItem, Select, FormControl, InputLabel,InputAdornment} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Join() {
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
    alert("you joined seccssefully!")
    navigate('/HomePage')
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