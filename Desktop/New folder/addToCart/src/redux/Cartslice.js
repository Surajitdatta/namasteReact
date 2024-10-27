import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(i => i.id === item.id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }
    },
    
    removeItem: (state, action) => {
      const itemId = action.payload.id; 
      const existingItemIndex = state.items.findIndex(i => i.id === itemId);

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
    
        if (existingItem.quantity === 1) {
          state.items.splice(existingItemIndex, 1); 
        } else {
          state.items[existingItemIndex].quantity -= 1;
        }
      }
    },

    deleteItem: (state, action) => {
      const itemId = action.payload.id;
      state.items = state.items.filter(item => item.id !== itemId);
    }
  },
});

export const { addItem, removeItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
