import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'register',component:RegisterPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'main',component:MainPageComponent},
  {path:'user',component:UserComponent},
  {path:'**',redirectTo:'main'} //** if they put any path */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
