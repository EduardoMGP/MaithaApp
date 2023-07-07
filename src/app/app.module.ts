import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DefaultComponent} from "./layouts/default.component";
import {LoginComponent} from "./views/auth/login/login.component";
import {RegisterComponent} from "./views/auth/register/register.component";
import {UsersComponent} from "./views/users/users.component";
import {AuthComponent} from "./layouts/auth/auth.component";

import {Notyf} from "notyf";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import { IconsProviderModule } from './icons-provider.module';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormRegisterComponent} from "./components/form-register/form-register.component";
import {EditModalComponent} from "./components/users/edit-modal.component";
import {CreateModalComponent} from "./components/users/create-modal.component";
import {AuthService} from "./guards/auth.guard";

registerLocaleData(en);

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');
@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    EditModalComponent,
    CreateModalComponent,
    AuthComponent,
    FormRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzModalModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    IconsProviderModule,
    NzDividerModule,
    NzTableModule
  ],
  providers: [
    AuthService,
    {
      provide: NOTYF, useFactory: () => new Notyf({
        duration: 5000
      })
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
