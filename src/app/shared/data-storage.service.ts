import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipes.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private recipeService: RecipeService, private http: HttpClient, private authService: AuthService) {

  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://recipebook-shoppinglist-final.firebaseio.com/recipes.json', recipes)
      .subscribe(
        (responseData) => {
          console.log(responseData);
        }
      );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipebook-shoppinglist-final.firebaseio.com/recipes.json')
      .pipe(
        map(
          recipes => {
            return recipes.map(
              recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
              }
            );
          }),
        tap(
          (recipes) => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }



  /*fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipebook-shoppinglist-final.firebaseio.com/recipes.json')
      .pipe(
        map(
          recipes => {
            return recipes.map(
              recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
              }
            );
          }),
        tap(
          (recipes) =>{
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }*/
  /*
  fetchRecipes() {
    return this.authService.userSubject
      .pipe(
        take(1),
          exhaustMap(
            user => {
              return this.http.get<Recipe[]>(
                'https://recipebook-shoppinglist-final.firebaseio.com/recipes.json',
                {
                  params: new HttpParams().set('auth', user.token)
                });
            }
          ),
        map(
          recipes => {
            // @ts-ignore
            return recipes.map(
              recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
              }
            );
          }),
        tap(
          (recipes) => {
            this.recipeService.setRecipes(recipes);
          }
        )
        );
  }

  */
}
