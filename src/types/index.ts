// User and Authentication Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  preferences: UserPreferences;
  subscription: SubscriptionType;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  favoriteIngredients: string[];
  dislikedIngredients: string[];
  cuisinePreferences: string[];
  spiceLevel: SpiceLevel;
  healthGoals: string[];
  cookingSkillLevel: SkillLevel;
  maxCookingTime: number;
}

export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'very_hot';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type SubscriptionType = 'free' | 'premium' | 'chef';

// Mood Types
export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  category: MoodCategory;
}

export type MoodCategory = 'positive' | 'negative' | 'neutral' | 'energetic' | 'calm';

export interface MoodEntry {
  id: string;
  userId: string;
  mood: Mood;
  intensity: number; // 1-10
  timestamp: Date;
  notes?: string;
  weatherCondition?: string;
  location?: string;
}

// Recipe Types
export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: SkillLevel;
  cuisine: string;
  mealType: MealType[];
  tags: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: NutritionInfo;
  ratingsAverage: number;
  ratingsCount: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  isKeto: boolean;
  isPaleo: boolean;
  sourceUrl?: string;
  authorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert' | 'drink';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
  isOptional?: boolean;
  substitutes?: string[];
  estimatedCost?: number;
}

export type IngredientCategory = 'protein' | 'vegetables' | 'fruits' | 'grains' | 'dairy' | 'spices' | 'condiments' | 'pantry';

export interface Instruction {
  step: number;
  description: string;
  duration?: number;
  imageUrl?: string;
  temperature?: number;
  tips?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  cholesterol: number;
  saturatedFat: number;
  unsaturatedFat: number;
  vitamins: { [key: string]: number };
  minerals: { [key: string]: number };
}

// Pantry and Grocery Types
export interface PantryItem {
  id: string;
  userId: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  expirationDate?: Date;
  purchaseDate: Date;
  location: string; // fridge, pantry, freezer
  isRunningLow: boolean;
  autoReorder: boolean;
}

export interface GroceryList {
  id: string;
  userId: string;
  name: string;
  items: GroceryItem[];
  isShared: boolean;
  sharedWith: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GroceryItem {
  id: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  isChecked: boolean;
  estimatedCost: number;
  store?: string;
  category: IngredientCategory;
  priority: Priority;
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// AI and Recommendations Types
export interface AIRecommendation {
  id: string;
  userId: string;
  mood: Mood;
  recipes: Recipe[];
  reasoning: string;
  confidence: number;
  timestamp: Date;
  feedback?: RecommendationFeedback;
}

export interface RecommendationFeedback {
  liked: boolean;
  rating: number;
  comment?: string;
  wasCooked: boolean;
  satisfaction: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

// Cooking Experience Types
export interface CookingSession {
  id: string;
  userId: string;
  recipeId: string;
  startTime: Date;
  endTime?: Date;
  currentStep: number;
  isCompleted: boolean;
  rating?: number;
  notes?: string;
  photos?: string[];
  modifications?: string[];
}

export interface Timer {
  id: string;
  name: string;
  duration: number;
  startTime: Date;
  isActive: boolean;
  isPaused: boolean;
  remainingTime: number;
}

// Social Features Types
export interface RecipeReview {
  id: string;
  userId: string;
  recipeId: string;
  rating: number;
  title: string;
  comment: string;
  photos?: string[];
  helpful: number;
  wasVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFollow {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface RecipeCollection {
  id: string;
  userId: string;
  name: string;
  description: string;
  recipes: string[];
  isPublic: boolean;
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Meal Planning Types
export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  meals: PlannedMeal[];
  groceryList?: string;
  nutritionSummary: NutritionSummary;
  estimatedCost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlannedMeal {
  id: string;
  date: Date;
  mealType: MealType;
  recipeId: string;
  servings: number;
  notes?: string;
  isCompleted: boolean;
}

export interface NutritionSummary {
  daily: NutritionInfo;
  weekly: NutritionInfo;
  goals: NutritionGoals;
  progress: { [key: string]: number };
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  waterIntake: number;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  cuisine?: string[];
  mealType?: MealType[];
  difficulty?: SkillLevel[];
  maxCookTime?: number;
  minRating?: number;
  dietaryRestrictions?: string[];
  availableIngredients?: string[];
  nutritionFilters?: NutritionFilters;
  sortBy?: SortOption;
  sortOrder?: 'asc' | 'desc';
}

export interface NutritionFilters {
  maxCalories?: number;
  minProtein?: number;
  maxCarbs?: number;
  maxFat?: number;
  maxSodium?: number;
}

export type SortOption = 'relevance' | 'rating' | 'cookTime' | 'difficulty' | 'calories' | 'createdAt';

// Notification Types
export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export type NotificationType = 'recommendation' | 'cooking_timer' | 'grocery_reminder' | 'meal_plan' | 'social' | 'system';

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// UI State Types
export interface UIState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  language: string;
  notifications: AppNotification[];
  activeTimers: Timer[];
  currentUser: User | null;
  isAuthenticated: boolean;
}

// App State Types
export interface AppState {
  user: User | null;
  recipes: Recipe[];
  pantry: PantryItem[];
  groceryLists: GroceryList[];
  mealPlans: MealPlan[];
  recommendations: AIRecommendation[];
  cookingSessions: CookingSession[];
  favorites: string[];
  searchFilters: SearchFilters;
  ui: UIState;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  displayName: string;
  confirmPassword: string;
}

export interface PreferencesForm {
  dietaryRestrictions: string[];
  allergies: string[];
  cuisinePreferences: string[];
  spiceLevel: SpiceLevel;
  healthGoals: string[];
  cookingSkillLevel: SkillLevel;
  maxCookingTime: number;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Analytics Types
export interface AnalyticsEvent {
  eventType: string;
  userId: string;
  data: any;
  timestamp: Date;
}

// Voice Command Types
export interface VoiceCommand {
  command: string;
  action: string;
  parameters?: any;
  confidence: number;
}

// Offline Storage Types
export interface OfflineData {
  recipes: Recipe[];
  pantry: PantryItem[];
  lastSync: Date;
  pendingSync: any[];
}