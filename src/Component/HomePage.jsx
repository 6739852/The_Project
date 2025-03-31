import  React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Grid} from '@mui/material';
import { Typography, Button, Container } from "@mui/material";
import {getPurchaseGroupByRank } from './features/PurchasingGroup/PurchasingGroupSlice'
// import { useSelector,useDispatch } from 'react-redux';

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
  // const top1 = getPurchaseGroupByRank(1);
  // const top2 = getPurchaseGroupByRank(2);
  // const top3 = getPurchaseGroupByRank(3);
  // const top4 = getPurchaseGroupByRank(4);
  // const topGroups=[top1, top2, top3, top4];
  // const  nm= topGroups.map((response) => response.data);

  // console.log(nm)
  // // disputch=useDispatch();
  // // const TopGroups = useState(state=> state.purchasingGroups.RankPurchasingGroup)
  // const [topGroups, setTopGroups] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [topGroups, setTopGroups] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchTopGroups = async () => {
      // try {
      //   setLoading(true);
      //   setError(null);
  
        // שליחה של 4 בקשות, אחת לכל דירוג (1, 2, 3, 4)
        // const groupPromises = [1, 2, 3, 4].map(rank =>
          setTopGroups( getPurchaseGroupByRank(1)) // שליחה של הבקשה
        // );

        // מחכים לכל הקריאות להסתיים תוך שמירה על כל התוצאות
        // const results = await Promise.allSettled(groupPromises); // חכה לכל ה-Promises
  
        // סינון התשובות המוצלחות
        // const successfulResults = results.filter(result => result.status === 'fulfilled')
        //                                  .map(result => result.value?.data); // גישה לנתונים מתוך ה-Promise
  
      //   // בדיקה אם כל התשובות תקינות
      //   if (successfulResults.length < 4) {
      //     setError('אחת התשובות לא תקינה');
      //   } else {
      //     setTopGroups(successfulResults); // עדכון הסטייט עם התוצאות
      //   }
  
      // } catch (err) {
      //   setError('לא הצלחנו לשלוף את הקבוצות.');
      //   console.error('Error fetching groups:', err);
      // } finally {
      //   setLoading(false);
      // }
    // };
  
    // fetchTopGroups();
}, []);

  
  

  // if (loading) {
  //   return <p>טוען...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }
  console.log(topGroups)


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
    <Box
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 2,
    padding: 2,
    width: "100vw",
    height: "30vh"
  }}
>
  {/* {topGroups.map((group, index) => ( */}
    <Paper
      key={topGroups.id}
      sx={{
        padding: 1,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        boxShadow: 3,
      }}
    >
      {/* גישה לפרטי הקבוצה */}
      <Typography variant="h6" fontWeight="bold">
        {topGroups.name} {/* מציג את שם הקבוצה */}
      </Typography>
      <Typography variant="body2">
        Description: {topGroups.description} {/* מציג את תיאור הקבוצה */}
      </Typography>
      <Typography variant="body2">
        Score: {topGroups.score} {/* מציג את הניקוד של הקבוצה */}
      </Typography>
    </Paper>
  {/* ))} */}
</Box>
</Box>

  );
}
