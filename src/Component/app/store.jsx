import { configureStore } from '@reduxjs/toolkit';
import PurchasingGroupSlice from '../features/PurchasingGroup/PurchasingGroupSlice';
import UseSlice from '../features/User/UserSlice'
import CategorySlice from '../features/Category/CategorySlice'
import { Category } from '@mui/icons-material';
import SupplierSlice from '../features/Supplier/SupplierSlice'
import WantToOpenSlice from '../features/WantToOpen/WantToOpenSlice';

const store = configureStore({
    reducer: {
        purchasingGroups: PurchasingGroupSlice,
        user: UseSlice,
        category: CategorySlice,
        supplier: SupplierSlice,
        wantToOpen: WantToOpenSlice
    }
});

export default store;