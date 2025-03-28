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
                marginBottom:7,
                width: '100%',
                position: 'sticky',
                top: 64,
                left: 0,
                zIndex: 1000,
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                padding: '8px 0',
                display: 'flex',
                justifyContent: 'center',
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
                                fontWeight: value === index ? 'bold' : 'normal',
                                color: value === index ? '#ffffff' : '#333',
                                backgroundColor: value === index ? '#007BFF' : 'transparent',
                                transition: 'all 0.3s ease',
                                padding: '10px 16px',
                                minWidth: '120px',
                                textTransform: 'none',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0', // שינוי רקע במעבר
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
