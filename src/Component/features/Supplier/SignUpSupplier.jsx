import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography } from '@mui/material';
import { registerSupplier } from './SupplierSlice';
import { useNavigate } from 'react-router-dom';

const SignUpSupplier = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (formData.name.length < 2) {
            tempErrors.name = "השם חייב להיות לפחות 2 תווים";
            isValid = false;
        }

        const idRegex = /^\d{9}$/;
        if (!idRegex.test(formData.tz)) {
            tempErrors.tz = "תעודת זהות חייבת להכיל 9 ספרות";
            isValid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            tempErrors.phone = "מספר הטלפון חייב להיות בן 10 ספרות";
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        dispatch(registerSupplier({ 
            tz: formData.tz,
            name: formData.name, 
            password: formData.password,
            numOfCurrentGroup: 0, 
            phone: formData.phone,
            email: formData.email, 
            authorized: formData.authorized,
            rating: 0,
            alert: formData.alert,
        }));

        alert(`User ${formData.name} registered successfully!`);
        if (localStorage.getItem("token")) {
            navigate('/HomePage');
        }

        // ניקוי הטופס
        setFormData({
            tz: '',
            name: '',
            password: '',
            email: '',
            confirmPassword: '',
            alert: false,
            authorized: false,
            phone: '',
        });
        setConfirmPassword('');
        setErrors({});
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom style={{ color: 'gray', marginTop: '150px', textAlign: 'center' }}>
                הרשמה לספקים
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required fullWidth error={!!errors.name} helperText={errors.name} />
                <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required fullWidth error={!!errors.email} helperText={errors.email} />
                <TextField label="Phone" name="phone" type="text" value={formData.phone} onChange={handleChange} margin="normal" required fullWidth error={!!errors.phone} helperText={errors.phone} />
                <TextField label="Tz (ID)" name="tz" type="text" value={formData.tz} onChange={handleChange} margin="normal" required fullWidth error={!!errors.tz} helperText={errors.tz} />
                <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required fullWidth error={!!errors.password} helperText={errors.password} />
                <TextField label="Confirm Password" name="confirmPassword" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} margin="normal" required fullWidth error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
                <FormControlLabel control={<Checkbox name="alert" checked={formData.alert} onChange={handleChange} />} label="Receive Notifications" />
                <FormControlLabel control={<Checkbox name="authorized" checked={formData.authorized} onChange={handleChange} />} label="Authorized" />
                <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
            </form>
        </Container>
    );
};

export default SignUpSupplier;
