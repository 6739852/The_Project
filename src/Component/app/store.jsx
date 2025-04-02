import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // localStorage as default storage
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import PurchasingGroupSlice from '../features/PurchasingGroup/PurchasingGroupSlice';
import UserSlice from '../features/User/UserSlice';
import CategorySlice from '../features/Category/CategorySlice';
import SupplierSlice from '../features/Supplier/SupplierSlice';
import WantToOpenSlice from '../features/WantToOpen/WantToOpenSlice';

// הגדרת rootReducer
const rootReducer = combineReducers({
    purchasingGroups: PurchasingGroupSlice,
    user: UserSlice,
    category: CategorySlice,
    supplier: SupplierSlice,
    wantToOpen: WantToOpenSlice,
});

// קביעת תצורת ה-persist
const persistConfig = {
    key: 'root',
    storage, // localStorage
    whitelist: ['user', 'category', 'supplier'], // אילו נתונים לשמור
};

// יצירת persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// יצירת ה-store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// יצירת persistor
export const persistor = persistStore(store);
export default store;
