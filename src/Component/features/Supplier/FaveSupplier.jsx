import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container, Box, Avatar, IconButton } from '@mui/material';
import { Favorite, Person } from '@mui/icons-material';
import { useSelector,useDispatch } from 'react-redux';
import { getFave } from '../PurchasingGroup/PurchasingGroupSlice';


export default function Fave(){
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const faveArr = useSelector((state) => state.purchasingGroups.purchasingGroupFave);
   useEffect(() => {
     console.log("🔄 useEffect מופעל! מנסה להביא נתונים...");
     setLoading(true);
     dispatch(getFave(4))
       .then(() => setLoading(false))
       .catch(() => setLoading(false));
   }, [dispatch]);
  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: 'rtl' }}>
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
