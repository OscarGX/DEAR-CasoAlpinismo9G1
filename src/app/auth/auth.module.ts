import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
