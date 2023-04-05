import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {ApiInterceptor} from "./interceptor/api.interceptor";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {RepositoriesComponent} from './components/repositories/repositories.component';
import {SettingsComponent} from './components/settings/settings.component';

// PrimeNG components
import {TabMenuModule} from 'primeng/tabmenu';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import { RegistryAnalysisComponent } from './components/home/registry-analysis/registry-analysis.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {PasswordModule} from "primeng/password";
import { StatusComponent } from './components/common/status/status.component';
import {CheckboxModule} from "primeng/checkbox";
import {TagModule} from "primeng/tag";
import { RepositoryComponent } from './components/repositories/repository/repository.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepositoriesComponent,
    SettingsComponent,
    RegistryAnalysisComponent,
    StatusComponent,
    RepositoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabMenuModule,
    CardModule,
    DividerModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    HttpClientModule,
    ToastModule,
    PasswordModule,
    CheckboxModule,
    TagModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
