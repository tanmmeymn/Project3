public with sharing class RecipeController {
    
    private static final String RECEIPE_API= 'https://api.spoonacular.com'; //"https://api.spoonacular.com" 
    private static final String API_KEY= 'd9bf109e82734eb498ba3974d51ce0c7';
    
    @AuraEnabled
    public static String getRandomRecipe(){
        HttpRequest request= new HttpRequest();
        HTTP http= new HTTP();
        request.setMethod('GET');
        request.setEndpoint(RECEIPE_API+'/recipes/random?apiKey='+API_KEY);
        HttpResponse response= http.send(request);
        if(response.getStatusCode()==200){
            
            return response.getBody();
        }
        return '';
    }
    @AuraEnabled
    public static String getRecipe(String recipeId) {
        if(recipeId.endsWith('.0')){
            recipeId=recipeId.substring(0,recipeId.length()-2);
        }
        
        HTTP http= new HTTP();
        HttpRequest request= new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint(RECEIPE_API+'/recipes/'+recipeId+'/information?apiKey='+API_KEY);
        HttpResponse response= http.send(request);
        if(response.getStatusCode()==200){
            return response.getBody();
        }
        return '';
    }
    @AuraEnabled
    public static String getRecipeByIngredients(String ingredients){
        HTTP http= new HTTP();
        HttpRequest request= new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint(RECEIPE_API+'/recipes/findByIngredients?ingredients='+ingredients+'&number=10&apiKey='+API_KEY);
        //request.setEndpoint(RECEIPE_API+'/recipes/findByIngredients?ingredients='+ingredients+'&number=10&apiKey='+API_KEY);
        HttpResponse response= http.send(request);
        if(response.getStatusCode()==200){
            return response.getBody();
        }
        return '';
        }
}

