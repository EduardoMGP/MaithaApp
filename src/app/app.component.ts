import {Component, OnInit} from '@angular/core';
import {ActivationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  layout: string = 'auth';

  constructor(private router: Router) {
    ApiService.validateToken()
      .catch(() => window.location.href = '/login');
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe(value => {
        if (value instanceof ActivationEnd) {
          if (value.snapshot.routeConfig?.path === 'login' || value.snapshot.routeConfig?.path === 'register') {
            this.layout = 'auth';
          } else {
            this.layout = 'default';
          }
        }
      });
  }
}
