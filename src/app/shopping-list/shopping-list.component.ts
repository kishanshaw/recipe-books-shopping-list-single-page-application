import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from './shopping.service';
import {Subscription} from 'rxjs';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers : []
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  /*ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Mangoes', 15),
  ];*/
  private subscription: Subscription;
  ingredients: Ingredient[] = [];
  constructor(private shoppingService: ShoppingService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    console.log('Entered');
    this.subscription = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients.slice();
        console.log('Ingredients' + this.ingredients);
      }
    );
    this.loggingService.printLog('Hello from Shopping list component');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingService.startEditing.next(index);
  }
}
