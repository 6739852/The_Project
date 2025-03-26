import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, InputLabel, MenuItem, FormControl, Select, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { addPurchasingGroup } from './SupplierSlice';
import { useNavigate } from 'react-router-dom';
import { supplierSlice } from './SupplierSlice';

const getUserIdFromToken = (token, supplier) => {
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

export default function AddGroup() {

    const navigate=useNavigate()
    const supplier=useSelector(state=>state.supplier.currentUser)
    const dispatch=useDispatch();
    const categories = useSelector(state=>state.category.categories)
        
    React.useEffect(() => {
    dispatch(fetchCategories());
      }, [dispatch]);
    const [groupData, setGroupData] = useState({
        productName: '',
        description: '',
        price: '',
        supplierId: '',
        Status: '',
        OpeningDate: '',
        ClosedDate: '',
        AmountMin: null,
        Scope: false,
        Description:true
    });

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

    const handleSubmit = (e) => {
       e.preventDefault();
    
       // שליחת הנתונים ל- Redux
       const token = localStorage.getItem('token'); // שליפת הטוקן מה- localStorage
       console.log(token);
                
       const userId = getUserIdFromToken(token,user );
       console.log(userId);

       dispatch(addGroup({ 
            name: '',
            imageUrl: '',
            categoryId: '',
            price: '',
            closingDate: '',
            packageTerms: '',
            category: '',
            image: null,
            agreeToTerms: false,
            supplierId:supplierId,
            status:true,
            scope:0,
            openingDate: new Date().toISOString(),
            currentAmount:0
            // categoryId: selectedCategory,
            // approvalDate: new Date().toISOString(),
            // userId: userId,
            // name: productName, 
            // description: details
              }));
        
                alert(`הבקשה נשלחה בהצלחה!`);
                navigate('/')
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

