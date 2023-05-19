import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../AppServices/auth-guard.guard';
import { FilesComponent } from './files/files.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { GenerateQuestionsAnsComponent } from './generate-questions-ans/generate-questions-ans.component';

const routes: Routes = [
  {
    path:'',
    component: MainLayoutComponent, // Use LayoutAComponent as the layout for this module
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent
      // },
      {
        path: 'files',
        component: FilesComponent
      },

      {
        path: 'questionsandans',
        component: GenerateQuestionsAnsComponent
      },
      // Add more child routes for the module
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }



