import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  countSignIn: number;
  codeWrongPassword = ['auth/wrong-password', 'auth/too-many-requests'];

  /**
   * Wrong password or user event of auth service
   */
  public wrongPasswordOrUserEvent = new EventEmitter<string>();

  /**
   * Email already in use event of auth service
   */
  public emailInAlredyInUseEvent = new EventEmitter<string>();

  /**
   * User created successfully
   */
  public userCreatedSuccessfullyEvent = new EventEmitter<string>();


  constructor(private router: Router, private notificationService: NotificationService) {
    this.countSignIn = 0;

  }

  /**
   * Method used to singUp an user
   * @param email 
   * @param password 
   */
  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        this.userCreatedSuccessfullyEvent.emit('Usuario creado exitosamente.');
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          this.emailInAlredyInUseEvent.emit('El correo proporcinado ya está en uso.');
        }
      });
  }

  /**
   * Method used to SingIn an user
   * @param email 
   * @param password 
   */
  SignInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(

        response => {
          // reset the signIn count
          this.countSignIn = 0;

          // We recover the access token and save
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );

          this.router.navigate(['/historico-indicadores-icp']);
        }

      )
      .catch(error => {
        console.log(error);
        this.handleAuthError(error, email);


      });
  }
  /**
   * Handles auth error
   * @param error 
   * @param email 
   */
  handleAuthError(error: any, email: string) {


    const isWrongPassword = this.codeWrongPassword.find(function (code) {
      return code === error.code;
    });
    if (isWrongPassword) {
      this.countSignIn++;
      console.log('number of intent to signIn: ' + this.countSignIn);
      this.wrongPasswordOrUserEvent.emit('Usuario o password incorrecto.');
    }
    // send a notification when the password has been wrong 3 times
    if (this.countSignIn >= 3) {
      this.notificationService.sendNotificationToAdmin(email);
      this.countSignIn = 0;
    }

  }

  /**
   * Method that return the token
   * @returns string
   */
  getToken(): string {
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        );
    }
    return this.token;
  }


  /**
   * Log out
   */
  logOut() {

    firebase.auth().signOut();
    this.token = null;
  }
  isAuthenticated(): boolean {
    return this.token != null;
  }
}
