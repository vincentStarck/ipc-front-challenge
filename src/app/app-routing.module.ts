import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { IpcComponent } from './ipc/ipc.component';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: 'landing', component: LandingComponent },
  { path: 'registrarse', component: SignupComponent },
  { path: 'iniciar-sesion', component: SigninComponent },
  { path: 'historico-indicadores-icp', component: IpcComponent, canActivate: [AuthGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
