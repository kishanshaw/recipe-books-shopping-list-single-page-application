import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export  class  ShoppingService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Mangoes', 15),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    console.log(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredientsByIndex(index: number) {
    return this.ingredients.slice()[index];
  }

  updateIngrdients(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredients(editedItemIndex: number) {
    this.ingredients.splice(editedItemIndex,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
