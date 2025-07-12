import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Avatar,
  Paper,
  LinearProgress,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Restaurant,
  Mood,
  ShoppingCart,
  Settings,
  Search,
  Favorite,
  FavoriteBorder,
  Add,
  Timer,
  Close,
  Notifications,
  Person,
  Kitchen,
  LocalGroceryStore,
  CalendarToday,
  TrendingUp,
  Share,
  Star,
  AccessTime,
  People,
  ChefHat,
  Lightbulb,
  SpatialAudio,
  VolumeUp,
  VolumeOff,
  PlayArrow,
  Pause,
  Stop,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { store } from './store';
import './App.css';

// Mock data for demonstration
const mockMoods = [
  { id: '1', name: 'Happy', emoji: '😊', color: '#FFD700', description: 'Feeling joyful and content' },
  { id: '2', name: 'Sad', emoji: '😢', color: '#4682B4', description: 'Feeling down or melancholy' },
  { id: '3', name: 'Stressed', emoji: '😰', color: '#FF6B6B', description: 'Feeling overwhelmed' },
  { id: '4', name: 'Energetic', emoji: '⚡', color: '#FF4500', description: 'Full of energy' },
  { id: '5', name: 'Calm', emoji: '🧘', color: '#98FB98', description: 'Peaceful and relaxed' },
  { id: '6', name: 'Lazy', emoji: '😴', color: '#D3D3D3', description: 'Feeling sluggish' },
  { id: '7', name: 'Romantic', emoji: '💕', color: '#FF69B4', description: 'Feeling loving' },
  { id: '8', name: 'Adventurous', emoji: '🗺️', color: '#32CD32', description: 'Ready for new things' },
];

