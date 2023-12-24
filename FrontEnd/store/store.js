import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/auth/authSlice";
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2";
import {combineReducers} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import walletSlice from "@/features/wallet/walletSlice";
import transactionSlice from "@/features/transaction/transactionSlice";
import timeSlice from "@/features/time/timeSlice";
import categorySlice from "@/features/category/categorySlice";
import reportTimeSlice from "@/features/reportTime/reportTimeSLice";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['time', 'reportTime']
}

const reducer = combineReducers({
    auth: authSlice.reducer,
    wallet: walletSlice.reducer,
    transaction: transactionSlice.reducer,
    time: timeSlice.reducer,
    category: categorySlice.reducer,
    reportTime: reportTimeSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

export default store

