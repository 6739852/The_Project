import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography } from '@mui/material';
import { registerSupplier } from './SupplierSlice';
import { useNavigate } from 'react-router-dom';

const SignUpSupplier = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        tz: '',
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
        alert: false,
        authorized: false,
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // פונקציה לקבלת פרטי המשתמש והכנסתם לסטור
    const handleSubmit = (e) => {
        e.preventDefault();

        // בדיקה אם הסיסמאות תואמות
        if (formData.password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // שליחת הנתונים ל- Redux
        dispatch(registerSupplier({ 
            tz: formData.tz,
            name: formData.name, 
            password: formData.password,
            numOfCurrentGroup:0, 
            phone: formData.phone,
            email: formData.email, 
            authorized: formData.authorized,
            rating:0,
            alert: formData.alert,
        }));

        alert(`User ${formData.name} registered successfully!`);
        if (localStorage.getItem("token")) {
            navigate('/HomePage'); // ניתוב לדף החדש
          }
    };

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <>
          <Container maxWidth="sm">
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        gutterBottom 
                        style={{ color: 'gray', marginTop: '20px', textAlign: 'center' }}
                    >
                        הרשמה לספקים
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Tz (ID)"
                            name="tz"
                            type="text"
                            value={formData.tz}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                          <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                           <FormControlLabel
                            control={
                                <Checkbox
                                    name="alert"
                                    checked={formData.alert}
                                    value={formData.alert}
                                    onChange={handleChange}
                                />
                            }
                            label="Receive Notifications"
                        />
                        <br />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="authorized"
                                    checked={formData.authorized}
                                    value={formData.authorized}
                                    onChange={handleChange}
                                />
                            }
                            label="Authorized"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Sign Up
                        </Button>
                    </form>
                </Container>
        </>
    );
};

export default SignUpSupplier;
