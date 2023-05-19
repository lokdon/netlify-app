import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../AppServices/auth-guard.guard';
import { FilesComponent } from './files/files.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:'',
    component: MainLayoutComponent, // Use LayoutAComponent as the layout for this module
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'files',
        component: FilesComponent
      },
      {
        path: 'bot',
        component: ChatBotComponent
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



