// import React, {useEffect, useState} from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import { useSelector, useDispatch } from 'react-redux';
// import { getGroupByIdGroup } from './PurchasingGroupSlice';
// import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
// import { useLocation } from 'react-router-dom';
// import { searchProducts } from './PurchasingGroupSlice';
// import {GetGroupsClosingToday} from './PurchasingGroupSlice'

// export default function ViewPurchasingGroup() {
//   const purchasingGroups = useSelector((state) => state.purchasingGroups.purchasingGroups);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const searchQuery = searchParams.get('search');
//   const categoryId = location.state?.categoryId;
//   const condition = location.state?.condition;

//   useEffect(() => {
//     setLoading(true);
//     window.scrollTo(0, 0);
//     if (searchQuery) {
//         dispatch(searchProducts(searchQuery))
//             .then(() => setLoading(false))
//             .catch(() => setLoading(false));
//     } else if (categoryId) {
//         dispatch(getGroupByIdGroup(categoryId))
//             .then(() => setLoading(false))
//             .catch(() => setLoading(false));
//     } else if(condition){
//       dispatch(GetGroupsClosingToday())
//       .then(() => setLoading(false))
//       .catch(() => setLoading(false));
//     }else{
//       setLoading(false);
//     }
// }, [searchQuery, categoryId]);

//   if (loading) {
//     return (
//       <Box textAlign="center" mt={5}>
//         <CircularProgress size={50} />
//         <Typography mt={2}>🔄 טוען נתונים...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <>
//     <div style={{ paddingTop: '5px' ,marginTop: '20vh'}}>
//       <Grid container spacing={2} justifyContent="center">
//         {purchasingGroups.map((item) => (
//          <Grid item key={item.id} xs={12} sm={6} md={4} lg={2.4}>
//          <Link to="/GroupModel" state={{ productId: item.id }} style={{ textDecoration: "none" }}>
//           <Card
//             sx={{
//               maxWidth: 400, 
//               height: 400,    
//               borderRadius: 0,
//               boxShadow: 3,
//               transition: "transform 0.3s",
//               "&:hover": { transform: "scale(1.05)" },
//               textAlign: "center",
//               backgroundColor: "#f9f9f9",
//               cursor: "pointer"
//             }}
//           >
//             <CardMedia
//               component="img"
//               sx={{ height: 280, borderRadius: "10px 10px 0 0" }} // מקטין את התמונה
//               image={`data:image/jpeg;base64,${item.image}`}
//               // /images/${product.imageUrl}
//               alt={item.name}
//             />
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" mt={0} fontSize={20}>{item.name}</Typography>
//               <Typography color="textSecondary" sx={{ mt: 1, fontSize: 12 }}>{item.description}</Typography>
//               <Typography variant="body2" color="secondary" fontWeight="bold" sx={{ mt: 2, fontSize: 14 }}>  כמות מינימלית: {item.amountMin}</Typography>
//               <Typography variant="body2" color="primary" fontWeight="bold" sx={{ mt: 2, fontSize: 14 }}> מחיר: {item.price}</Typography>
//               <Typography variant="body2" color="error" fontWeight="bold"  sx={{ mt: 2, fontSize: 14 }} > כמות משתתפים נוכחית: {item.currentAmount}</Typography>
//             </CardContent>
//           </Card>
//         </Link>
//         </Grid>
//         ))}
//       </Grid>
//     </div>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { getGroupByIdGroup, searchProducts, GetGroupsClosingToday } from './PurchasingGroupSlice';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function ViewPurchasingGroup() {
  const purchasingGroups = useSelector((state) => state.purchasingGroups.purchasingGroups);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const categoryId = location.state?.categoryId;
  const condition = location.state?.condition;

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    if (searchQuery) {
      dispatch(searchProducts(searchQuery))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else if (categoryId) {
      dispatch(getGroupByIdGroup(categoryId))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else if (condition) {
      dispatch(GetGroupsClosingToday())
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [searchQuery, categoryId, condition, dispatch]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress size={50} />
        <Typography mt={2}>🔄 טוען נתונים...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: '20px', marginTop: '20vh', px: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {purchasingGroups.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={2.4}>
            <Link 
              to="/GroupModel" 
              state={{ 
                productId: item.id, 
                name: item.name, 
                description: item.description 
              }} 
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  maxWidth: "20vw",
                  height: "32vw",
                  borderRadius: 2,
                  boxShadow: 4,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                  textAlign: "center",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 250, objectFit: "cover" }}
                  image={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                />
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Typography variant="h6" fontWeight="bold" fontSize={18} color="textPrimary">
                    {item.name}
                  </Typography>
                  <Typography color="textPrimary" sx={{ mt: 1, fontSize: 14 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold" sx={{ mt: 1 }}>
                    מחיר: ₪{item.price}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" fontWeight="bold" sx={{ mt: 1 }}>
                    כמות מינימלית: {item.amountMin}
                  </Typography>
                  <Typography variant="body2" color="error" fontWeight="bold" sx={{ mt: 1 }}>
                    כמות משתתפים נוכחית: {item.currentAmount}
                  </Typography>
                  <Stack spacing={1} sx={{ textAlign: 'center', ml:5 }}>
                    <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
