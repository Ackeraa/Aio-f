import { Routes } from '@angular/router';
import {
  AuthComponent,
  ForgotComponent,
  LoginComponent,
  RegisterComponent,
  ResetComponent,
  resetGuard,
} from '.';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'forgot', component: ForgotComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset', component: ResetComponent, canActivate: [resetGuard] },
    ],
  },
];
