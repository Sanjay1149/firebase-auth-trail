import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AuthService} from './auth.service';
import {RouterModule} from '@angular/router';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import {AuthGuard} from './auth.guard';

const firebaseConfig = {
  apiKey: 'AIzaSyBqp8P05fnGmUrWIiv7pf8SHJncwTTJ15w',
  authDomain: 'firebasics-2b938.firebaseapp.com',
  databaseURL: 'https://firebasics-2b938.firebaseio.com',
  projectId: 'firebasics-2b938',
  storageBucket: 'firebasics-2b938.appspot.com',
  messagingSenderId: '900460710198',
  appId: '1:900460710198:web:4249bd8ccfd9a636da8b97',
  measurementId: 'G-492N20X0ZL'
};

@NgModule({
  declarations: [
    AppComponent,
    SuperSecretComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', component: AppComponent},
        { path: 'secret', component: SuperSecretComponent, canActivate: [AuthGuard] }
      ]
    ),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
