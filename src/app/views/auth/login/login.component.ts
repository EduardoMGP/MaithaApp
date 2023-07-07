import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {faFaceSmileBeam} from "@fortawesome/free-regular-svg-icons";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Notyf} from "notyf";
import {Router} from "@angular/router";
import {NOTYF} from "../../../app.module";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  @ViewChild('passwordInput', {static: false}) passwordInput: ElementRef | undefined;

  protected readonly faFaceSmileBeam = faFaceSmileBeam;
  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;
  public showPassword: boolean = false;
  public loginForm: FormGroup;
  public blocked = false;

  constructor(private formBuilder: FormBuilder, @Inject(NOTYF) private notyf: Notyf, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public showHidePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordInput) {
      let nativeElement = this.passwordInput.nativeElement as HTMLInputElement;
      nativeElement.focus();
      nativeElement.type = this.showPassword ? 'text' : 'password';
    }
  }

  onSubmit(): void {
    if (!this.loginForm.invalid) {
      this.blocked = true;
      ApiService.login(this.loginForm.value).then(value => {
        if (value.data.success) {
          this.notyf.success(value.data.message);
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 100);
        } else {
          this.notyf.error(value.data.message);
          this.blocked = false;
        }
      }).catch(reason => {
        ApiService.catch(reason);
        this.blocked = false;
      });
    }
  }

}
