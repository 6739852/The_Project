import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from './CategorySlice';
import { Link } from 'react-router-dom';

export default function CategoryTab() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box 
            sx={{
                position: 'fixed',
                top: 64,
                left: 0,
                zIndex: 1000,
                backgroundColor: '#444444',
                boxShadow: '0 2px 8px rgb(255, 255, 255)',
                padding: '1px 0',
                display: 'flex'
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="קטגוריות מוצרים"
                sx={{
                    '& .MuiTabs-indicator': {
                        display: 'none', // הסרת הקו התחתון
                    },
                }}
            >
                {categories.map((category, index) => (
                    <Link
                        key={category.id}
                        to="/ViewPurchasingGroup"
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <Tab
                            label={category.name}
                            sx={{
                                transition: 'all 0.8s ease',
                                padding: '10px 16px',
                                minWidth: '110px',
                                textTransform: 'none',
                                whiteSpace: 'nowrap',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'white', // שינוי רקע במעבר
                                    color: 'black',
                                },
                                '&.Mui-selected': {
                                    color: '#ffffff',
                                    backgroundColor: '#007BFF', // צבע רקע לבחירה
                                },
                            }}
                        />
                    </Link>
                ))}
            </Tabs>
        </Box>
    );
}
