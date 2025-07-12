import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timer, AppNotification } from '../../types';

interface UIState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  language: string;
  notifications: AppNotification[];
  activeTimers: Timer[];
  sidebarOpen: boolean;
  currentPage: string;
}

const initialState: UIState = {
  isLoading: false,
  error: null,
  theme: 'light',
  language: 'en',
  notifications: [],
  activeTimers: [],
  sidebarOpen: false,
  currentPage: 'home',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    addTimer: (state, action: PayloadAction<Timer>) => {
      state.activeTimers.push(action.payload);
    },
    removeTimer: (state, action: PayloadAction<string>) => {
      state.activeTimers = state.activeTimers.filter(t => t.id !== action.payload);
    },
    updateTimer: (state, action: PayloadAction<Timer>) => {
      const index = state.activeTimers.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.activeTimers[index] = action.payload;
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setTheme,
  setLanguage,
  addNotification,
  removeNotification,
  addTimer,
  removeTimer,
  updateTimer,
  toggleSidebar,
  setSidebarOpen,
  setCurrentPage,
  clearError,
} = uiSlice.actions;

export default uiSlice.reducer;