import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AIRecommendation } from '../../types';

interface RecommendationsState {
  recommendations: AIRecommendation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RecommendationsState = {
  recommendations: [],
  isLoading: false,
  error: null,
};

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    addRecommendation: (state, action: PayloadAction<AIRecommendation>) => {
      state.recommendations.push(action.payload);
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addRecommendation, clearRecommendations, setLoading, setError } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;