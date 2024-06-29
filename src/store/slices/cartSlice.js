import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
            
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            //using redux toolkit we need to mutate the existing state or return a new state
            //return ( state = {items:[]});
            state.items = [];
            // state.items.length=0;
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer