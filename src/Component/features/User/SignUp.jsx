import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography } from '@mui/material';
import { register } from './UserSlice';
import ViewPurchasingGroup from '../PurchasingGroup/ViewPurchasingGroup';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        alert: false
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    //פונקציה של בדיקות תקינות
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (formData.name.length < 3) {
            tempErrors.name = "השם חייב להיות לפחות 3 תווים";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            tempErrors.email = "האימייל אינו תקין";
            isValid = false;
        }

        if (formData.password.length < 3) {
            tempErrors.password = "הסיסמה חייבת להיות לפחות 3 תווים";
            isValid = false;
        }

        if (formData.password !== confirmPassword) {
            tempErrors.confirmPassword = "הסיסמאות אינן תואמות";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };
    
    //פונקציה שמעדכנת את הנתונים בטופס
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    //פונקציה ששולחת את הטופס
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        dispatch(register({ 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            alert: formData.alert 
        }));

        alert(`User ${formData.name} registered successfully!`);
        setFlag(true);

        // ניקוי הטופס
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            alert: false
        });
        setConfirmPassword('');
        setErrors({});
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
                        error={!!errors.name}
                        helperText={errors.name}
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
                        error={!!errors.email}
                        helperText={errors.email}
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
                        error={!!errors.password}
                        helperText={errors.password}
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
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
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
