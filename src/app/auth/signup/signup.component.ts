import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MustMatch } from '../../_helpers/must-match.validator';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  /**
   * Will contain the message from back when email give is already in use
   */
  emailAlreadyInUse = null;

  /**
   *Message used when user is created successfully
   */
  userCreatedSuccessfully = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) {


    // create the form controlls
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(35)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required],

    }, { validator: MustMatch('password', 'confirmPassword') });
  }

  ngOnInit() {
    // We subscribe to the event when email already in use
    this.authService.emailInAlredyInUseEvent.subscribe((data: string) => {
      this.emailAlreadyInUse = data;
      const self = this;
      // after two second, I hide the alert
      setTimeout(function () {
        self.emailAlreadyInUse = null;

      }, 2000);

    });

    // We subscribe to the event when user is created successfully
    this.authService.userCreatedSuccessfullyEvent.subscribe((data: string) => {
      this.userCreatedSuccessfully = data;
      const self = this;
      // after two second, I hide the alert
      setTimeout(function () {
        self.userCreatedSuccessfully = null;
        self.route.navigate(['/iniciar-sesion']);

      }, 2000);
    });
  }



  /**
   * Call method to create a new user
   */
  onSignup() {

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    console.log('lamando a metodo para registrare');
    this.authService.signUpUser(email, password);



  }

}
