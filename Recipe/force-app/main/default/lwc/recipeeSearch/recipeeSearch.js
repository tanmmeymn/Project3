import { LightningElement } from 'lwc';
import recipeSearchLogo from '@salesforce/resourceUrl/recipelogo';
import getRandomRecipe from '@salesforce/apex/RecipeController.getRandomRecipe';
import getRecipeByIngreditents from '@salesforce/apex/RecipeController.getRecipeByIngredients';
export default class RecipeeSearch extends LightningElement {
    recipelogo=recipeSearchLogo;
    exploreRecipe=false;
    welcomeContent="Welcome to our Recipe Search Website!";
    exploreContent1="Explore aworld of culinary delights right at your fingertips! Whether you're a seasoned chef or just starting your cooking journey,";
    exploreContent2="Our recipe search website is your is your go-to destination for finding delicioious recipes.";
    ingredients='';
    recipes=[];
    
    handleExploreRecipe(){
        this.exploreRecipe=true;
    }
    fetchRecipesByIngredients(){
        console.log("fetchRecipesByIngredients");
       const ingredients =this.template.querySelector(".ingredient-input").value;
       getRecipeByIngreditents({ingredients}).then(result=>{
           console.log("fetchRecipesByIngredients data:",result);
           this.recipes=JSON.parse(result);
            //console.log("recipe",result);
       }).catch(error=>{
           console.error(error);
       });
        //this.exploreRecipe=false;
    }
    fetchRandomRecipe(){
        console.log("fetchRandomRecipe");
        getRandomRecipe()
        .then(result=>{
            this.recipes=result;
            console.log("fetchRandomRecipe data:",this.recipes);
            const recipesData =JSON.parse(result);
            if(recipesData&& recipesData.recipes && recipesData.recipes.length>0)
                {  
                const recipe=recipesData.recipes[0];
                const ingredient = recipe.extendedIngredients.map(ingredient=>{return`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;});
                this.ingredients=ingredient;
                this.recipes=recipesData.recipes;
            }
            else{
                console.error("No recipes found");
            }
            }).catch(error=>{
                console.error(error);
                });
    }
    // fetchRandomRecipe()
    // {
    //     console.log('fetchrandonRecipe');
    //     getRandomRecipe()
    //     .then(result=>{
    //         this.recipes = result;
    //         console.log(' random data recieved sucessfully'+ this.recipes);
    //         const recipesData = JSON.parse(result);
    //         if(recipesData && recipesData.recipes && recipesData.recipes.length > 0)
    //         {// get the first recipe from the list of recipes
    //             const recipe = recipesData.recipes[0];
    //             // Converts raw ingredient objects into display-friendly strings(amount1 unitCup nameOfFood)
    //             //const ingredients =recipe.extendedIngredients.map(ingredient=>{return`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;});
    //               const ingredientsfromJSON= recipe.extendedIngredients.map(ingredient=>{return`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;});
    //             this.ingredients = ingredientsfromJSON;
    //             console.log("ingredient from JSON",this.ingredients)
    //             this.recipe = recipesData.recipes;
    //             console.log("recipe",this.recipe);
    //             console.log('if block executed');
    //         }
    //         else if(recipesData.recipes=null)
    //         {
    //             console.log('no data found');
    //         }
    //         })
    //     .catch(error=>{
    //         this.error=error;  
    //         console.log('error in fetching  random  data');
    //     });    
    // }
    handleBack(){
         this.exploreRecipe=false;
        this.recipes=[];
       
    }

}