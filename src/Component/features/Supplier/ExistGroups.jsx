// import React, { useState } from 'react';
// import {Card,CardContent,CardMedia,Typography,Button,IconButton,Box,Grid,Container,Divider,} from '@mui/material';
// import { AddCircle, RemoveCircle, Delete, ShoppingCart } from '@mui/icons-material';

// const initialCart = [
//   { id: 1, name: 'שמלה אלגנטית', price: 277, quantity: 1, image: '.../Images/logo_1.jpg' },
//   { id: 2, name: 'חולצת קיץ אופנתית', price: 199, quantity: 1, image: '.../Images/logo_2.jpg' },
// ];

// export default function ExistGroup() {
//   const [cart, setCart] = useState(initialCart);

//   const handleIncrease = (id) => {
//     setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
//   };

//   const handleDecrease = (id) => {
//     setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
//   };

//   const handleRemove = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, direction: 'rtl' }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center" display="flex" alignItems="center" justifyContent="center">
//         <ShoppingCart sx={{ ml: 1, color: 'primary.main' }} /> הקבוצות שלי ({cart.length})
//       </Typography>
//       <Divider sx={{ mb: 2 }} />
//       <Grid container spacing={2}>
//         {cart.map((item) => (
//           <Grid item xs={12} key={item.id}>
//             <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, backgroundColor: 'transparent', boxShadow: 'none' }}>
//               <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: 90, height: 90, borderRadius: 2 }} />
//               <CardContent sx={{ flex: 1, textAlign: 'right' }}>
//                 <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
//                 <Typography color="textSecondary">₪{item.price.toFixed(2)}</Typography>
//               </CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 2, px: 1 }}>
//                 <IconButton onClick={() => handleDecrease(item.id)} color="primary"><RemoveCircle /></IconButton>
//                 <Typography sx={{ mx: 1, fontWeight: 'bold' }}>{item.quantity}</Typography>
//                 <IconButton onClick={() => handleIncrease(item.id)} color="primary"><AddCircle /></IconButton>
//               </Box>
//               <IconButton onClick={() => handleRemove(item.id)} color="error"><Delete /></IconButton>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
//         <Typography variant="h6" fontWeight="bold">סה"כ לתשלום: ₪{totalPrice.toFixed(2)}</Typography>
//         <Button variant="contained" color="primary" size="large" sx={{ px: 4, borderRadius: 3 }}>
//           מעבר לתשלום
//         </Button>
//       </Box>
//     </Container>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box, Grid, Container, Divider } from '@mui/material';
// import { AddCircle, RemoveCircle, Delete, ShoppingCart } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPurchasingGroupsById } from '../PurchasingGroup/PurchasingGroupSlice';

// export default function Cart() {
//     const id = 14; // כאן אמור להיות ה-ID של המשתמש מהסטייט הגלובלי
//     const dispatch = useDispatch();
//     // ✅ מעקב אחרי סטטוס טעינת הנתונים
//     const [loading, setLoading] = useState(true);
//     const groups = useSelector((state) => state.purchasingGroups.purchasingGroupsId);
//     useEffect(() => {
//         console.log("🔄 useEffect מופעל! מנסה להביא נתונים...");
//         setLoading(true); // מסמן שהנתונים נטענים
//         dispatch(getPurchasingGroupsById(id))
//             .then(() => setLoading(false)) // כשנגמרה הקריאה - מפסיקים את ה-loading
//             .catch(() => setLoading(false)); // במקרה של שגיאה, מפסיקים את ה-loading
//     }, [dispatch, id]); // ✅ הוספנו userId לתלותות

//     // ✅ הדפסת המידע לראות מה קורה
//     console.log("📦 קבוצות רכישה מה-Redux:", groups);
//     return (
//         <Container maxWidth="md" sx={{ mt: 4, direction: 'rtl' }}>
//             <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center" display="flex" alignItems="center" justifyContent="center">
//                 <ShoppingCart sx={{ ml: 1, color: 'primary.main' }} /> הקבוצות שלי ({groups.length})
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Grid container spacing={2}>
//                 {groups.map((item) => (
//                          <Grid item key={item.id} xs={12} sm={6} md={2} lg={2}>
//                            <Card sx={{ maxWidth: 200, maxHeight: 380, margin:1}}>
//                              <CardContent>
//                                <Typography
//                                  gutterBottom
//                                  variant="h5"
//                                  component="div"
//                                  align="center"
//                                  sx={{ fontFamily: 'Arial, sans-serif' }}
//                                >
//                                  {item.name}
//                                </Typography>
//                                <CardMedia
//                                  sx={{ height: 140 }}
//                                  image={`data:image/jpeg;base64,${item.image}`}
//                                  alt="logo"
//                                  title= {item.name}
//                                />
//                                <Typography 
//                                  variant="body2"
//                                  sx={{ color: 'text.secondary', fontFamily: 'Arial, sans-serif' }}
//                                  align="center"
//                                >
//                                  {item.description}
//                                </Typography>
//                                <br />
//                                <Typography
//                                  variant="body2"
//                                  sx={{ color: 'text.secondary', fontFamily: 'Arial, sans-serif' }}
//                                  align="center"
//                                >
//                                  {item.amountMin}
//                                </Typography>
//                              </CardContent>
//                            </Card>
//                          </Grid>
//                        ))}
//             </Grid>
//             <Divider sx={{ my: 2 }} />
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
//             </Box>
//         </Container>
//     );
// }
import React, { useState, useEffect } from "react";
import {Card,CardContent,CardMedia,Typography,Box,Grid,Container,Divider,CircularProgress} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasingGroupsById } from "../PurchasingGroup/PurchasingGroupSlice";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

//פונקציה שמחלצת את הנתונים מהטוקן
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1]; // לוקח את החלק האמצעי של ה-JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // מתקנן תווים
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload); // מחזיר אובייקט JSON עם הנתונים
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}

export default function ExistGroup() {

  const token=localStorage.getItem("token");
  const parsedData = parseJwt(token);
  const userId = parsedData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  console.log("User ID:", userId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const groups = useSelector((state) => state.purchasingGroups.purchasingGroupsId);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔄 useEffect מופעל! מנסה להביא נתונים...");
    setLoading(true);
    window.scrollTo(0, 0);
    dispatch(getPurchasingGroupsById(userId))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, userId]);

  console.log("📦 קבוצות רכישה מה-Redux:", groups);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress size={50} />
        <Typography mt={2}>🔄 טוען נתונים...</Typography>
      </Box>
    );
  }

  if (!groups || groups.length === 0) {
    return (
      <Typography textAlign="center" mt={5} fontSize={20} fontWeight="bold">
        😕 אין לך קבוצות רכישה כרגע
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, direction: "rtl" ,marginTop: '150px'}}>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ShoppingCart sx={{ ml: 1, color: "primary.main" }} /> הקבוצות שלי ({groups.length})
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3} justifyContent="center">
        {groups.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
           <Link to="/GroupModel" state={{ productId: item.id }} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          maxWidth: 300,
          height: 420,
          borderRadius: 0,
          boxShadow: 3,
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.05)" },
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          cursor: "pointer" // נותן חיווי שהכרטיס לחיץ
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 180, borderRadius: "10px 10px 0 0" }}
          image={`data:image/jpeg;base64,${item.image}`}
          alt={item.name}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }}>{item.description}</Typography>
          <Typography
            variant="body2"
            color="primary"
            fontWeight="bold"
            sx={{ mt: 2, fontSize: 16 }}
          >
            כמות מינימלית: {item.amountMin}
          </Typography>
        </CardContent>
      </Card>
    </Link>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />
    </Container>
  );
}

