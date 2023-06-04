import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NonauthlayoutComponent } from './layout/nonauthlayout/nonauthlayout.component';

// const routes:Routes = [
//     {path:"login", component:LoginComponent },
//     {path:"register",component:RegisterComponent},
   
// ]

const routes: Routes = [
  {path:'', redirectTo:"auth/login",pathMatch:'full' },
  {
    path:'',
    component: NonauthlayoutComponent, // Use LayoutAComponent as the layout for this module
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      
      // Add more child routes for the module
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
