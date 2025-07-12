import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Mood, MoodEntry } from '../../types';

interface MoodState {
  currentMood: Mood | null;
  moodHistory: MoodEntry[];
  availableMoods: Mood[];
  isLoading: boolean;
  error: string | null;
}

const mockMoods: Mood[] = [
  {
    id: '1',
    name: 'happy',
    emoji: '😊',
    color: '#FFD700',
    description: 'Feeling joyful and content',
    category: 'positive',
  },
  {
    id: '2',
    name: 'sad',
    emoji: '😢',
    color: '#4682B4',
    description: 'Feeling down or melancholy',
    category: 'negative',
  },
  {
    id: '3',
    name: 'stressed',
    emoji: '😰',
    color: '#FF6B6B',
    description: 'Feeling overwhelmed or anxious',
    category: 'negative',
  },
  {
    id: '4',
    name: 'energetic',
    emoji: '⚡',
    color: '#FF4500',
    description: 'Feeling full of energy and ready to go',
    category: 'energetic',
  },
  {
    id: '5',
    name: 'calm',
    emoji: '🧘',
    color: '#98FB98',
    description: 'Feeling peaceful and relaxed',
    category: 'calm',
  },
  {
    id: '6',
    name: 'lazy',
    emoji: '😴',
    color: '#D3D3D3',
    description: 'Feeling sluggish and unmotivated',
    category: 'neutral',
  },
  {
    id: '7',
    name: 'romantic',
    emoji: '💕',
    color: '#FF69B4',
    description: 'Feeling loving and affectionate',
    category: 'positive',
  },
  {
    id: '8',
    name: 'adventurous',
    emoji: '🗺️',
    color: '#32CD32',
    description: 'Feeling ready to try new things',
    category: 'energetic',
  },
];

const initialState: MoodState = {
  currentMood: null,
  moodHistory: [],
  availableMoods: mockMoods,
  isLoading: false,
  error: null,
};

export const saveMoodEntry = createAsyncThunk(
  'mood/saveMoodEntry',
  async (moodEntry: Omit<MoodEntry, 'id'>) => {
    return new Promise<MoodEntry>((resolve) => {
      setTimeout(() => {
        const entry: MoodEntry = {
          ...moodEntry,
          id: Date.now().toString(),
        };
        resolve(entry);
      }, 500);
    });
  }
);

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setCurrentMood: (state, action: PayloadAction<Mood>) => {
      state.currentMood = action.payload;
    },
    clearCurrentMood: (state) => {
      state.currentMood = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMoodEntry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveMoodEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moodHistory.push(action.payload);
      })
      .addCase(saveMoodEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to save mood entry';
      });
  },
});

export const { setCurrentMood, clearCurrentMood, clearError } = moodSlice.actions;
export default moodSlice.reducer;