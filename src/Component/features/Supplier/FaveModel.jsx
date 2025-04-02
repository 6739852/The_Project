import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button, Box, Grid } from "@mui/material";
import { getFaveById } from "../WantToOpen/WantToOpenSlice";

export default function FaveModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const faveId = location.state?.faveId;
  const wantToOpen = useSelector(state => state.wantToOpen.wantToOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (faveId) {
      dispatch(getFaveById(faveId));
    }
  }, [faveId, dispatch]);
  //אם עדיין לא הביא את הקבוצות רכישה
  if (!wantToOpen) {
    return <Typography variant="h6" textAlign="center">טוען נתונים...</Typography>;
  }
  //העברה לקומפוננטה המשך
  const HandleGet = () => {
    navigate("/GetAndOpenGroup", { state: { faveId, ...wantToOpen } });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 3 ,marginTop: '150px'}}>
      <Grid container spacing={4} direction="row-reverse">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {wantToOpen.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {wantToOpen.description}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mt: 2 }}>
            ₪{wantToOpen.category}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            <Button onClick={HandleGet} variant="contained" color="secondary" fullWidth>
              קבל את הבקשה
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
