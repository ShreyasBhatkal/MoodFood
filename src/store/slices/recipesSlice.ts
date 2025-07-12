import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, SearchFilters } from '../../types';

interface RecipesState {
  recipes: Recipe[];
  favorites: string[];
  searchResults: Recipe[];
  searchFilters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  currentRecipe: Recipe | null;
}

const initialState: RecipesState = {
  recipes: [],
  favorites: [],
  searchResults: [],
  searchFilters: {},
  isLoading: false,
  error: null,
  currentRecipe: null,
};

// Mock recipe data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Comfort Mac and Cheese',
    description: 'Creamy, cheesy comfort food perfect for when you need a warm hug',
    imageUrl: 'https://images.unsplash.com/photo-1543826173-1ad6e3b161bb?w=400',
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    difficulty: 'intermediate',
    cuisine: 'American',
    mealType: ['dinner'],
    tags: ['comfort', 'cheesy', 'warm'],
    ingredients: [
      { id: '1', name: 'Pasta', amount: 1, unit: 'lb', category: 'grains' },
      { id: '2', name: 'Cheese', amount: 2, unit: 'cups', category: 'dairy' },
    ],
    instructions: [
      { step: 1, description: 'Cook pasta according to package directions' },
      { step: 2, description: 'Make cheese sauce' },
      { step: 3, description: 'Combine pasta and cheese sauce' },
    ],
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 48,
      fat: 20,
      fiber: 2,
      sugar: 4,
      sodium: 780,
      cholesterol: 60,
      saturatedFat: 12,
      unsaturatedFat: 8,
      vitamins: {},
      minerals: {},
    },
    ratingsAverage: 4.5,
    ratingsCount: 120,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
    isKeto: false,
    isPaleo: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Energizing Green Smoothie',
    description: 'A vibrant green smoothie packed with nutrients to boost your energy',
    imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    servings: 1,
    difficulty: 'beginner',
    cuisine: 'Healthy',
    mealType: ['breakfast', 'snack'],
    tags: ['healthy', 'energizing', 'quick'],
    ingredients: [
      { id: '1', name: 'Spinach', amount: 1, unit: 'cup', category: 'vegetables' },
      { id: '2', name: 'Banana', amount: 1, unit: 'piece', category: 'fruits' },
      { id: '3', name: 'Almond milk', amount: 1, unit: 'cup', category: 'dairy' },
    ],
    instructions: [
      { step: 1, description: 'Add all ingredients to blender' },
      { step: 2, description: 'Blend until smooth' },
      { step: 3, description: 'Pour into glass and enjoy' },
    ],
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 35,
      fat: 3,
      fiber: 6,
      sugar: 20,
      sodium: 120,
      cholesterol: 0,
      saturatedFat: 0,
      unsaturatedFat: 3,
      vitamins: {},
      minerals: {},
    },
    ratingsAverage: 4.2,
    ratingsCount: 89,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    isDairyFree: true,
    isKeto: false,
    isPaleo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (filters?: SearchFilters) => {
    return new Promise<Recipe[]>((resolve) => {
      setTimeout(() => {
        resolve(mockRecipes);
      }, 1000);
    });
  }
);

export const searchRecipes = createAsyncThunk(
  'recipes/searchRecipes',
  async (filters: SearchFilters) => {
    return new Promise<Recipe[]>((resolve) => {
      setTimeout(() => {
        let results = mockRecipes;
        if (filters.query) {
          results = results.filter(recipe =>
            recipe.title.toLowerCase().includes(filters.query!.toLowerCase()) ||
            recipe.description.toLowerCase().includes(filters.query!.toLowerCase())
          );
        }
        resolve(results);
      }, 500);
    });
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (recipeId: string) => {
    return new Promise<Recipe>((resolve, reject) => {
      setTimeout(() => {
        const recipe = mockRecipes.find(r => r.id === recipeId);
        if (recipe) {
          resolve(recipe);
        } else {
          reject(new Error('Recipe not found'));
        }
      }, 500);
    });
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSearchFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.searchFilters = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipeId = action.payload;
      const index = state.favorites.indexOf(recipeId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(recipeId);
      }
    },
    setCurrentRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.currentRecipe = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      // Search recipes
      .addCase(searchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to search recipes';
      })
      // Fetch recipe by ID
      .addCase(fetchRecipeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch recipe';
      });
  },
});

export const {
  setSearchFilters,
  clearSearchResults,
  toggleFavorite,
  setCurrentRecipe,
  clearError,
} = recipesSlice.actions;

export default recipesSlice.reducer;