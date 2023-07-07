import {Component, Inject, Input} from '@angular/core';
import {Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Notyf} from "notyf";
import {NOTYF} from "../../app.module";

@Component({
  selector: 'app-edit-users',
  template:
    '<app-form-register [validations]="validations" [user]="user" [blocked]="blocked" (submit)="onSubmit($event)">' +
    '</app-form-register>'
})
export class EditModalComponent {

  @Input() user: any;
  public validations: any;
  public blocked = false;

  constructor(@Inject(NOTYF) private notyf: Notyf) {
    this.validations = {
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(8)]],
      name: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      password_confirmation: ['', [Validators.minLength(8), Validators.maxLength(255)]],
    };
  }

  onSubmit($event: any): void {
    if (!($event instanceof SubmitEvent)) {

      let user: any = {};
      let email = $event.email;
      if (email !== this.user.email && email !== '') {
        user.email = email;
      }

      let password = $event.password;
      if (password !== '') {
        user.password = password;
        user.password_confirmation = $event.password_confirmation;
      }

      let name = $event.name;
      if (name !== this.user.name && name !== '') {
        user.name = name;
      }

      if (Object.keys(user).length > 0) {
        user.id = this.user.id;
        this.blocked = true;
        ApiService.editUser(user).then(value => {
          if (value.data.success) {
            this.notyf.success(value.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 100);
          } else {
            this.notyf.error(value.data.message);
          }
        }).catch(reason => {
          ApiService.catch(reason);
          this.blocked = false;
        });
      } else {
        this.notyf.error('Nenhum campo foi alterado! Por favor, altere pelo menos um campo para editar o usuário');
      }
    }
  }
}
