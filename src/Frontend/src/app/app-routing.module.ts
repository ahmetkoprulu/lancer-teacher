import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';

export const routes: Routes = [
  {path: 'projects', component: ProjectComponent  },
  {path: 'create-project', component: ProjectCreateComponent},
  {path: 'projects/:pId', component: ProjectDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile/:uId', component: InstructorProfileComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'projects', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