const mockRecipes = [
  {
    id: '1',
    title: 'Comfort Mac and Cheese',
    description: 'Creamy, cheesy comfort food perfect for when you need a warm hug',
    imageUrl: 'https://images.unsplash.com/photo-1543826173-1ad6e3b161bb?w=400&h=300&fit=crop',
    cookTime: 30,
    difficulty: 'Easy',
    rating: 4.5,
    tags: ['Comfort', 'Vegetarian'],
    mood: 'Sad',
    calories: 450,
  },
  {
    id: '2',
    title: 'Energizing Green Smoothie',
    description: 'A vibrant green smoothie packed with nutrients to boost your energy',
    imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop',
    cookTime: 5,
    difficulty: 'Easy',
    rating: 4.2,
    tags: ['Healthy', 'Vegan'],
    mood: 'Energetic',
    calories: 180,
  },
  {
    id: '3',
    title: 'Romantic Pasta Carbonara',
    description: 'Classic Italian pasta perfect for a romantic dinner',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    cookTime: 25,
    difficulty: 'Medium',
    rating: 4.8,
    tags: ['Italian', 'Romantic'],
    mood: 'Romantic',
    calories: 520,
  },
  {
    id: '4',
    title: 'Zen Buddha Bowl',
    description: 'A balanced, colorful bowl to promote mindfulness and calm',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    cookTime: 20,
    difficulty: 'Easy',
    rating: 4.3,
    tags: ['Healthy', 'Vegetarian'],
    mood: 'Calm',
    calories: 380,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B',
      light: '#FFE5E5',
      dark: '#CC5555',
    },
    secondary: {
      main: '#4ECDC4',
      light: '#E0F7F6',
      dark: '#3EA59A',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function MoodMealApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedMood, setSelectedMood] = useState<any>(null);
  const [moodDialogOpen, setMoodDialogOpen] = useState(false);
  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [timers, setTimers] = useState<any[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [pantryItems, setPantryItems] = useState<string[]>(['Tomatoes', 'Onions', 'Garlic', 'Olive Oil']);
  const [groceryList, setGroceryList] = useState<string[]>(['Milk', 'Eggs', 'Bread']);
  const [user, setUser] = useState({
    name: 'Alex',
    preferences: {
      dietary: ['Vegetarian'],
      allergies: [],
      cuisines: ['Italian', 'Asian', 'Mexican'],
      spiceLevel: 'Medium',
    },
  });

  const handleMoodSelect = (mood: any) => {
    setSelectedMood(mood);
    setMoodDialogOpen(false);
    // Filter recipes based on mood
    const moodBasedRecipes = mockRecipes.filter(recipe => recipe.mood === mood.name);
    setRecommendedRecipes(moodBasedRecipes.length > 0 ? moodBasedRecipes : mockRecipes.slice(0, 3));
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const startTimer = (name: string, duration: number) => {
    const timer = {
      id: Date.now().toString(),
      name,
      duration,
      startTime: Date.now(),
      isActive: true,
    };
    setTimers(prev => [...prev, timer]);
  };

  const sidebarItems = [
    { text: 'Home', icon: <Home />, tab: 0 },
    { text: 'Mood Selector', icon: <Mood />, tab: 1 },
    { text: 'Recipes', icon: <Restaurant />, tab: 2 },
    { text: 'Pantry', icon: <Kitchen />, tab: 3 },
    { text: 'Grocery List', icon: <LocalGroceryStore />, tab: 4 },
    { text: 'Meal Planner', icon: <CalendarToday />, tab: 5 },
    { text: 'Nutrition', icon: <TrendingUp />, tab: 6 },
    { text: 'Social', icon: <Share />, tab: 7 },
    { text: 'Settings', icon: <Settings />, tab: 8 },
  ];

  const MoodSelector = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        How are you feeling today?
      </Typography>
      <Grid container spacing={3}>
        {mockMoods.map((mood) => (
          <Grid item xs={6} sm={4} md={3} key={mood.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  height: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: selectedMood?.id === mood.id ? mood.color + '20' : 'white',
                  border: selectedMood?.id === mood.id ? `2px solid ${mood.color}` : 'none',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleMoodSelect(mood)}
              >
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {mood.emoji}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {mood.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', px: 1 }}>
                  {mood.description}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const RecipeCard = ({ recipe }: { recipe: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={recipe.imageUrl}
          alt={recipe.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
              {recipe.title}
            </Typography>
            <IconButton onClick={() => toggleFavorite(recipe.id)}>
              {favorites.includes(recipe.id) ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {recipe.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={recipe.rating} readOnly size="small" />
            <Typography variant="body2">{recipe.rating}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {recipe.tags.map((tag: string) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime fontSize="small" />
                <Typography variant="body2">{recipe.cookTime}min</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {recipe.calories} cal
              </Typography>
            </Box>
            <Button variant="contained" size="small" onClick={() => startTimer(`${recipe.title} Timer`, recipe.cookTime * 60)}>
              Cook Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const PantryTab = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Pantry
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Available Ingredients
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {pantryItems.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => setPantryItems(prev => prev.filter(i => i !== item))}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            <Button
              variant="outlined"
              startIcon={<Add />}
              sx={{ mt: 2 }}
              onClick={() => {
                const newItem = prompt('Add ingredient:');
                if (newItem) setPantryItems(prev => [...prev, newItem]);
              }}
            >
              Add Ingredient
            </Button>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recipes You Can Make
            </Typography>
            <Grid container spacing={2}>
              {mockRecipes.slice(0, 2).map((recipe) => (
                <Grid item xs={12} sm={6} key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" fullWidth startIcon={<Restaurant />}>
                Generate Recipe
              </Button>
              <Button variant="outlined" fullWidth startIcon={<ShoppingCart />}>
                Add to Grocery List
              </Button>
              <Button variant="outlined" fullWidth startIcon={<Search />}>
                Scan Ingredients
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const GroceryListTab = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Grocery List
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shopping List
            </Typography>
            <List>
              {groceryList.map((item, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemText primary={item} />
                  <IconButton onClick={() => setGroceryList(prev => prev.filter((_, i) => i !== index))}>
                    <Close />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => {
                const newItem = prompt('Add item:');
                if (newItem) setGroceryList(prev => [...prev, newItem]);
              }}
            >
              Add Item
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Online
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" fullWidth color="success">
                Order via Instacart
              </Button>
              <Button variant="outlined" fullWidth>
                Order via Amazon Fresh
              </Button>
              <Button variant="outlined" fullWidth>
                Find Local Stores
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const HomeTab = () => (
    <Box sx={{ p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome to MoodMeal! 🍽️
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          AI-powered recipe recommendations based on your mood
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<Mood />}
          onClick={() => setMoodDialogOpen(true)}
          sx={{ mr: 2 }}
        >
          Tell us your mood
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Restaurant />}
          onClick={() => setCurrentTab(2)}
        >
          Browse Recipes
        </Button>
      </Box>

      {selectedMood && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Perfect for your {selectedMood.name.toLowerCase()} mood {selectedMood.emoji}
          </Typography>
          <Grid container spacing={3}>
            {recommendedRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Stats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary.main">
                {mockRecipes.length}
              </Typography>
              <Typography variant="body1">Recipes Available</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="secondary.main">
                {favorites.length}
              </Typography>
              <Typography variant="body1">Favorites</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="success.main">
                {pantryItems.length}
              </Typography>
              <Typography variant="body1">Pantry Items</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="warning.main">
                {timers.length}
              </Typography>
              <Typography variant="body1">Active Timers</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <HomeTab />;
      case 1:
        return <MoodSelector />;
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              All Recipes
            </Typography>
            <Grid container spacing={3}>
              {mockRecipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 3:
        return <PantryTab />;
      case 4:
        return <GroceryListTab />;
      case 5:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Meal Planner
            </Typography>
            <Typography variant="body1">
              Weekly meal planning feature coming soon! Plan your meals based on your mood patterns and nutritional goals.
            </Typography>
          </Box>
        );
      case 6:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Nutrition Tracker
            </Typography>
            <Typography variant="body1">
              Track your daily nutrition intake and get personalized recommendations based on your health goals.
            </Typography>
          </Box>
        );
      case 7:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Social Features
            </Typography>
            <Typography variant="body1">
              Share recipes, create cooking challenges, and connect with other food enthusiasts!
            </Typography>
          </Box>
        );
      case 8:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Settings
            </Typography>
            <Typography variant="body1">
              Customize your preferences, dietary restrictions, and app settings.
            </Typography>
          </Box>
        );
      default:
        return <HomeTab />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setSidebarOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            MoodMeal
          </Typography>
          <IconButton color="inherit" onClick={() => setVoiceEnabled(!voiceEnabled)}>
            {voiceEnabled ? <VolumeUp /> : <VolumeOff />}
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={timers.length} color="secondary">
              <Timer />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            mt: 8,
          },
        }}
      >
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem
              key={item.text}
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setCurrentTab(item.tab);
                setSidebarOpen(false);
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {renderTabContent()}
      </Box>

      {/* Mood Selection Dialog */}
      <Dialog open={moodDialogOpen} onClose={() => setMoodDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" textAlign="center">
            How are you feeling right now?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {mockMoods.map((mood) => (
              <Grid item xs={6} sm={4} md={3} key={mood.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    p: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => handleMoodSelect(mood)}
                >
                  <Typography variant="h2">{mood.emoji}</Typography>
                  <Typography variant="body1">{mood.name}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoodDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setMoodDialogOpen(true)}
      >
        <Mood />
      </Fab>
    </Box>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <MoodMealApp />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;