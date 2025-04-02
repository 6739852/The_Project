import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  //פונקציה שמעדכנת את הנתונים מהטופס
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //פונקציה של שליחת הטופס
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("הטופס נשלח:", formData);
  };

  return (
    <Container maxWidth="sm" >
      <Box
        sx={{
          mt: 15,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          direction: "rtl", // התאמה לעברית
          textAlign: "right",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          צור קשר
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="שם מלא"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ style: { textAlign: "right" } }} // כיוון הכתיבה לימין
          />
          <TextField
            fullWidth
            label="אימייל"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ style: { textAlign: "right" } }}
          />
          <TextField
            fullWidth
            label="הודעה"
            name="message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
            inputProps={{ style: { textAlign: "right" } }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            שלח הודעה
          </Button>
        </form>
      </Box>
    </Container>
  );
}
