import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AlertService } from './alert.service';
import { map } from 'rxjs/operators'
import { Roles } from '../models/userRol.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserModel | undefined;
  autenticado: boolean = false;

  // users: Observable<UserModel>;
  private userCollection: AngularFirestoreCollection<UserModel>;

  // subscriptions
  authSuscription?: Subscription;
  userSuscription?: Subscription;
  angularFireAuthSubscription?: Subscription;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.cargarUsuario();
    this.userCollection = afs.collection<UserModel>('users');
  }

  cargarUsuario(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user) || null;
      this.autenticado = true;
    }
  }

  login(email: string, password: string){
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async signUp(user: UserModel): Promise<void>{
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password!)
        if(!resp){
          reject()
        }
        const userId = resp.user?.uid;
        this.angularFireAuth.updateCurrentUser(resp.user);
        user.userId = userId;
        delete user.password;
        await this.userCollection.add(user)
        this.user = user;
        this.autenticado = true;
        localStorage.setItem('user', JSON.stringify(user));
        resolve();
      } catch (err: any) {
        console.log(err);
        this.alertService.showAlert('Error', err, 'error');
        reject()
      }
    });
  }

  logOut() {
    this.user = undefined;
    this.autenticado = false;
    this.unsubscribe();
    this.angularFireAuth.updateCurrentUser(null);
    return this.angularFireAuth.signOut();
  }

  unsubscribe(){
    this.authSuscription?.unsubscribe();
    // this.userSuscription?.unsubscribe();
    this.angularFireAuthSubscription?.unsubscribe();

  }

  getUser(uid: string){
    this.userCollection = this.afs.collection<UserModel>('users', ref => ref.where('userId', '==', uid));
    return this.userCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const datos = a.payload.doc.data() as UserModel;
          const id = a.payload.doc.id;
          const user: UserModel = { id, ... datos }
          this.user = user;
          this.autenticado = true;
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        })
      )
    );
  }

}
