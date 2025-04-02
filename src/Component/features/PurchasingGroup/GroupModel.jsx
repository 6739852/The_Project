import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGroupById } from "./PurchasingGroupSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button, Box, Grid } from "@mui/material";
import { addScope } from "./PurchasingGroupSlice";
import Geomini from './Gemini'

export default function GroupModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state?.productId;
  const name = location.state?.name;
  const description = location.state?.description;
  const string = description+""+name;
  const purchasingGroup = useSelector(state => state.purchasingGroups.purchasingGroupOne);
  const dispatch = useDispatch();
  const role = localStorage.getItem("role"); 

  useEffect(() => {
    if (productId) {
      dispatch(getGroupById(productId));
      addScope(productId);
    }
  }, [productId, dispatch]);

  if (!purchasingGroup) {
    return <Typography variant="h6" textAlign="center">טוען נתונים...</Typography>;
  }
  
  //שולחת את המשתמש שקומפוננטת JOIN
  const HandleJoin = () => {
    navigate("/Join", { state: { productId } });
  };

  return (
<Grid container spacing={2} style={{ marginTop: '20px' }}>
  {/* קומפוננטה צד ימין - תיקח רבע מהרוחב */}
    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Geomini string={string} />
    </Grid>
    {/* קומפוננטה צד שמאל - תיקח את כל השאר */}
  <Grid item xs={9} style={{ display: 'flex', justifyContent: 'center' }}>
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3, marginTop: '2vh' }}>
      <Grid container spacing={4} direction="row-reverse">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={`data:image/jpeg;base64,${purchasingGroup.image}`}
            alt={purchasingGroup.name}
            sx={{ objectFit: "cover", width: "35vw", height: "70vh", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" textAlign="right" gutterBottom>
            {purchasingGroup.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="right" gutterBottom>
            {purchasingGroup.description}
          </Typography>
          <Typography variant="h5" color="primary" textAlign="right" fontWeight="bold" sx={{ mt: 2 }}>
            ₪{purchasingGroup.price}
          </Typography>
          <Typography variant="h5" color="primary" textAlign="right" fontWeight="bold" sx={{ mt: 2 }}>
          {purchasingGroup.ClosedDate}
          </Typography>
          <Typography variant="h5" color="primary" textAlign="right" fontWeight="bold" sx={{ mt: 2 }}>
           {purchasingGroup.CurrentAmount}
          </Typography>
          <Typography variant="h5" color="primary" textAlign="right" fontWeight="bold" sx={{ mt: 2 }}>
            {purchasingGroup.AmountMin}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            {/* הצגת הכפתור רק אם המשתמש אינו ספק */}
            {role && role.toUpperCase() !== "SUPPLIER" && (
              <Button onClick={HandleJoin} variant="contained" color="secondary" fullWidth>
                אני רוצה להצטרף
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Grid>
    </Grid>
  );
}
