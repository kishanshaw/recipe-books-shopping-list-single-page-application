import {Recipe} from './recipes.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service';
import {Subject} from 'rxjs';

@Injectable()
export class  RecipeService {

  recipeChanged = new Subject<Recipe []>();
  /*recipes: Recipe[] = [
    new Recipe('Lentil Curry',
      'This is a kind of delicious curry of lentils',
      'https://static01.nyt.com/images/2019/01/17/dining/mc-red-lentil-soup/merlin_146234352_d7bc8486-b067-4cff-a4c0-7741f166fb60-articleLarge.jpg',
      [
        new Ingredient('Chillis', 5 ),
        new Ingredient('yellow lentils',25)
      ]
    ),
    new Recipe('Dal Khichdi',
      'Tasty, delicious and healthy khichdi prepared using a variety of lentils',
      'https://detoxinista.com/wp-content/uploads/2017/03/instant-pot-red-lentil-curry.jpg',
      [
        new Ingredient('green chillis',2),
        new Ingredient('yellow lentils',10)
      ]
    ),
    new Recipe('Egg Masala',
      'Western-style cooked eggs, garnished with different spices',
      'https://downshiftology.com/wp-content/uploads/2018/10/Deviled-Eggs-Recipe.jpg',
      [
        new Ingredient('Eggs',4),
        new Ingredient('red spices',5)
      ],

      )
  ];
  *//*recipeSelected = new EventEmitter<Recipe>();*/

   private recipes: Recipe[] = [];

  constructor(private shoppingService: ShoppingService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingService.addIngredientsToShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe){
    this.recipes[id] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id : number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
