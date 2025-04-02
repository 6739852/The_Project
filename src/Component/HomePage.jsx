import  React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Button, Container } from "@mui/material";
import {getPurchaseGroupByRank } from './features/PurchasingGroup/PurchasingGroupSlice'
import {Link} from 'react-router-dom'
import { Margin } from '@mui/icons-material';

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

  const [topGroup1, setTopGroup1] = useState({});
  const [topGroup2, setTopGroup2] = useState({});
  const [topGroup3, setTopGroup3] = useState({});
  const [topGroup4, setTopGroup4] = useState({});
  const [topGroups, setTopGroups] = useState([]);

  useEffect(() => {
  const fetchTopGroups = async () => {
    try {
      // מחכים לכל הבקשות במקביל
      const data1 = await getPurchaseGroupByRank(1);
      const data2 = await getPurchaseGroupByRank(2);
      const data3 = await getPurchaseGroupByRank(3);
      const data4 = await getPurchaseGroupByRank(4);

      // עדכון הסטייט עם כל הנתונים יחד
      setTopGroups([data1, data2, data3, data4]);

      console.log("Top groups data:", [data1, data2, data3, data4]); // הדפסה לבדיקת הנתונים

    } catch (error) {
      console.error("Error fetching group:", error);
    }
  };

  fetchTopGroups();
}, []);

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
      <Box
        sx={{
          backgroundColor: "#C8FF33",
          padding: "20px",
          textAlign: "center",
          width: "100",
        }}
      >
        <Link to='/ViewPurchasingGroup' state={{ condition: "date"}} style={{ textDecoration: "none" }}>
          <Typography variant="h6" fontWeight="bold" color='grey' sx={{marginTop:2}}>
            מהרו להצטרף! קבוצות לפני סגירה
          </Typography>
        </Link>
      </Box>
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
          הנחה לרשומים 10%
        </Typography>
        <Typography variant="h6" gutterBottom>
          <Link to='./SignIn' style={{ textDecoration: "none" }}>
            <Button variant="outlined" sx={{ color: "#fff", borderColor: "#fff" }}>SUBSCRIPTIONS</Button>
          </Link>
        </Typography>
        <Typography variant="body3">
          🎁 הרשמו עכשיו וקבלו הטבות 
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          padding: 2,
          width: "100vw",
          height: "60vh",
          overflowY: 'hidden'
        }}
      >
        {topGroups.map((group, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              backgroundColor: "#000000",
              boxShadow: 3,
              padding: 0,
            }}
          >
            <Link to='/GroupModel' state={{ productId: group.id }} style={{ textDecoration: "none" }}>
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${group.image}`}
                alt={group.name}
              />
              <br />
              <Typography 
                variant="body3" 
                color='white' 
              >
               <span role="img" aria-label="click hand">👉  היכנס עכשיו </span>
              </Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
