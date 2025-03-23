// קומפוננטה של דף הבית שמציגה לי תמונה
import React from 'react';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#3f51b5' }}>ברוכים הבאים לאתר קבוצות הרכישה שלנו</h1>
            <img src="../Images/logo_1.jpg" alt="Logo" style={{ width: 'auto', height: 'auto', marginTop: '20px' }} />
        </div>
    );
};

export default HomePage;