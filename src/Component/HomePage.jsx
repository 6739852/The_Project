// קומפוננטה של דף הבית שמציגה לי תמונה
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {

    const user = useSelector(state => state.user.currentUser);

    // בדיקה איזה מפתח קיים
    const userName =localStorage.getItem("name")|| "אורח"; // ערך ברירת מחדל
   
    console.log(user)
    return (

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          {console.log("User object:", user)  }
            <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#3f51b5' }}>ברוכים הבאים אתר קבוצת הרכישה שלנו</h1> 
            <h2> {userName} שלום</h2>
            <img src="../Images/logo_1.jpg" alt="Logo" style={{ width: 'auto', height: 'auto', marginTop: '20px' }} />
        </div>
    );
};

export default HomePage;