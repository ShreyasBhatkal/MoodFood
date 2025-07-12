import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PantryItem, GroceryList } from '../../types';

interface PantryState {
  pantryItems: PantryItem[];
  groceryLists: GroceryList[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PantryState = {
  pantryItems: [],
  groceryLists: [],
  isLoading: false,
  error: null,
};

const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {
    addPantryItem: (state, action: PayloadAction<PantryItem>) => {
      state.pantryItems.push(action.payload);
    },
    removePantryItem: (state, action: PayloadAction<string>) => {
      state.pantryItems = state.pantryItems.filter(item => item.id !== action.payload);
    },
    updatePantryItem: (state, action: PayloadAction<PantryItem>) => {
      const index = state.pantryItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.pantryItems[index] = action.payload;
      }
    },
    addGroceryList: (state, action: PayloadAction<GroceryList>) => {
      state.groceryLists.push(action.payload);
    },
    removeGroceryList: (state, action: PayloadAction<string>) => {
      state.groceryLists = state.groceryLists.filter(list => list.id !== action.payload);
    },
    updateGroceryList: (state, action: PayloadAction<GroceryList>) => {
      const index = state.groceryLists.findIndex(list => list.id === action.payload.id);
      if (index !== -1) {
        state.groceryLists[index] = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addPantryItem,
  removePantryItem,
  updatePantryItem,
  addGroceryList,
  removeGroceryList,
  updateGroceryList,
  clearError,
} = pantrySlice.actions;

export default pantrySlice.reducer;