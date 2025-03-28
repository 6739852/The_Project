import React from "react";
import { Container, Typography, Card, CardContent, Grid, Avatar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 5, textAlign: "right", direction: "rtl" }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
            <InfoIcon />
          </Avatar>
          <Typography variant="h4" gutterBottom textAlign="center">
            אודותינו – לקנות חכם יותר, יחד!
          </Typography>
          <Typography variant="body1" paragraph>
            ברוכים הבאים ל-[שם האתר], הפלטפורמה החדשנית שמחברת בין אנשים שרוצים לקנות חכם ולחסוך כסף דרך כוח הקנייה הקבוצתי!
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            איך זה עובד?
          </Typography>
          <Typography variant="body1" paragraph>
            במקום לקנות לבד ולשלם ביוקר, אנחנו מחברים קונים עם אותם צרכים לקבוצות רכישה חכמות, ומנהלים משא ומתן מול ספקים כדי להשיג את המחירים הכי טובים. ככל שהקבוצה גדלה – ההנחה גדלה!
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="primary">
                מה מייחד אותנו?
              </Typography>
              <Typography variant="body2">
                ✅ הנחות בלעדיות – בזכות קנייה מרוכזת, אנו משיגים מחירים נמוכים משמעותית מהמחיר הרגיל.<br />
                ✅ ממשק ידידותי וקל לשימוש – מצטרפים לקבוצות רכישה בלחיצת כפתור ומקבלים עדכונים שוטפים.<br />
                ✅ שירות אמין ומאובטח – כל הספקים שלנו נבחרים בקפידה, והמערכת מבטיחה חוויית קנייה בטוחה ושקופה.<br />
                ✅ מגוון רחב של מוצרים ושירותים – החל ממוצרי חשמל, ריהוט ומזון ועד ביטוחים, נופש ורכישות נדל"ן.<br />
                ✅ שירות לקוחות אישי – אנחנו כאן כדי ללוות אותך בכל שלב בתהליך, ולוודא שתקבל את המוצר או השירות הטוב ביותר.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="primary">
                הצטרפו למהפכת הקנייה החכמה!
              </Typography>
              <Typography variant="body2">
                חיסכון משמעותי מתחיל כאן. הצטרפו עכשיו לאחת מקבוצות הרכישה שלנו, ותתחילו לקנות חכם יותר!
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
