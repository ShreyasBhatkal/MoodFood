import OpenAI from 'openai';
import { Mood, Recipe, User, AIRecommendation } from '../types';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key',
  dangerouslyAllowBrowser: true, // Only for demo purposes
});

// Mood-to-food mapping for better recommendations
const moodFoodMapping = {
  happy: ['colorful salads', 'fresh fruits', 'light appetizers', 'celebratory dishes'],
  sad: ['comfort foods', 'warm soups', 'hearty stews', 'chocolate desserts'],
  stressed: ['calming teas', 'simple meals', 'healthy snacks', 'omega-3 rich foods'],
  energetic: ['protein-rich dishes', 'spicy foods', 'energy bars', 'pre-workout meals'],
  lazy: ['quick recipes', 'one-pot meals', 'microwave dishes', 'no-cook options'],
  romantic: ['elegant dishes', 'wine pairings', 'intimate dinners', 'aphrodisiac foods'],
  nostalgic: ['traditional recipes', 'childhood favorites', 'family dishes', 'comfort classics'],
  adventurous: ['exotic cuisines', 'fusion dishes', 'unusual ingredients', 'experimental recipes'],
  calm: ['herbal teas', 'light meals', 'zen-inspired dishes', 'mindful eating'],
  excited: ['party foods', 'colorful dishes', 'fun presentations', 'interactive cooking']
};

export class OpenAIService {
  private static instance: OpenAIService;

  private constructor() {}

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async generateMoodBasedRecommendations(
    mood: Mood,
    user: User,
    availableIngredients: string[] = [],
    previousRecommendations: AIRecommendation[] = []
  ): Promise<AIRecommendation> {
    try {
      const moodKeywords = moodFoodMapping[mood.name.toLowerCase() as keyof typeof moodFoodMapping] || [];
      
      const prompt = this.buildRecommendationPrompt(
        mood,
        user,
        availableIngredients,
        moodKeywords,
        previousRecommendations
      );

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef and nutritionist AI assistant specialized in mood-based recipe recommendations. Provide detailed, personalized recipe suggestions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      });

      const recommendation = this.parseRecommendationResponse(
        response.choices[0].message.content || '',
        mood,
        user.id
      );

