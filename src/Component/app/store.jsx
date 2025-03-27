import { configureStore } from '@reduxjs/toolkit';
import PurchasingGroupSlice from '../features/PurchasingGroup/PurchasingGroupSlice';
import UseSlice from '../features/User/UserSlice'
import CategorySlice from '../features/Category/CategorySlice'
import { Category } from '@mui/icons-material';
import SupplierSlice from '../features/Supplier/SupplierSlice'
import WantToOpenSlice from '../features/WantToOpen/WantToOpenSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const store = configureStore({
    reducer: {
        purchasingGroups: PurchasingGroupSlice,
        user: UseSlice,
        category: CategorySlice,
        supplier: SupplierSlice,
        wantToOpen: WantToOpenSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

// const reducers = {
//     couriers: courierReducer,
//     addresses: addressReducer,
//     users: userSlice,
//     products: productSlice,
//     categories: categorySlice,
//     inCart: cartSlice,
//     stores: storeSlice,
//     orders: orderSlice
//   }
//   const rootReducer = combineReducers(reducers);
  
//   const persistConfig = {
//     key: 'root',
//     storage: sessionStorage,
//     whitelist: ['couriers', 'users', 'categories'],
  
//   };
  
//   const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
  
//   });
//   export const persistor = persistStore(store);

export default store;