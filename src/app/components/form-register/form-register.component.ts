import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit, OnChanges {

  @Input() user!: User;
  @Input() validations: any;
  @Input() blocked: boolean = false;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('passwordConfirmationInput') passwordConfirmationInput: any;

  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;
  public showPassword: boolean = false;
  public form: any;
  public showPasswordConfirmation: any;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges() {
  }
  ngOnInit() {
    if (this.validations) {
      this.form = this.formBuilder.group(this.validations);
      if (this.user !== undefined) {
        this.form.patchValue({
          email: this.user.email || '',
          name: this.user.name || '',
        });
      }
      this.form.setValidators(() => {
        return this.checkPasswords(this.form);
      });
    }
  }

  private checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('password_confirmation')?.value;
    return pass === confirmPass ? null : {notSame: true}
  }

  public showHidePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordInput
    ) {
      let nativeElement = this.passwordInput.nativeElement as HTMLInputElement;
      nativeElement.focus();
      nativeElement.type = this.showPassword ? 'text' : 'password';
    }
  }

  public showHidePasswordConfirmation(): void {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
    if (this.passwordConfirmationInput) {
      let nativeElement = this.passwordConfirmationInput.nativeElement as HTMLInputElement;
      nativeElement.focus();
      nativeElement.type = this.showPasswordConfirmation ? 'text' : 'password';
    }
  }

  onSubmit() {
    if (!this.form.invalid) {
      this.submit.emit(this.form.value);
    }
  }
}
