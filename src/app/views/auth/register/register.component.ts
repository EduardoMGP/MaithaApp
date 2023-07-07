import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Notyf} from "notyf";
import {Router} from "@angular/router";
import {NOTYF} from "../../../app.module";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-register',
  template: `
    <app-form-register [validations]="validations" [blocked]="blocked" (submit)="onSubmit($event)">
    </app-form-register>
  `,
})
export class RegisterComponent {

  @Input() redirect: boolean = true;
  @Output() createUser: EventEmitter<any> = new EventEmitter<any>();
  public blocked = false;
  public validations: any;

  constructor(private formBuilder: FormBuilder, @Inject(NOTYF) private notyf: Notyf, private router: Router) {
    this.validations = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    };
  }

  onSubmit($event: any): void {
    if (!($event instanceof SubmitEvent)) {
      this.blocked = true;
      ApiService.register($event).then(value => {
        if (value.data.success) {
          this.notyf.success(value.data.message);
          if (this.redirect) {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 100);
          }
          this.createUser.emit(value.data.data);
        } else {
          if (value.data.data) {
            let data: any = value.data.data;
            Array.from(Object.keys(data)).forEach((key: string) => {
              this.notyf.error(data[key][0]);
              this.blocked = false;
            });
          }
        }
      }).catch(reason => {
        ApiService.catch(reason);
        this.blocked = false;
      });
    }
  }
}
