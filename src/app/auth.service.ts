import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { auth } from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import { User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  constructor(
    private authenticate: AngularFireAuth,
    private store: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.authenticate.authState.pipe(
      switchMap( user => {
        if (user) {
          return store.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.authenticate.auth.signInWithPopup(provider);
    // return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.authenticate.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const document: AngularFirestoreDocument = this.store.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    return document.set( data , {merge: true});
  }

}
