import { configureStore } from '@reduxjs/toolkit';
import purchasingGroupSlice from '../features/PurchasingGroup/PurchasingGroupSlice';
import useSlice from '../features/User/UserSlice'
import categorySice from '../features/Category/CategorySlice'
import { Category } from '@mui/icons-material';

const store = configureStore({
    reducer: {
        purchasingGroups: purchasingGroupSlice,
        user: useSlice,
        category: categorySice
    }
});

export default store;