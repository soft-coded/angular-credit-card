import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddCardComponent } from './add-card/add-card.component';
import { authGuard } from './guards/auth.guard';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-card', component: AddCardComponent, canActivate: [authGuard] },
  {
    path: 'new-payment',
    component: PaymentFormComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
