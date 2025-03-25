import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography } from '@mui/material';
import { registerSupplier } from './SupplierSlice';

const SignUpSupplier = () => {

    const [flag, setFlag] = useState(false);

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        alert: false,
        authorized: false,
        phone: '',
        tz: ''
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
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            alert: formData.alert,
            authorized: formData.authorized,
            phone: formData.phone,
            tz: formData.tz
        }));

        alert(`User ${formData.name} registered successfully!`);
        setFlag(true);
    };

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <>
            {flag ? (
                <ViewPurchasingGroup />
            ) : (
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
            )}
        </>
    );
};

export default SignUpSupplier;
