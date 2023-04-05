import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RepositoriesComponent} from "./components/repositories/repositories.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {RepositoryComponent} from "./components/repositories/repository/repository.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'repositories/:repository', component: RepositoryComponent },
  { path: 'settings', component: SettingsComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
