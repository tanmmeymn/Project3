import { LightningElement ,api} from 'lwc';
import getRecipe from '@salesforce/apex/RecipeController.getRecipe';
export default class RecipeListWithInstructions extends LightningElement {
    @api image
    @api title;
    @api time;
    @api summary;
    @api recipeId;
    @api analyzedInstructions;
    @api ingredients=[];
    messages;
    dishList;
    dietList;


    @api
    set dishTypes(data){
        // Converts array to comma-separated string
        this.dishList = data && data.join();
    }
     // Allows internal access to the formatted dish list
    get dishTypes(){
        return this.dishList;
    }
    @api
    set diets(data){
        this.dietList = data && data.join();
    }
    get diets(){
        return this.dietList;
    }
    get hasDetails(){
        return this.summary ? true : false;
    }
    
    fetchRecipe(){
        getRecipe({recipeId:this.recipeId})
        .then(result=>{
        const recipe =JSON.parse(result);
        if(recipe){
            this.image=recipe.image;
            this.title=recipe.title;
            this.time=recipe.readyInMinutes;
            this.summary=recipe.summary;
            this.dishList=recipe.dishType&&recipe.dishTypes.join();
            this.dietList=recipe.diets&&recipe.diets.join();
            const ingredients= recipe.extendedIngredients.map(ingredient=>{return`${ingredient.amount} ${ingredient.unit}${ingredient.name};`});
            this.ingredients=ingredients;

            if(recipe.analyzedInstructions && recipe.analyzedInstructions.length>0){

                this.analyzedInstructions=recipe.analyzedInstructions;
            }
            else{
                this.messages='No dierections are available for this recipe';
            }
        }
    }).catch(error=>{
        this.error=error.message;
        console.error( 'error in  loading recipe' ,error);
        this.ingredients=undefined;
    });
    }

}