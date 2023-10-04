

export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    extendedIngredients: ExtendedIngredient[];
    cuisines: string[]; 
    diets: string[]; 
    instructions: string[]; 
    dishTypes: string[]; 
    servings:  number;
    analyzedInstructions: {
      name: string;
      steps: Instruction[];
    }[];

  }
  
  interface Instruction {
    number: number;
    step: string;
    ingredients: {
      id: number;
      name: string;
    }[];
    equipment: {
      id: number;
      name: string;
    }[];
  }

  interface ExtendedIngredient {
    aisle: string;
    amount: number;
    consistency: string;
    id: number;
    image: string;
    measures: {
      metric: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
      us: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
    };
    // meta: any[]; // You can define a more specific type for meta if needed
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    unit: string;
  }

  