      return recommendation;
    } catch (error) {
      console.error('Error generating mood-based recommendations:', error);
      throw new Error('Failed to generate AI recommendations');
    }
  }

  async generateRecipeFromIngredients(
    ingredients: string[],
    preferences: any,
    restrictions: string[] = []
  ): Promise<Recipe> {
    try {
      const prompt = `
        Create a detailed recipe using these available ingredients: ${ingredients.join(', ')}.
        
        Dietary restrictions: ${restrictions.join(', ') || 'None'}
        Cooking preferences: ${JSON.stringify(preferences)}
        
        Please provide a complete recipe with:
        - Creative recipe name
        - Detailed description
        - Prep time and cook time
        - Difficulty level
        - Complete ingredients list with amounts
        - Step-by-step instructions
        - Nutritional information estimate
        - Cooking tips
        
        Format the response as a structured recipe.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a creative chef AI that creates innovative recipes from available ingredients while respecting dietary restrictions and preferences.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.8,
      });

      return this.parseRecipeResponse(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error generating recipe from ingredients:', error);
      throw new Error('Failed to generate recipe from ingredients');
    }
  }

  async improveRecipe(
    recipe: Recipe,
    feedback: string,
    dietaryRequests: string[] = []
  ): Promise<Recipe> {
    try {
      const prompt = `
        Improve this recipe based on user feedback and dietary requests:
        
        Original Recipe: ${recipe.title}
        Description: ${recipe.description}
        Ingredients: ${recipe.ingredients.map(i => `${i.amount} ${i.unit} ${i.name}`).join(', ')}
        
        User Feedback: ${feedback}
        Dietary Requests: ${dietaryRequests.join(', ') || 'None'}
        
        Please provide an improved version of the recipe addressing the feedback and requests.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef AI that excels at improving recipes based on user feedback and dietary requirements.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.6,
      });

      return this.parseRecipeResponse(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error improving recipe:', error);
      throw new Error('Failed to improve recipe');
    }
  }

  async generateCookingInstructions(
    recipe: Recipe,
    userSkillLevel: string,
    voiceMode: boolean = false
  ): Promise<string[]> {
    try {
      const prompt = `
        Generate ${voiceMode ? 'voice-friendly' : 'detailed'} cooking instructions for:
        
        Recipe: ${recipe.title}
        User Skill Level: ${userSkillLevel}
        
        Original Instructions:
        ${recipe.instructions.map(i => `${i.step}. ${i.description}`).join('\n')}
        
        Please provide ${voiceMode ? 'clear, concise audio instructions' : 'detailed step-by-step instructions'} 
        appropriate for a ${userSkillLevel} cook.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a patient cooking instructor AI that provides ${voiceMode ? 'voice-optimized' : 'detailed'} cooking guidance.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.5,
      });

      return this.parseInstructionsResponse(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error generating cooking instructions:', error);
      throw new Error('Failed to generate cooking instructions');
    }
  }

  async generateNutritionAdvice(
    userGoals: string[],
    currentNutrition: any,
    targetNutrition: any
  ): Promise<string> {
    try {
      const prompt = `
        Provide personalized nutrition advice based on:
        
        User Goals: ${userGoals.join(', ')}
        Current Nutrition: ${JSON.stringify(currentNutrition)}
        Target Nutrition: ${JSON.stringify(targetNutrition)}
        
        Please provide specific, actionable nutrition advice and meal suggestions.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a qualified nutritionist AI that provides personalized, evidence-based nutrition advice.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.6,
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('Error generating nutrition advice:', error);
      throw new Error('Failed to generate nutrition advice');
    }
  }

  private buildRecommendationPrompt(
    mood: Mood,
    user: User,
    availableIngredients: string[],
    moodKeywords: string[],
    previousRecommendations: AIRecommendation[]
  ): string {
    const previousTitles = previousRecommendations.map(r => r.recipes.map(recipe => recipe.title)).flat();
    
    return `
      Generate 3 personalized recipe recommendations for a user feeling ${mood.name} (${mood.description}).
      
      User Profile:
      - Dietary restrictions: ${user.preferences.dietaryRestrictions.join(', ') || 'None'}
      - Allergies: ${user.preferences.allergies.join(', ') || 'None'}
      - Preferred cuisines: ${user.preferences.cuisinePreferences.join(', ') || 'Any'}
      - Skill level: ${user.preferences.cookingSkillLevel}
      - Max cooking time: ${user.preferences.maxCookingTime} minutes
      - Spice preference: ${user.preferences.spiceLevel}
      - Health goals: ${user.preferences.healthGoals.join(', ') || 'None'}
      
      Available ingredients: ${availableIngredients.join(', ') || 'None specified'}
      
      Mood-appropriate food types: ${moodKeywords.join(', ')}
      
      Previous recommendations to avoid: ${previousTitles.join(', ') || 'None'}
      
      Please provide 3 diverse recipe recommendations that:
      1. Match the user's current mood and emotional needs
      2. Respect dietary restrictions and preferences
      3. Use available ingredients when possible
      4. Are appropriate for the user's skill level
      5. Include clear reasoning for why each recipe fits the mood
      
      Format each recommendation with: title, description, prep time, cook time, difficulty, cuisine type, and mood-matching explanation.
    `;
  }

  private parseRecommendationResponse(
    response: string,
    mood: Mood,
    userId: string
  ): AIRecommendation {
    // This is a simplified parser - in production, you'd want more robust parsing
    const lines = response.split('\n').filter(line => line.trim());
    
    const recommendation: AIRecommendation = {
      id: Date.now().toString(),
      userId,
      mood,
      recipes: [], // Would be populated by parsing the response
      reasoning: response,
      confidence: 0.85,
      timestamp: new Date(),
    };

    // Parse the response to extract recipes (simplified implementation)
    // In production, you'd implement more sophisticated parsing
    
    return recommendation;
  }

  private parseRecipeResponse(response: string): Recipe {
    // Simplified recipe parser - in production, you'd implement robust parsing
    const recipe: Recipe = {
      id: Date.now().toString(),
      title: 'AI Generated Recipe',
      description: response.substring(0, 200) + '...',
      imageUrl: '/api/placeholder/400/300',
      prepTime: 15,
      cookTime: 30,
      totalTime: 45,
      servings: 4,
      difficulty: 'intermediate',
      cuisine: 'Fusion',
      mealType: ['dinner'],
      tags: ['AI Generated'],
      ingredients: [],
      instructions: [],
      nutrition: {
        calories: 350,
        protein: 20,
        carbs: 40,
        fat: 15,
        fiber: 5,
        sugar: 8,
        sodium: 500,
        cholesterol: 50,
        saturatedFat: 5,
        unsaturatedFat: 10,
        vitamins: {},
        minerals: {}
      },
      ratingsAverage: 4.5,
      ratingsCount: 0,
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isKeto: false,
      isPaleo: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Parse and populate recipe fields from response
    // This would be more sophisticated in production
    
    return recipe;
  }

  private parseInstructionsResponse(response: string): string[] {
    return response.split('\n').filter(line => line.trim()).map(line => line.trim());
  }
}

export const openAIService = OpenAIService.getInstance();