import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { login, signInServer } from './UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import ViewPurchasingGroup from '../PurchasingGroup/ViewPurchasingGroup';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'; 
import SignUp from './SignUp'
import { useNavigate } from 'react-router-dom';
import HomePage from '../../HomePage';

//הגדרת משתני כניסה למערכת
const providers = [{ id: 'credentials', name: 'Email and Password' }];

//הגדרת פונקציה לכניסה למערכת
export default function Login() {
  //הגדרת משתנה לקבלת הטוקן מהסטור
  // const token=useSelector(s=>s.user.token)
  //הגדרת משתנה לניווט בין הדפים
  // const navigate = useNavigate();
  //הגדרת משתנה לקבלת הודעות מהסטור
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

  // React.useEffect(() => {
  //   if (userToken) {
  //     navigate('/products'); // ניתוב לדף המוצרים אם המשתמש מחובר
  //   }
  // }, [userToken, navigate]);

  //פונקציה לקבלת פרטי המשתמש והכנסתם לסטור
  const handleSignIn = (provider, formData) => {
    //הגדרת משתנים לקבלת פרטי המשתמש
    const email = formData.get('email');
    const password = formData.get('password');
    //הכנסת המשתמש לסטור
    setUser({ email, password});
    //שליחת המשתמש לסטור
    dispatch(signInServer({ email, password })) 
    //הצגת המשתמש בקונסול
    alert(
      `Signing in with "${provider.name}" and credentials: ${email}, ${password}`,
    );
    // //העלמת הקומפוננטה וטעינת קומפוננטה של הקבוצות רכישה
    // document.getElementById("login").style.display="none"
    // document.getElementById("view-purchasing-group").style.display="block"
    if (localStorage.getItem("token")) {
      navigate('/HomePage'); // ניתוב לדף החדש
    }
  };

  const BRANDING = {
    logo: (
      <Link to="/SignUp" style={{ textDecoration: 'none', color: '#1976d2' }}>
      להרשמה
    </Link>
    ),
  };
  return (
    <>
     {/* {flag ? (
                <ViewPurchasingGroup />
            ) : ( */}
    <AppProvider theme={theme} branding={BRANDING} >
      <SignInPage
      sx={{marginTop:0}}
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
       {/* הוספת קישור להרשמה
       <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        <Link to="/sign-up" style={{ textDecoration: 'none', color: '#1976d2' }}>
          אין לך חשבון? הירשם כאן
        </Link>
      </Typography> */}
    </AppProvider>
    {/* )} */}
    </>
  );
}
