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

  //בטעינה יציג לי את זה 
  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress size={50} />
        <Typography mt={2}>🔄 טוען נתונים...</Typography>
      </Box>
    );
  }

  //כאשר אין קבוצות רכישה יחזיר
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
            color="error"
            fontWeight="bold"
            sx={{ mt: 2, fontSize: 16 }}
          >
            כמות נוכחית: {item.currentAmount}
          </Typography>
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

