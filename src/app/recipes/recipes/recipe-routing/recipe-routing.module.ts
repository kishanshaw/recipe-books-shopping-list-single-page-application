import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from '../../recipes.component';
import {AuthGuardService} from '../../../auth/auth-guard.service';
import {RecipeStartComponent} from '../../recipe-start/recipe-start.component';
import {RecipeEditComponent} from '../../recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from '../../recipe-detail/recipe-detail.component';
import {RecipeResolverService} from '../../recipe-start/recipe-resolver.service';

const routes: Routes = [
  {path: '', component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', component : RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
