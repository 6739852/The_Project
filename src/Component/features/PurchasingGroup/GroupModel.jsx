import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CardMedia } from "@mui/material";

export default function GroupModel({ product, open, onClose }){
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          style={{ borderRadius: 8 }}
        />
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ${product.price}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {product.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">סגור</Button>
        <Button variant="contained" color="primary">הוסף לעגלה</Button>
      </DialogActions>
    </Dialog>
  );
};
