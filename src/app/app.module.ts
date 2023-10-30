import { NgModule, isDevMode, LOCALE_ID, Inject } from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import localeDe from '@angular/common/locales/de'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './shared/menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { registerLocaleData } from '@angular/common';
import { EditUserComponent } from './dialog/edit-user/edit-user.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    PageNotFoundComponent,
    EditUserComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  
  exports: [
    MatInputModule
  ],
  providers: [
    { provide: JsonPipe },
    {provide: LOCALE_ID, useValue: 'de'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(@Inject(LOCALE_ID) locale: string) {
    registerLocaleData(localeDe);
    //console.log('DEBUG – Current Locale:', locale);
  }
}
