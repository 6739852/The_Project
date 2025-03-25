import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import { EmojiPeople, SentimentSatisfiedAlt } from '@mui/icons-material';

const suppliers = [
    { id: 1, name: 'ספק 1' },
    { id: 2, name: 'ספק 2' },
    { id: 3, name: 'ספק 3' },
];

export default function GroupCreationForm() {
    const [productName, setProductName] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ productName, selectedSupplier, details });
        alert('קבוצה נפתחה בהצלחה!');
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
                direction: 'rtl'
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
                sx={{ textAlign: 'right', direction: 'rtl' }}
            />

            <TextField
                select
                fullWidth
                label="בחר ספק"
                variant="outlined"
                margin="normal"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                sx={{ textAlign: 'right', direction: 'rtl' }}
            >
                {suppliers.map((supplier) => (
                    <MenuItem key={supplier.id} value={supplier.name}>
                        {supplier.name}
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
                sx={{ textAlign: 'right', direction: 'rtl' }}
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
