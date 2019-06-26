import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.editingSubscription = this.shoppingService.startEditing.subscribe(
      (index : number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredientsByIndex(index);
        this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }
        );
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // @ts-ignore
    if (this.editMode) {
      this.shoppingService.updateIngrdients(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingService.addIngredients(newIngredient);
    }
    this.editMode = false;
    form.reset();

  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
      this.shoppingService.deleteIngredients(this.editedItemIndex);
      this.onClear();
  }
}
