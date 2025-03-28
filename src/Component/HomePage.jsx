import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Grid} from '@mui/material';

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
    <Box sx={{ flexGrow: 1, marginTop: 8 }}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 200, // Adjusted height
              objectFit: 'cover',
            }}
            alt="MUI Logo"
            src="../Images/logo_1.jpg" // Replace with the desired image URL
          />
        </Grid>
        <Grid item xs={4}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 200, // Adjusted height
              objectFit: 'cover',
            }}
            alt="MUI Logo"
            src="../Images/logo_1.jpg" // Replace with the desired image URL
          />
        </Grid>
        <Grid item xs={4}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 200, // Adjusted height
              objectFit: 'cover',
            }}
            alt="MUI Logo"
            src="../Images/logo_1.jpg" // Replace with the desired image URL
          />
        </Grid>
        <Grid item xs={8}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 200, // Adjusted height
              objectFit: 'cover',
            }}
            alt="MUI Logo"
            src="../Images/logo_1.jpg" // Replace with the desired image URL
          />
        </Grid>
      </Grid>
    </Box>
  );
}
