import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppingListComponent} from '../shopping-list.component';
import {ShoppingEditComponent} from '../shopping-edit/shopping-edit.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    /*CommonModule,*/
    FormsModule,
    RouterModule.forChild([
      /*{path: 'shopping-list', component: ShoppingListComponent}],*/
      {path: '', component: ShoppingListComponent}]
    ),
    SharedModule
  ],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent,
    RouterModule
  ]
})
export class ShoppingModule { }
