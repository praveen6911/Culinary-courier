
import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';

const appStore=configureStore(
    {
        reducer:{
            cart:cartSlice
        }
    }
);

export default appStore;