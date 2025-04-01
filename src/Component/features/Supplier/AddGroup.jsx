import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, InputLabel, MenuItem, FormControl, Select, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { addPurchasingGroup } from './SupplierSlice';
import { useNavigate } from 'react-router-dom';
import {fetchCategories} from '../Category/CategorySlice'

const getUserIdFromToken = (token) => {
  if (!token) {
      console.error("טוקן לא קיים או ריק.");
      return null;
  }
  try {
      const payloadBase64 = token.split('.')[1]; 
      const decodedPayload = atob(payloadBase64);
      const payload = JSON.parse(decodedPayload);
      const supplierId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      return supplierId || null;
  } catch (error) {
      console.error("שגיאה בניתוח הטוקן:", error);
      return null;
  }
};

export default function AddGroup() {
    const navigate=useNavigate()
    const dispatch1=useDispatch();
    const dispatch2=useDispatch();
    const categories = useSelector(state=>state.category.categories)
    const [selectedCategory, setselectedCategory] = useState('');
    
    React.useEffect(() => {
        dispatch1(fetchCategories());
    }, [dispatch1]);

    const [groupData, setGroupData] = useState({
        productName: '',
        description: '',
        price: '',
        minPeople: '',
        closingDate: '',
        packageTerms: '',
        image: null,
        imagePreview: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGroupData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setGroupData(prev => ({ 
                ...prev, 
                image: file,
                imagePreview: URL.createObjectURL(file) 
            }));
        }
    };

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
        try {
            const response = await fetch("https://localhost:7022/api/PurchasingGroup", {
                method: "POST",
                headers: {
                    Authorization: `Bearer  ${localStorage.getItem("token")} `,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error("שגיאה בשליחת הבקשה");
            }
            alert(`הבקשה נשלחה בהצלחה!`);
            navigate('/ExistGroups');
        } catch (error) {
            console.error("שגיאה בשליחת הבקשה:", error);
            alert("אירעה שגיאה בשליחת הבקשה. אנא נסה שנית.");
        }
    };

    return (
        <Box component="form" sx={{ maxWidth: 500, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
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
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </TextField>
            </FormControl>
            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
                הוספת תמונה
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
            {groupData.imagePreview && <img src={groupData.imagePreview} alt="תצוגת תמונה" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />}
            <FormControlLabel control={<Checkbox onChange={(e) => setGroupData(prev => ({ ...prev, agreeToTerms: e.target.checked }))} />} label="אני מאשר את מדיניות האתר" sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>שלח בקשה</Button>
        </Box>
    );
}
