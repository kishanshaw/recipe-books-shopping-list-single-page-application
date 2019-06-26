import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {LoggingService} from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private loggingService: LoggingService) {}
  loadedFeature = 'Recipe-list';
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit(): void {
    this.authService.onAutoLogin();
    this.loggingService.printLog('Hello from app component ngOnit');
  }
}
