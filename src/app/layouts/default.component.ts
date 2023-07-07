import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {faSignOut, faUsers} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  isCollapsed = false;
  protected readonly faSignOut = faSignOut;
  protected readonly faUsers = faUsers;

  constructor(private router: Router) {
  }

  logout() {
    ApiService.logout().then((response) => {
      if (response.data.success) {
        this.router.navigate(['/login']);
      }
    });
  }
}
