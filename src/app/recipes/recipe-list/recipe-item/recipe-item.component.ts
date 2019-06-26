import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipes.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItems: Recipe;
  @Input() index: number;
  /*@Output() recipeItemSelected = new EventEmitter<void>();*/

  constructor() {

  }


  ngOnInit() {
  }


  /*onSelected() {
    // this.recipeItemSelected.emit();
    this.recipeService.recipeSelected.emit(this.recipeItems);
  }*/
}
