import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, MenuItem, FormControl, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCategories } from '../Category/CategorySlice';

//פונקציה שמחלצץ את הטוקן
const getUserIdFromToken = (token) => {
    if (!token) {
        console.error("טוקן לא קיים או ריק.");
        return null;
    }
    try {
        const payloadBase64 = token.split('.')[1]; 
        const decodedPayload = atob(payloadBase64);
  
        // המרת ה-JSON הקריא לאובייקט JavaScript
        const payload = JSON.parse(decodedPayload);
  
        // שליפת ה-Claim של NameIdentifier (userId)
        const supplierId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        if (supplierId) {
            return supplierId; // החזרת מזהה המשתמש
        } else {
            console.warn("לא נמצא NameIdentifier בטוקן.");
            return null;
        }
    } catch (error) {
        console.error("שגיאה בניתוח הטוקן:", error);
        return null; // במקרה של טוקן לא תקין או שגיאה
    }
  };

export default function AddAndOpenGroup() {
    
    const location = useLocation();
    const { faveId, ...wantToOpen } = location.state || {}; // קבלת הנתונים מהניווט
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    
    const [groupData, setGroupData] = useState({
        productName: wantToOpen.name || '',
        description: wantToOpen.description || '',
        price: wantToOpen.price || '',
        minPeople: wantToOpen.minPeople || '',
        closingDate: wantToOpen.closingDate || '',
        packageTerms: wantToOpen.packageTerms || '',
        image: null
    });

    const [selectedCategory, setSelectedCategory] = useState(wantToOpen.categoryId || '');
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (wantToOpen.categoryId) {
            setSelectedCategory(wantToOpen.categoryId);
        }
    }, [categories, wantToOpen.categoryId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');      
        const supplierId = getUserIdFromToken(token);
        const formData = new FormData();
        formData.append("name", groupData.productName);
        formData.append("categoryId", selectedCategory);
        formData.append("price", groupData.price);
        formData.append("closedDate", groupData.closingDate);
        formData.append("description", groupData.packageTerms);
        formData.append("supplierId", supplierId);
        formData.append("status", true);
        formData.append("scope", 0);
        formData.append("openingDate", new Date().toISOString());
        formData.append("currentAmount", 0);
        formData.append("amountMin", groupData.minPeople);
    
        if (groupData.image) {
            formData.append("ImageFile", groupData.image);  
        } else {
            console.error("🚨 שגיאה: התמונה לא נבחרה!");
            return;
        }
    
        console.log("📤 שולח FormData:", formData);
    
        try {
            const response = await fetch("https://localhost:7022/api/PurchasingGroup", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("שגיאה בשליחת הבקשה");
            }
    
            alert(`✅ הבקשה נשלחה בהצלחה!`);
    
            // 🟢 מחיקת הפריט רק אם faveId קיים
            if (faveId) {
                await deleteItem(faveId);
            }
    
            navigate('/ExistGroups');
    
        } catch (error) {
            console.error("❌ שגיאה בשליחת הבקשה:", error);
            alert("אירעה שגיאה בשליחת הבקשה. אנא נסה שנית.");
        }
    };
    
    // 🛑 פונקציה למחיקת הפריט
    const deleteItem = async (faveId) => {
        try {
            console.log(`🗑️ מוחק פריט עם ID: ${faveId}`);
            const response = await fetch(`https://localhost:7022/api/WantToOpen/${faveId}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error("שגיאה במחיקת הפריט");
            }
    
            console.log("✅ הפריט נמחק בהצלחה!");
        } catch (error) {
            console.error("❌ שגיאה במחיקת הפריט:", error);
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGroupData(prev => ({ ...prev, [name]: value }));
    };

   //פונקציה של טעינת התמונה
    const handleImageUpload = (event) => {
    const file = event.target.files[0];
      if (file) {
        setGroupData(prev => ({ ...prev, image: file }));
      }
   };

    return (
        <Box component="form" sx={{ maxWidth: 500, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'white', marginTop: '150px'
        }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>הצעה לקבוצת רכישה</Typography>
        <TextField label="שם מוצר" name="productName" variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="תיאור" name="description" variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="מחיר" name="price" type="number" variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="כמות אנשים מינימלית" name="minPeople" type="number" variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="תאריך סגירה" name="closingDate" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField label="תנאי החבילה" name="packageTerms" variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
        <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
                       select
                       fullWidth
                       label="בחר קטגוריה"
                       variant="outlined"
                       margin="normal"
                       value={selectedCategory}
                       onChange={(e) => setselectedCategory(e.target.value)}
                       sx={{ textAlign: 'right', direction: 'rtl' }}
                      >
                      {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                      {category.name}
                      </MenuItem>
                      ))}
                  </TextField>
        </FormControl>
        <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
            הוספת תמונה
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>
        {groupData.image && <Typography variant="body2" sx={{ color: 'green', mb: 2 }}>תמונה נבחרה: {groupData.image.name}</Typography>}
        <FormControlLabel control={<Checkbox onChange={(e) => setGroupData(prev => ({ ...prev, agreeToTerms: e.target.checked }))} />} label="אני מאשר את מדיניות האתר" sx={{ mb: 2 }} />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>שלח בקשה</Button>
    </Box>
    );
}
