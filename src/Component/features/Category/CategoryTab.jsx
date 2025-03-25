import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from './CategorySlice';
import {Link} from 'react-router-dom'
import { bgcolor } from '@mui/system';

export default function CategoryTab() {
 
    const dispatch = useDispatch();
    // קבלת נתונים מה-Redux store
    const categories = useSelector(state => state.category.categories);
  
    React.useEffect(() => {
    dispatch(fetchCategories());
}, [dispatch]);
    
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

return (
    <Box
        sx={{
            flexGrow: 1,
            width: '100%',
            bgcolor: 'background.paper',
            position: 'sticky',
            top: 64, // Adjusted to stick below the toolbar (assuming toolbar height is 64px)
            width: '100%', // Set width to 100% of the viewport width
            left: 0, // Align to the left edge of the viewport
            marginBottom: 6,
            bgcolor: 'white', 
        }}
    >
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
        >
            {categories.map((category, index) => (
                <Link to={category.name}><Tab key={index} label={category.name} sx={{ minWidth: 'auto' }}/></Link>
            ))}
        </Tabs>
    </Box>
);
}
