# MoodMeal 🍽️ - AI-Powered Recipe Recommendations

MoodMeal is a comprehensive cross-platform mobile application that uses AI to suggest global recipes based on your current mood, food preferences, dietary restrictions, available ingredients, and health goals.

## 🌟 Features

### 🎭 Core Features

1. **Mood-Based Recipe Recommendation**
   - Select your current mood from an intuitive mood selector
   - AI analyzes emotional-food behavior patterns
   - Personalized recipe suggestions based on your feelings

2. **Pantry-Based Cooking Mode**
   - Input or scan available ingredients
   - Smart filtering of recipes you can actually make
   - Highlight missing ingredients with substitution suggestions

3. **Interactive Cooking Experience**
   - Step-by-step voice-guided instructions
   - Built-in timers and progress tracking
   - Hands-free voice commands support

4. **Nutrition & Health Tracking**
   - Complete nutritional breakdown for each recipe
   - Calorie, protein, carb, and fat tracking
   - Cooking time, difficulty level, and meal type information

5. **Smart Grocery Integration**
   - Intelligent grocery list generation
   - One-click ordering through delivery services
   - API integration with Instacart, Amazon Fresh, and local stores

6. **AI Learning & Personalization**
   - Machine learning from your cooking history
   - Mood pattern analysis for better recommendations
   - Personalized weekly meal plans

### 🔍 Advanced Features

7. **Search & Filter System**
   - Advanced search by cuisine, diet, mood, or time
   - Smart filtering with multiple criteria
   - Save favorite recipes and mark dislikes

8. **Social & Sharing**
   - Share recipes with friends and family
   - Create and participate in cooking challenges
   - Private recipe collections and public sharing

9. **Premium Features**
   - Professional chef tips and tutorials
   - Access to curated gourmet recipes
   - Personal chef consultations

10. **Offline Mode**
    - Download recipes for offline access
    - Sync updates when back online
    - Cached ingredient lists and cooking tips

11. **Voice Assistant Integration**
    - Hands-free cooking instructions
    - Voice-activated timers and controls
    - Smart speaker compatibility

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Material-UI (MUI) with custom theming
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **AI Integration**: OpenAI GPT-4 for recipe recommendations
- **Recipe Data**: Spoonacular API integration ready
- **Mobile**: React Native ready architecture
- **Voice**: Web Speech API integration
- **Deployment**: Vercel/Netlify ready

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/moodmeal.git
   cd moodmeal
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   REACT_APP_SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open the application**
   Navigate to `http://localhost:3000` in your browser

## 📱 Usage Guide

### Getting Started
1. **Welcome Screen**: Launch the app and explore the beautiful interface
2. **Mood Selection**: Click the mood selector to tell us how you're feeling
3. **Recipe Recommendations**: Get AI-powered suggestions based on your mood
4. **Pantry Management**: Add your available ingredients to get personalized recipes
5. **Cooking Mode**: Follow step-by-step instructions with built-in timers

### Key Interactions
- **Mood Button**: Floating action button for quick mood selection
- **Recipe Cards**: Tap to view details, heart to favorite, timer to start cooking
- **Pantry**: Add/remove ingredients, generate recipes from available items
- **Grocery List**: Smart list generation and online ordering integration
- **Voice Control**: Enable voice mode for hands-free cooking

## 🎨 Design & User Experience

### Visual Design
- **Modern UI**: Clean, intuitive interface with Material Design
- **Mood-Based Colors**: Dynamic theming based on selected mood
- **Responsive Layout**: Works beautifully on all screen sizes
- **Smooth Animations**: Framer Motion for delightful interactions

### User Flow
1. **Onboarding**: Simple setup with preference selection
2. **Mood Selection**: Quick, visual mood picker
3. **Recipe Discovery**: AI-powered recommendations
4. **Cooking Guidance**: Step-by-step instructions with voice
5. **Social Sharing**: Easy recipe sharing and collections

## 🔧 Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── services/           # API services (Firebase, OpenAI)
├── store/              # Redux store and slices
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── assets/             # Images, icons, and static files
```

### State Management
- **Redux Toolkit**: Efficient state management with slices
- **Async Thunks**: For API calls and async operations
- **Typed Hooks**: Type-safe Redux hooks for TypeScript

### API Integration
- **Firebase**: Real-time database and authentication
- **OpenAI**: AI-powered recipe recommendations
- **Spoonacular**: Recipe data and nutritional information
- **Voice API**: Speech recognition and synthesis

## 🤖 AI Features

### Mood-Based Recommendations
- **Emotional Mapping**: Scientific mood-to-food correlations
- **Personalization**: Learning from user preferences and history
- **Context Awareness**: Time of day, weather, and occasion factors

### Smart Suggestions
- **Ingredient Optimization**: Maximize use of available ingredients
- **Dietary Compliance**: Respect restrictions and preferences
- **Skill Level Matching**: Recipes appropriate for user's cooking ability

## 🛡️ Security & Privacy

- **Data Encryption**: All user data encrypted at rest and in transit
- **Privacy First**: Minimal data collection with user consent
- **Secure Authentication**: Firebase Auth with multiple login options
- **GDPR Compliant**: Full compliance with privacy regulations

## 🔄 Future Enhancements

### Phase 2 Features
- **AR Cooking**: Augmented reality cooking instructions
- **IoT Integration**: Smart kitchen appliance connectivity
- **Nutrition Coaching**: AI-powered dietary guidance
- **Community Features**: Social cooking challenges and groups

### Mobile App Development
- **React Native**: Cross-platform mobile app development
- **Push Notifications**: Meal reminders and cooking timers
- **Camera Integration**: Ingredient scanning and recipe sharing
- **Offline Sync**: Full offline functionality with smart sync

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Lead Developer**: Your Name
- **UI/UX Designer**: Designer Name
- **AI Specialist**: AI Engineer Name
- **Backend Developer**: Backend Engineer Name

## 🆘 Support

For support, please contact:
- Email: support@moodmeal.app
- Discord: [MoodMeal Community](https://discord.gg/moodmeal)
- GitHub Issues: [Report a Bug](https://github.com/yourusername/moodmeal/issues)

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Firebase for backend services
- Material-UI for beautiful components
- Unsplash for recipe images
- The amazing open-source community

---

**Made with ❤️ and 🧠 by the MoodMeal Team**

*Transform your cooking experience with AI-powered mood-based recipes!*
