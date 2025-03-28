import React, { useState } from 'react';
import {Card,CardContent,CardMedia,Typography,Button,IconButton,Box,Grid,Container,Divider,} from '@mui/material';
import { AddCircle, RemoveCircle, Delete, ShoppingCart } from '@mui/icons-material';

const initialCart = [
  { id: 1, name: 'שמלה אלגנטית', price: 277, quantity: 1, image: '.../Images/logo_1.jpg' },
  { id: 2, name: 'חולצת קיץ אופנתית', price: 199, quantity: 1, image: '.../Images/logo_2.jpg' },
];

export default function ExistGroup() {
  const [cart, setCart] = useState(initialCart);

  const handleIncrease = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: 'rtl' }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center" display="flex" alignItems="center" justifyContent="center">
        <ShoppingCart sx={{ ml: 1, color: 'primary.main' }} /> הקבוצות שלי ({cart.length})
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {cart.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, backgroundColor: 'transparent', boxShadow: 'none' }}>
              <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: 90, height: 90, borderRadius: 2 }} />
              <CardContent sx={{ flex: 1, textAlign: 'right' }}>
                <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                <Typography color="textSecondary">₪{item.price.toFixed(2)}</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 2, px: 1 }}>
                <IconButton onClick={() => handleDecrease(item.id)} color="primary"><RemoveCircle /></IconButton>
                <Typography sx={{ mx: 1, fontWeight: 'bold' }}>{item.quantity}</Typography>
                <IconButton onClick={() => handleIncrease(item.id)} color="primary"><AddCircle /></IconButton>
              </Box>
              <IconButton onClick={() => handleRemove(item.id)} color="error"><Delete /></IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" size="large" sx={{ px: 4, borderRadius: 3 }}>
          מעבר לתשלום
        </Button>
      </Box>
    </Container>
  );
}
