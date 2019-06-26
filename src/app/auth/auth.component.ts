import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponse, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceHolderDirective} from '../shared/place-holder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = false;
  isLoading = false;
  error: string = null;
  closeSubscription: Subscription;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }



  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    let authObservable: Observable<AuthResponse>;
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      this.isLoading = true;
      const email = form.value.email;
      const password = form.value.password;
      authObservable = this.authService.onLogin(email, password);

    } else {
      this.isLoading = true;
      const email = form.value.email;
      const password = form.value.password;
      authObservable = this.authService.onSignUp(email, password);
    }
    authObservable.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, error => {
        console.log(error);
        this.error = error;
        this.showErrorAlert(error);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();

    }
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
      const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();
      const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
      componentRef.instance.message = message;
      this.closeSubscription =  componentRef.instance.closeAlert.subscribe(
       () => {
         this.closeSubscription.unsubscribe();
         hostViewContainerRef.clear();
       }
      );


  }
}
