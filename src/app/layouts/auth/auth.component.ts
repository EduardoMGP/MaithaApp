import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {faFaceSmileBeam} from "@fortawesome/free-regular-svg-icons";
import {Router, Scroll} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements  OnInit {

  protected readonly faFaceSmileBeam = faFaceSmileBeam;
  isLogin: any;

  constructor(private router: Router) {
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
        if(event instanceof Scroll) {
          this.isLogin = event.routerEvent.url === '/login';
        }

    });
  }
}
