import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

export default function AddGroup() {
   
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return(
    <>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
     <h1 className='title'>הצעה לקבוצת רכישה</h1>
      <TextField id="outlined-basic" label="שם מוצר" variant="outlined" />
      <TextField id="filled-basic" label="תאור" variant="filled" />
      <br />
      <TextField id="standard-basic" label="מחיר" variant="standard" />
      <TextField id="standard-basic" label="כמות אנשים המינימלית" variant="standard" />
      <br />
      <TextField id="standard-basic" label="תאריך סגירה" variant="standard" />
      <TextField id="standard-basic" label="תנאי החבילה" variant="standard" />
      <br />
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="קטוגריה"
          onChange={handleChange}
        >
          <MenuItem value={10}>מוצרי חשמל</MenuItem>
          <MenuItem value={20}>ביגוד</MenuItem>
          <MenuItem value={30}>הנעלה</MenuItem>
        </Select>
      </FormControl>
      <Link
         component="button"
          variant="body2"
          onClick={() => {
           console.info("I'm a button.");
         }}
     >
     הוספת תמונה
    </Link>
    <br />
    </Box>
    <FormControlLabel control={<Checkbox/>} label="אני מאשר את מדניות האתר" />

    </>
    )
}
