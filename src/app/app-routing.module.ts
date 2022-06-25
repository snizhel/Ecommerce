import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'register',component:RegisterPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'main',component:MainPageComponent},
  {path:'adminPanel',component:AdminPanelComponent},
  {path:'editUser/:id',component:EditUserComponent},
  {path:'editCategory/:id',component:EditCategoryComponent},
  {path:'editProduct/:idProduct',component:EditProductComponent},
  {path:'cart',component:CartPageComponent},
  {path:'**',redirectTo:'main'} //** if they put any path */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
