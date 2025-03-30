import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container, Box, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { getFave } from '../PurchasingGroup/PurchasingGroupSlice';
import { Link } from 'react-router-dom';

export default function FaveSupplier() {
  const dispatch = useDispatch();
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
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="primary.main" fontWeight="bold">
        מה שבאלך שיפתח - ואנחנו עובדים על זה בשבילך...
      </Typography>
      <Grid container spacing={3}>
        {faveArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Link to="/FaveModel" state={{ faveId: item.id }} style={{ textDecoration: "none", color: "inherit" }}>
              <Card sx={{ boxShadow: 4, borderRadius: 3, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.approvalDate}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <IconButton color="error" size="small">
                      <Favorite />
                    </IconButton>
                    <IconButton color="default" size="small">
                      <Favorite />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
