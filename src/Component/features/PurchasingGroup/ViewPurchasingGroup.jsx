import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPurchasingGroups } from './PurchasingGroupSlice';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


export default function ViewPurchasingGroup() {
  
  const purchasingGroups = useSelector((state) => state.purchasingGroups.purchasingGroups);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log("🔄 useEffect מופעל! מנסה להביא נתונים...");
      setLoading(true);
      window.scrollTo(0, 0);
      dispatch(fetchPurchasingGroups())
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress size={50} />
        <Typography mt={2}>🔄 טוען נתונים...</Typography>
      </Box>
    );
  }

  if (!purchasingGroups || purchasingGroups.length === 0) {
    return (
      <Typography textAlign="center" mt={5} fontSize={20} fontWeight="bold">
        😕 אין לך קבוצות רכישה כרגע
      </Typography>
    );
  }
  return (
    <>
    <CardMedia
              component="img"
              sx={{ height: 280, borderRadius: "10px 10px 0 0",marginTop: '150px' }} // מקטין את התמונה
              image={'..../Images/logo_1.jpg'}
         />
    <div style={{ paddingTop: '5px' }}>
      <Grid container spacing={2} justifyContent="center">
        {purchasingGroups.map((item) => (
         <Grid item key={item.id} xs={12} sm={6} md={4} lg={2.4}>
         <Link to="/GroupModel" state={{ productId: item.id }} style={{ textDecoration: "none" }}>
          <Card
            sx={{
              maxWidth: 400,  // מקטין את הרוחב
              height: 400,     // מקטין את הגובה הכללי
              borderRadius: 0,
              boxShadow: 3,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
              textAlign: "center",
              backgroundColor: "#f9f9f9",
              cursor: "pointer"
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: 280, borderRadius: "10px 10px 0 0" }} // מקטין את התמונה
              image={`data:image/jpeg;base64,${item.image}`}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mt={0} fontSize={20}>{item.name}</Typography>
              <Typography color="textSecondary" sx={{ mt: 1, fontSize: 12 }}>{item.description}</Typography>
              <Typography variant="body2" color="secondary" fontWeight="bold" sx={{ mt: 2, fontSize: 14 }}>  כמות מינימלית: {item.amountMin}</Typography>
              <Typography variant="body2" color="primary" fontWeight="bold" sx={{ mt: 2, fontSize: 14 }}> מחיר: {item.price}</Typography>
              <Typography variant="body2" color="error" fontWeight="bold"  sx={{ mt: 2, fontSize: 14 }} > כמות משתתפים נוכחית: {item.currentAmount}</Typography>
            </CardContent>
          </Card>
        </Link>
        </Grid>
        ))}
      </Grid>
    </div>
    </>
  );
}
