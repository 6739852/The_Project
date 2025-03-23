import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Badge from '@mui/material/Badge';
import Card from './features/User/Card'
import Fave from './features/User/Fave'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { height } from '@mui/system';
import Profil from './features/User/Profil'

function MyBar() {

  const [searchTerm, setSearchTerm] = useState('');

  const [openCard, setOpenCard] = useState(false);
  const [openFave, setOpenFave] = useState(false);
  const [openProfil, setOpenProfil] = useState(false);


//   const [badgeContentCard,setBadgeContentCard]=useState(1)
//   const [badgeContentFave,setbBadgeContentFave]=useState(0)

  const handleSearch = () => {
    // כאן תוסיף את הלוגיקה לביצוע חיפוש עם searchTerm
    console.log('חיפוש:', searchTerm);
    // לדוגמה, תוכל להשתמש ב-fetch או axios כדי לבצע בקשת API לחיפוש
  };
  const handleProfil = () => {
    setOpenProfil(true); 
  };
  const handleCloseProfil = () => {
    setOpenProfil(false); 
  };
  const handleFave = () => {
    setOpenFave(true); 
  };
  const handleCloseFave = () => {
    setOpenFave(false); 
  };
  const handleCard = () => {
    setOpenCard(true); 
  };
  const handleCloseCard = () => {
    setOpenCard(false); 
  };

const [openGroups, setOpenGroups] = useState(false);

return (
    <>
        <AppBar position="fixed" style={{ backgroundColor: '#3f51b5' }}>
                <Toolbar>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                <IconButton edge="start" color="primary" aria-label="menu" component="a" href="/">
                                        <img src="../Images/logo_1.jpg" alt="Flag" style={{ width: 50, height: 50 }} />
                                </IconButton>
                                <IconButton color="inherit" aria-label="cart" onClick={handleCard} sx={{ ml: 2 }}>
                                <Badge badgeContent={9} color="error">
                                <ShoppingCartOutlinedIcon />    
                               </Badge>
                                </IconButton>
                                <IconButton color="inherit" aria-label="favorites" onClick={handleFave}>
                                <Badge badgeContent={8} color="error">
                                        <FavoriteBorderOutlinedIcon />
                                        </Badge>
                                </IconButton>
                                <IconButton color="inherit" aria-label="profile" onClick={handleProfil}>
                                        <PersonOutlineOutlinedIcon />
                                </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, backgroundColor: '#f5f5f5', borderRadius: '20px', padding: 'px 10px', maxWidth: '300px' }}>
                                <IconButton onClick={handleSearch} sx={{ color: 'action.active', ml: 1 }}>
                                        <SearchIcon style={{ transform: 'scaleX(-1)' }} />
                                </IconButton>
                                <InputBase
                                        placeholder="חיפוש מוצר או מותג"
                                        inputProps={{ 'aria-label': 'search' }}
                                        sx={{ ml: 1, flex: 1, textAlign: 'right'}}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                />
                        </Box>
                        <Typography variant="h6" component="a" href="/" sx={{ ml: 2, textDecoration: 'none', color: 'inherit' }}>
                                POWERBUY
                        </Typography>
                </Toolbar>
                {openGroups && <GroupsComponent />}
        </AppBar>
        <Dialog open={openCard} onClose={handleCloseCard}>
        <DialogTitle>עגלת קניות</DialogTitle>
        <DialogContent>
          <Card />  {/* הקומפוננטה שלך */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCard} color="primary">סגור</Button>
        </DialogActions>
       </Dialog>
       <Dialog open={openFave} onClose={handleCloseFave} sx={{ height:'300px' }}>
        <DialogTitle>מה באלי לקנות מחר....</DialogTitle>
        <DialogContent>
          <Fave />  {/* הקומפוננטה שלך */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFave} color="primary">סגור</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openProfil} onClose={handleCloseProfil} sx={{ height:'300px' }}>
        <DialogTitle>הפרופיל שלי</DialogTitle>
        <DialogContent>
          <Profil />  {/* הקומפוננטה שלך */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfil} color="primary">סגור</Button>
        </DialogActions>
      </Dialog>
        </>
);
}

export default MyBar;