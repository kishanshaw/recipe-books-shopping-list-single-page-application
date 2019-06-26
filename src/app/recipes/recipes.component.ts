import { Component, OnInit } from '@angular/core';
/*import {Recipe} from './recipes.model';*/
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers : []
})
export class RecipesComponent implements OnInit {
  /*selectedRecipe: Recipe;*/

  constructor() { }

  ngOnInit(): void {
  }

  /*ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {this.selectedRecipe = recipe;}
    );
  }*/

}
