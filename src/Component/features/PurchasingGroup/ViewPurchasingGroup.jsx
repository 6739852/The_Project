import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Margin, MaximizeSharp, Padding } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addPurchasingGroup, deletePurchasingGroup,updatePurchasingGroup } from './PurchasingGroupSlice';
import Grid from '@mui/material/Grid';
import { fetchPurchasingGroups } from './PurchasingGroupSlice';


export default function ViewPurchasingGroup() {
  
  const purchasingGroups = useSelector((state) => state.purchasingGroups.purchasingGroups);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPurchasingGroups());
  }, [dispatch]);

  return (
    <div style={{ paddingTop: '60px' }}>
      <Grid container spacing={2} justifyContent="center">
        {purchasingGroups.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={2} lg={2}>
            <Card sx={{ maxWidth: 200, maxHeight: 380, margin:1}}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                  sx={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {item.name}
                </Typography>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`data:image/jpeg;base64,${item.image}`}
                  alt="logo"
                  title="green iguana"
                />
                <Typography 
                  variant="body2"
                  sx={{ color: 'text.secondary', fontFamily: 'Arial, sans-serif' }}
                  align="center"
                >
                  {item.description}
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontFamily: 'Arial, sans-serif' }}
                  align="center"
                >
                  {item.amountMin}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">הצטרף</Button>
                <Button size="small">❤</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
