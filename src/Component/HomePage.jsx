import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Grid} from '@mui/material';
import { Typography, Button, Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function HomePage() {
  return (
    <Box
    sx={{
      width: "100vw",
      minHeight: "100vh",
      overflowX: "hidden",
      margin: 0,
      padding: 0,
    }}
  >
    {/* הודעה על מגבלות משלוח */}
    <Box
      sx={{
        backgroundColor: "#C8FF33",
        padding: "20px",
        textAlign: "center",
        width: "100",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Due to freight restrictions, we are currently unable to provide our
        valued customers in Israel the fast delivery service that they are
        used to. Shipping dates will be correct at checkout.
      </Typography>
    </Box>

    {/* באנר עם קוד קופון */}
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "40px 20px",
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        20% OFF OCCASIONWEAR
      </Typography>
      <Typography variant="h6" gutterBottom>
        With code: <Button variant="outlined" sx={{ color: "#fff", borderColor: "#fff" }}>DRESSUP</Button>
      </Typography>
      <Typography variant="body2">
        Valid on selected products only. See website banner for full T&Cs.
      </Typography>
    </Box>
  </Box>
    // <Box sx={{ flexGrow: 1, marginTop: 10}}>
    //   <Grid container spacing={1}>
    //     <Grid item xs={8}>
    //       <Box
    //         component="img"
    //         sx={{
    //           width: '100%',
    //           height: 200, // Adjusted height
    //           objectFit: 'cover',
    //         }}
    //         alt="MUI Logo"
    //         src="../Images/logo_1.jpg" // Replace with the desired image URL
    //       />
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Box
    //         component="img"
    //         sx={{
    //           width: '100%',
    //           height: 200, // Adjusted height
    //           objectFit: 'cover',
    //         }}
    //         alt="MUI Logo"
    //         src="../Images/logo_1.jpg" // Replace with the desired image URL
    //       />
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Box
    //         component="img"
    //         sx={{
    //           width: '100%',
    //           height: 200, // Adjusted height
    //           objectFit: 'cover',
    //         }}
    //         alt="MUI Logo"
    //         src="../Images/logo_1.jpg" // Replace with the desired image URL
    //       />
    //     </Grid>
    //     <Grid item xs={8}>
    //       <Box
    //         component="img"
    //         sx={{
    //           width: '100%',
    //           height: 200, // Adjusted height
    //           objectFit: 'cover',
    //         }}
    //         alt="MUI Logo"
    //         src="../Images/logo_1.jpg" // Replace with the desired image URL
    //       />
    //     </Grid>
    //   </Grid>
    // </Box>
  );
}
