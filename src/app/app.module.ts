import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrimeModule } from './prime.module';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComponentsModule } from './components/components.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PipesModule } from './pipes/pipes.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EgresadoModule } from './pages/egresados/egresado/egresado.module';
import { EmpresarioModule } from './pages/empresarios/empresario/empresario.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PrimeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    EmpresarioModule,
    ComponentsModule,
    EgresadoModule,
    PipesModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    HttpClientModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    AngularFirestore,
    /* {
      // provide: StorageBucket,
      useValue: 'gs://sistema-unipalido.appspot.com'
    } */
  ],
  exports: [
    NavbarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
