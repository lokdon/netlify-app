import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'auth',
    loadChildren: () => import('./Views/Modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./Views/Modules/user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
