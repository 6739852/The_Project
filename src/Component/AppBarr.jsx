import React, { useState } from 'react';
import {AppBar,Toolbar,IconButton,Typography,InputBase,Box,Badge,Drawer,List,ListItem, ListItemButton, ListItemIcon,ListItemText,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SubscriptiosIcon from '@mui/icons-material/Subscriptions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from './features/PurchasingGroup/PurchasingGroupSlice';

function MyBar() {

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const numOfCurrentGroups = useSelector(state => state.user.numOfCurrentGroups) ?? useSelector(state =>state.supplier.numOfCurrentGroups);
  const numOfWaitingGroups = useSelector(state => state.user.numOfWaitingGroups) ?? useSelector(state=>state.supplier.numOfWaitingGroups);  
  // const role =useSelector(state=>state.user.role)
  const role = localStorage.getItem('role');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearch = () => {
    window.location.href = `/ViewPurchasingGroup?search=${encodeURIComponent(searchTerm)}`;
    dispatch(searchGroups(searchTerm)); // שולח את החיפוש ל-Redux
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: 'בית', icon: <HomeIcon />, link: '/' },
    { text: 'אודות', icon: <InfoIcon />, link: '/About' },
    { text: 'צור קשר', icon: <ContactMailIcon />, link: '/contact' },
    { text: 'ספקים', icon: <PersonOutlineOutlinedIcon />, link: '/SupplierList' },
    { text: 'דוחות', icon: <AssessmentIcon />, link: '/SalesReports' },
    { text: 'מנויים', icon: <SubscriptiosIcon />, link: '/SalesReports' },
  ];

  return (
    <>
     <AppBar position="fixed" sx={{ backgroundColor: '#000000' }}>
     <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* אייקון תפריט */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
        </IconButton>

        <Link to={role === 'Supplier' ? '/ExistGroups' : role === 'User' ? '/Cart' : '/SignIn'}>
            <IconButton color="inherit" sx={{ color: 'white', mx: 1}}>
              <Badge badgeContent={numOfCurrentGroups} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>

          <Link to={role === 'Supplier' ? '/FaveSupplier' : role === 'User' ? '/Fave' : '/SignIn'}>
            <IconButton color="inherit" sx={{ color: 'white' }}>
              <Badge badgeContent={numOfWaitingGroups} color="error">
                <AccessTimeIcon />
              </Badge>
            </IconButton>
           </Link>

          <Link to="./SignIn">
            <IconButton color="inherit" sx={{ color: 'white', mx: 1 }}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Link>
          <Link to={role === 'Supplier' ? '/AddGroup' : role === 'User' ? '/WantToOpen' : '/SignIn'}>
            <IconButton color="inherit" sx={{ color: 'white', mx: 1 }}>
              <AddShoppingCartIcon />
            </IconButton>
          </Link>
        {/* אלמנטים מימין */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* שדה חיפוש */}
        <Box
        sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '20px',
                width: '700px',
                // justifyContent: 'space-between',
                marginRight: 6, // ריווח בין החיפוש לשאר האלמנטים
                marginLeft:15
        }}
        >
        <IconButton onClick={handleSearch} sx={{ color: 'action.active', mr: 14 }}>
                <SearchIcon style={{ transform: 'scaleX(-1)' }} />
        </IconButton>
        <InputBase
              placeholder="חיפוש מוצר או מותג"
              inputProps={{ "aria-label": "search" }}
              sx={{ marginLeft: "auto", flex: 1, textAlign: "right", paddingLeft: 50 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
        </Box>

        {/* שם האתר */}
        <Typography
        variant="h6"
        component="a"
        href="/"
        sx={{ textDecoration: 'none', color: 'inherit', marginRight: 2 }}
        >
        POWERBUY
        </Typography>
  </Box>
</Toolbar>
      </AppBar>
      {/* Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
          },
        }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ width: 250 }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component="a" href={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default MyBar;
