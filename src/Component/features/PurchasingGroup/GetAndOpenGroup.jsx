import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, MenuItem, FormControl, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCategories } from '../Category/CategorySlice';

const getUserIdFromToken = (token) => {
    if (!token) {
        console.error("טוקן לא קיים או ריק.");
        return null;
    }
    try {
        const payloadBase64 = token.split('.')[1]; 
        const decodedPayload = atob(payloadBase64);
        const payload = JSON.parse(decodedPayload);
        return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
    } catch (error) {
        console.error("שגיאה בניתוח הטוקן:", error);
        return null;
    }
};

export default function AddAndOpenGroup() {
    const location = useLocation();
    const { faveId, ...wantToOpen } = location.state || {}; 
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
        }
    
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
    
            if (faveId) {
                await deleteItem(faveId);
            }
    
            navigate('/ExistGroups');
    
        } catch (error) {
            console.error("❌ שגיאה בשליחת הבקשה:", error);
            alert("אירעה שגיאה בשליחת הבקשה. אנא נסה שנית.");
        }
    };
    
    const deleteItem = async (faveId) => {
        try {
            const response = await fetch(`https://localhost:7022/api/WantToOpen/${faveId}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error("שגיאה במחיקת הפריט");
            }
        } catch (error) {
            console.error("❌ שגיאה במחיקת הפריט:", error);
        }
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setGroupData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setGroupData(prev => ({ ...prev, image: file }));
        }
    };

    return (
        <Box component="form" sx={{ maxWidth: 500, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'white', marginTop: '150px' }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>הצעה לקבוצת רכישה</Typography>
            <TextField label="שם מוצר" name="productName" value={groupData.productName} variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
            <TextField label="תיאור" name="description" value={groupData.description} variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
            <TextField label="מחיר" name="price" value={groupData.price} type="number" variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
            <TextField label="כמות אנשים מינימלית" name="minPeople" value={groupData.minPeople} type="number" variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
            <TextField label="תאריך סגירה" name="closingDate" type="date" value={groupData.closingDate} variant="outlined" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField label="תנאי החבילה" name="packageTerms" value={groupData.packageTerms} variant="outlined" fullWidth onChange={handleChange} sx={{ mb: 2 }} />
            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
                הוספת תמונה
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>שלח בקשה</Button>
        </Box>
    );
}
