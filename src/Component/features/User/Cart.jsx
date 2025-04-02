import React, { useState, useEffect } from "react";
import {Card,CardContent,CardMedia,Typography,Box,Grid,Container,Divider,CircularProgress} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasingGroupsByIdUser } from "../PurchasingGroup/PurchasingGroupSlice";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

//פונקציה שמחלצת את הנתונים מהטוקן
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); 
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload); 
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}

export default function Cart() {
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
    dispatch(getPurchasingGroupsByIdUser(userId))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, userId]);

  console.log("📦 קבוצות רכישה מה-Redux:", groups);

  //בזמן טעינה יציג את זה
  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress size={50} />
        <Typography mt={2}>🔄 טוען נתונים...</Typography>
      </Box>
    );
  }

  //אם אין קבוצות בעגלה יציג את זה
  if (!groups || groups.length === 0) {
    return (
      <Typography textAlign="center" mt={5} fontSize={20} fontWeight="bold">
        😕 אין לך קבוצות רכישה כרגע
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, direction: "rtl", marginTop: '150px' }}>
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
                  maxWidth: "20vw",
                  height: "33vw",
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
                  <Stack spacing={1} sx={{ mt: 2, alignSelf: "center" }}>
                    <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
                  </Stack>
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

