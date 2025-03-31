import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container, Box, Avatar, IconButton } from '@mui/material';
import { Favorite, Person } from '@mui/icons-material';
import { useSelector,useDispatch } from 'react-redux';
import { getFaveUser } from '../PurchasingGroup/PurchasingGroupSlice';

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

export default function Fave(){

  const token=localStorage.getItem("token");
  const parsedData = parseJwt(token);

  const userId = parsedData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  console.log("User ID:", userId);

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const faveArr = useSelector((state) => state.purchasingGroups.purchasingGroupFave);
  useEffect(() => {
     console.log("🔄 useEffect מופעל! מנסה להביא נתונים...");
     setLoading(true);
     window.scrollTo(0, 0);
     dispatch(getFaveUser(userId))
       .then(() => setLoading(false))
       .catch(() => setLoading(false));
   }, [dispatch]);
   
  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: 'rtl' ,marginTop: '150px'}}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="primary.main">
        מה שבאלך שיפתח- ואנחנו עובדים של זה בשבילך...
      </Typography>
      <Grid container spacing={3}>
        {faveArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', boxShadow: 3, borderRadius: 2 }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                <Typography variant="body2" color="textSecondary">{item.approvalDate}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <IconButton color="error" size="small">
                      <Favorite />
                    </IconButton>
                    <IconButton color="default" size="small">
                      <Favorite />
                    </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
