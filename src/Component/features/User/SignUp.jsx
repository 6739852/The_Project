import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography } from '@mui/material';
import { register } from './UserSlice';
import ViewPurchasingGroup from '../PurchasingGroup/ViewPurchasingGroup'
import {Link} from 'react-router-dom'

const SignUp = () => {

    const [flag, setFlag] = useState(false)

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        alert: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

     //פונקציה לקבלת פרטי המשתמש והכנסתם לסטור
 
     const handleSubmit = (e) => {
        e.preventDefault();

        // בדיקה אם הסיסמאות תואמות
        if (formData.password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // שליחת הנתונים ל- Redux
        dispatch(register({ 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            alert: formData.alert 
        }));

        alert(`User ${formData.name} registered successfully!`);
        setFlag(true)
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
                    fullWidth
                    style={{ color: 'gray', marginTop: '20px', textAlign: 'center' }}
                >
                    הרשמה
                </Typography>
                <Typography 
                    variant="body2" 
                    component="p" 
                    gutterBottom 
                    fullWidth
                    style={{ color: 'blue', textAlign: 'right', marginBottom: '20px' }}
                >
                    <Link to="/SignUpSupplier" style={{ textDecoration: 'none', color: 'blue' }}>
                         --הרשמה לספקים  
                    </Link>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        margin="normal"
                        required
                        fullWidth
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
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                </form>
            </Container>
        )}
        </>
    );
};

export default SignUp;