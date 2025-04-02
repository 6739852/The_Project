import React, { useState } from 'react';
import { Typography, Button, Card, CardContent, Grid, Link } from '@mui/material';
import { Box } from "@mui/material";

function Gemini({ string }) {
    const [price, setPrice] = useState('');
    // const [zapLink ,setZapLink]= useState('')
    const [error, setError] = useState(null);

    // פונקציה לשליחת הבקשה עם שם המוצר שהתקבל ב-props
    const handleSubmit = async () => {
        setError(null);
        try {
            const result = await fetch('https://localhost:7022/api/Product/GetProductPrice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ProductName: string }) // שליחת המשתנה שהתקבל בפרופס
            });

            if (!result.ok) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }

            const data = await result.json();
            console.log("Data from server:", data); // בדיקה בקונסול

            setPrice(data.price); // עדכון המחיר שהתקבל
            // setZapLink(data.zapLink); // הצגת קישור לזאפ
        } catch (err) {
            setError(err.message);
            setPrice('');
        }
    };

    return (
        <div style={{ marginTop: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'right' }}>
            {/* כפתור ששולח את המידע באופן אוטומטי */}
            <Button onClick={handleSubmit} variant="contained" color="primary">
                 לחץ כאן לקבלת מידע על מחיר המוצר בשוק הכללי
            </Button>

            <Box
                component="img"
                src="/Images/geminiGoogel.png" // הנתיב היחסי מתוך `public`
                alt="לוגו ג'מיני"
                sx={{ width: "30vw", height: "auto", borderRadius: "8px", marginTop: "20px" }}
            />

            {price && (
                <Card style={{ maxWidth: '600px', marginTop: '20px', padding: '16px' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            מידע על המוצר: {string}
                        </Typography>
                        <Typography variant="h6" color="primary" paragraph>
                            ₪{price}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            היינו ממליצים לבדוק את המחירים במגוון חנויות על מנת לקבל את ההחלטה הטובה ביותר.
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            אם תרצה לראות את המוצרים הזולים ביותר, תוכל ללחוץ על הקישורים למטה:
                        </Typography>

                        {/* הוספת קישורים לחנויות */}
                        <Grid container spacing={1} style={{ marginTop: '10px' }}>
                            <Grid item>
                                <Link href="https://www.zap.co.il" target="_blank" color="primary">
                                    ZAP - השוואת מחירים
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="https://www.lastprice.co.il" target="_blank" color="primary">
                                    LastPrice
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="https://www.wisebuy.co.il" target="_blank" color="primary">
                                    WiseBuy
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
            {/* {zapLink && (
                <a href={zapLink} target="_blank" rel="noopener noreferrer">
                    קישור לזאפ
                </a>
            )} */}
            {error && (
                <Typography variant="body2" color="error" style={{ marginTop: '16px' }}>
                    שגיאה: {error}
                </Typography>
            )}
        </div>
    );
}

export default Gemini;
