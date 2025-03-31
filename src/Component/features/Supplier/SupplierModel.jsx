import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSupplierById } from "./SupplierSlice";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SupplierModel() {
  const navigate=useNavigate();
  const location = useLocation();
  const supplierId = location.state?.supplierId; 
  const supplierOne = useSelector(state => state.supplier.supplierOne);
  const dispatch = useDispatch();

  useEffect(() => {
    if (supplierId) {
      dispatch(getSupplierById(supplierId));
    }
  }, [supplierId, dispatch]);

  if (!supplierOne) {
    return <Typography variant="h6">טוען נתונים...</Typography>;
  }

  const HandleJoin=()=>{
     navigate('/')
  }

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2, boxShadow: 3 ,marginTop: '150px'}}>
      <CardMedia
        component="img"
        height="300"
        image={`data:image/jpeg;base64,${supplierOne.image}`}
        alt={supplierOne.name}
        sx={{ objectFit: "cover", borderRadius: "8px" }}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {supplierOne.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {supplierOne.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", mt: 2 }}>
          ₪{supplierOne.price}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" fullWidth>
            הוסף לסל
          </Button>
          <Button onClick={HandleJoin} variant="outlined" color="secondary" fullWidth>
            רשימת המוצרים של ספק זה
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
