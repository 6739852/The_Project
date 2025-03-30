import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroupById } from "./PurchasingGroupSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button, Box, Grid } from "@mui/material";

export default function GroupModel() {
  const navigate = useNavigate();
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
    return <Typography variant="h6" textAlign="center">טוען נתונים...</Typography>;
  }

  const HandleJoin = () => {
    navigate("/join", { state: { productId } });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 }}>
      <Grid container spacing={4} direction="row-reverse">
        {/* צד ימין - תמונת מוצר */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={`data:image/jpeg;base64,${purchasingGroup.image}`}
            alt={purchasingGroup.name}
            sx={{ objectFit: "cover", width: "100%", height: 400, borderRadius: "8px" }}
          />
        </Grid>
        {/* צד שמאל - פרטי מוצר */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {purchasingGroup.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {purchasingGroup.description}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mt: 2 }}>
            ₪{purchasingGroup.price}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            <Button variant="contained" color="primary" fullWidth>
              הוסף לסל
            </Button>
            <Button onClick={HandleJoin} variant="contained" color="secondary" fullWidth>
              קנה עכשיו
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
