import React, { useState } from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { signInServer } from './UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';

//הגדרת משתני כניסה למערכת
const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function Login() {
  const navigate = useNavigate();
  const message=useSelector(s=>s.user.message)
  //הגדרת משתנה לשליחת פעולות לסטור
  const dispatch = useDispatch();
  //הגדרת משתנה לקבלת העיצוב מ Material UI
  const theme = useTheme();
  //הגדרת משתנה לקבלת פרטי המשתמש
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  //פונקציה לקבלת פרטי המשתמש והכנסתם לסטור
  const handleSignIn = (provider, formData) => {
    debugger
    const email = formData.get('email');
    const password = formData.get('password');
    //הכנסת המשתמש לסטור
    setUser({ email, password});
    //שליחת המשתמש לסטור
    dispatch(signInServer({ email, password })) 
    
    if (localStorage.getItem("token")) {
      navigate('/HomePage'); // ניתוב לדף החדש
    }
  };

  const BRANDING = {
    logo: (
      <Link to="/SignUp" style={{ textDecoration: 'none', color: '#1976d2' }}>
       משתמש חדש? - לחץ פה להרשמה
    </Link>
    ),
  };
  return (
    <>
    <AppProvider theme={theme} branding={BRANDING} >
      <SignInPage
      sx={{marginTop: '0px'}}
      //מקבל את הפונקציה handleSignIn לטיפול באירוע הכניסה למערכת
        signIn={handleSignIn}
        slotProps={{
          emailField: { variant: 'standard', autoFocus: false },
          passwordField: { variant: 'standard' },
          submitButton: { variant: 'outlined' },
          rememberMe: { sx: { display: 'none' } }, // הסתרת ה-Checkbox בכוח
          
        }}
        providers={providers}
      />
    </AppProvider>
    </>
  );
}
