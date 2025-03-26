import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container, Box, Avatar, IconButton } from '@mui/material';
import { Favorite, Person } from '@mui/icons-material';

const favoriteTeachers = [
  { id: 1, name: 'מורה אברהם', subject: 'מתמטיקה', image: 'https://via.placeholder.com/80', isFavorite: true },
  { id: 2, name: 'מורה שרה', subject: 'עברית', image: 'https://via.placeholder.com/80', isFavorite: true },
  { id: 3, name: 'מורה יוסי', subject: 'מדעים', image: 'https://via.placeholder.com/80', isFavorite: false },
  { id: 4, name: 'מורה מרים', subject: 'היסטוריה', image: 'https://via.placeholder.com/80', isFavorite: true },
];

export default function Fave(){

  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: 'rtl' }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="primary.main">
        מה שבאלך שיפתח- ואנחנו עובדים של זה בשבילך...
      </Typography>
      <Grid container spacing={3}>
        {favoriteTeachers.map((teacher) => (
          <Grid item xs={12} sm={6} md={4} key={teacher.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={teacher.image}
                alt={teacher.name}
                sx={{ width: 80, height: 80, borderRadius: '50%', margin: 2 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">{teacher.name}</Typography>
                <Typography variant="body2" color="textSecondary">{teacher.subject}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  {teacher.isFavorite ? (
                    <IconButton color="error" size="small">
                      <Favorite />
                    </IconButton>
                  ) : (
                    <IconButton color="default" size="small">
                      <Favorite />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
