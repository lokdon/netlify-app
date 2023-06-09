import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FilesComponent } from './files/files.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { GenerateQuestionsAnsComponent } from './generate-questions-ans/generate-questions-ans.component';
import { UsereventComponent } from './EventComponent/userevent/userevent.component';
import { ContactContainerComponent } from './ContactComponents/contact-container/contact-container.component';
import { GroupTableCompComponent } from './GroupComponents/group-table-comp/group-table-comp.component';
import { AuthGuard } from 'src/app/AppServices/auth-guard.guard';
import { EventInboxComponent } from './EventComponent/event-inbox/event-inbox.component';
import { MyEventTabViewContainerComponent } from './EventComponent/MyEvents/my-event-tab-view-container/my-event-tab-view-container.component';

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
      {
        path: 'userevent',
        component: UsereventComponent
      },
      {
        path: 'receivedevents',
        component: EventInboxComponent
      },
      {
        path: 'myevents',
        component: MyEventTabViewContainerComponent
      },
      {
        path: 'addcontact',
        component: ContactContainerComponent
      },
      {
        path: 'group',
        component: GroupTableCompComponent
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



