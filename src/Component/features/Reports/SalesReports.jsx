import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const data = [
  { name: "ינואר", מכירות: 4000 },
  { name: "פברואר", מכירות: 3000 },
  { name: "מרץ", מכירות: 5000 },
  { name: "אפריל", מכירות: 7000 },
  { name: "מאי", מכירות: 6000 },
];

export default function SalesReports() {
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2, boxShadow: 3, borderRadius: 2, direction: "rtl" }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          דוח מכירות חודשי
        </Typography>
        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="מכירות" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
