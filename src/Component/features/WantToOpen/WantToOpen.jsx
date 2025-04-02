import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import { EmojiPeople, SentimentSatisfiedAlt } from '@mui/icons-material';
import { fetchCategories } from '../Category/CategorySlice';
import { suggestGroup } from './WantToOpenSlice';
import { useNavigate } from 'react-router-dom';

//פונקציה שמקבלת את המשתמש מהטוקן
const getUserIdFromToken = (token) => {
    if (!token) {
        console.error("טוקן לא קיים או ריק.");
        return null;
    }
    try {
        const payloadBase64 = token.split('.')[1]; 
        const decodedPayload = atob(payloadBase64);
        const payload = JSON.parse(decodedPayload);
        const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        return userId || null;
    } catch (error) {
        console.error("שגיאה בניתוח הטוקן:", error);
        return null;
    }
};

export default function WantToOpen() { 
    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);

    useEffect(() => {
        dispatch(fetchCategories());
        window.scrollTo(0, 0); // גלילה לראש הדף בכל טעינה
    }, [dispatch]);

    const [productName, setProductName] = useState('');
    const [selectedCategory, setselectedCategory] = useState('');
    const [details, setDetails] = useState('');

    //פונקציה ששולחת את הטופס
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        console.log(token);
        
        const userId = getUserIdFromToken(token, user);
        console.log(userId);
        
        dispatch(suggestGroup({ 
            categoryId: selectedCategory,
            approvalDate: new Date().toISOString(),
            userId: userId,
            name: productName, 
            description: details
        }));
        alert(`הבקשה נשלחה בהצלחה!`);
        navigate('/Fave');
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: 'auto',
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'white',
                textAlign: 'right',
                direction: 'rtl',
                marginTop: '150px' 
            }}
        >
            <Typography variant="h6" gutterBottom display="flex" alignItems="center" justifyContent="right">
                <EmojiPeople sx={{ marginLeft: 1 }} /> איזה קבוצה בא לך לפתוח? <SentimentSatisfiedAlt sx={{ marginRight: 1, color: 'orange' }} />
            </Typography>
            <TextField
                fullWidth
                label="שם המוצר"
                variant="outlined"
                margin="normal"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
                fullWidth
                select
                label="בחר קטגוריה"
                variant="outlined"
                margin="normal"
                value={selectedCategory}
                onChange={(e) => setselectedCategory(e.target.value)}
            >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                      {category.name}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
                fullWidth
                label="פרטים נוספים"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
            >
                פתיחת קבוצה
            </Button>
        </Box>
    );
}
