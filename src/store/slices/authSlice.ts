import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // Simulate API call
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          email: credentials.email,
          displayName: 'Demo User',
          preferences: {
            dietaryRestrictions: [],
            allergies: [],
            favoriteIngredients: [],
            dislikedIngredients: [],
            cuisinePreferences: [],
            spiceLevel: 'medium',
            healthGoals: [],
            cookingSkillLevel: 'intermediate',
            maxCookingTime: 60,
          },
          subscription: 'free',
          createdAt: new Date(),
          lastLogin: new Date(),
        });
      }, 1000);
    });
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; displayName: string }) => {
    // Simulate API call
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          email: userData.email,
          displayName: userData.displayName,
          preferences: {
            dietaryRestrictions: [],
            allergies: [],
            favoriteIngredients: [],
            dislikedIngredients: [],
            cuisinePreferences: [],
            spiceLevel: 'medium',
            healthGoals: [],
            cookingSkillLevel: 'beginner',
            maxCookingTime: 30,
          },
          subscription: 'free',
          createdAt: new Date(),
          lastLogin: new Date(),
        });
      }, 1000);
    });
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  // Simulate API call
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload };
      }
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, updateUserPreferences, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;