import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSubscription: Subscription;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {


  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );
  }

  onLogout() {
    this.authService.onLogout();
  }
}
