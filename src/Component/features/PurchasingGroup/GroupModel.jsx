import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroupById } from "./PurchasingGroupSlice";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function GroupModel() {
  const navigate=useNavigate();
  const location = useLocation();
  const productId = location.state?.productId; 
  const purchasingGroup = useSelector(state => state.purchasingGroups.purchasingGroupOne);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(getGroupById(productId));
    }
  }, [productId, dispatch]);

  if (!purchasingGroup) {
    return <Typography variant="h6">טוען נתונים...</Typography>;
  }

  const HandleJoin=()=>{
     navigate('/Join')
  }

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="300"
        image={`data:image/jpeg;base64,${purchasingGroup.image}`}
        alt={purchasingGroup.name}
        sx={{ objectFit: "cover", borderRadius: "8px" }}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {purchasingGroup.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {purchasingGroup.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", mt: 2 }}>
          ₪{purchasingGroup.price}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" fullWidth>
            הוסף לסל
          </Button>
          <Button onClick={HandleJoin} variant="outlined" color="secondary" fullWidth>
            קנה עכשיו
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
