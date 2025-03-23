import React ,{useEffect} from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import { Facebook, Instagram, Pinterest, Twitter, YouTube, Language } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./features/Category/CategorySlice";

const Footer = () => {

   const dispatch=useDispatch()
   const categories=useSelector(state=>state.category.categories)

    React.useEffect(() => {dispatch(fetchCategories());}, [dispatch]);

    return (
    <Box sx={{ textAlign: "right",bgcolor: "#fff", color: "#333", py: 4, mt: 4, fontFamily: "Arial", borderTop: "1px solid #ddd"  }}>
      <Container maxWidth="lg">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                הרשתות החברתיות שלנו
              </Typography>
              <Box>
                <IconButton href="#" color="inherit"><YouTube /></IconButton>
                <IconButton href="#" color="inherit"><Pinterest /></IconButton>
                <IconButton href="#" color="inherit"><Instagram /></IconButton>
                <IconButton href="#" color="inherit"><Twitter /></IconButton>
                <IconButton href="#" color="inherit"><Facebook /></IconButton>
              </Box>
            </Box>

            {/* בחר שפה */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Language sx={{ mr: 1 }} />
          <Typography variant="body1" fontWeight="bold" sx={{ cursor: "pointer" }}>
            בחר שפה עברית | English
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4} justifyContent="center">
          {/* עזרה */}
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">עזרה</Typography>
            <Link href="#" color="inherit" display="block">החזרת פריטים</Link>
            <Link href="#" color="inherit" display="block">מידע אודות משלוח</Link>
            <Link href="#" color="inherit" display="block">צור קשר</Link>
            <Link href="#" color="inherit" display="block">קריאה להחזרת מוצר (ריקול)</Link>
          </Grid>

          {/* פרטיות וחוקים */}
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">פרטיות וחוקים</Typography>
            <Link href="#" color="inherit" display="block">מדיניות פרטיות ועוגיות (קבצי cookie)</Link>
            <Link href="#" color="inherit" display="block">תקנון ותנאי שימוש</Link>
          </Grid>

        {/* מחלקות */} 
                <Grid item xs={12} sm={2}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">מחלקות</Typography>
                    {categories.map((category,index )=>(<Link key={index} href="#" color="inherit" display="block"> {category.name}</Link>))}
                </Grid>

        {/* שירותים אחרים */}
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">שירותים אחרים</Typography>
            <Link href="#" color="inherit" display="block">תקשורת ועיתונות</Link>
            <Link href="#" color="inherit" display="block">החברה</Link>
            <Link href="#" color="inherit" display="block">דרושים</Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" align="center" color="textSecondary">
          © {new Date().getFullYear()} כל הזכויות שמורות -   נעמי וגילי
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
