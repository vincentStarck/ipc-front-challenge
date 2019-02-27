import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;

  /**
   * the message of the authentication error
   */
  messageAlerWrongPassword = null;

  constructor(private fb: FormBuilder, public authService: AuthService) {
    // create the form controlls
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(35)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });

  }

  ngOnInit() {
    // we subcribe to the event that is emmited when authenticacion is not successfully
    this.authService.wrongPasswordOrUserEvent.subscribe((data: string) => {
      this.messageAlerWrongPassword = data;
      const self = this;
      // Hide de alert after one second
      setTimeout(function () {
        self.messageAlerWrongPassword = null;
      }, 2000);

    }
    );
  }

  /**
   * call the  autheService to authenticate the user
   */
  onSignIn() {

    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.authService.SignInUser(email, password);

  }

}
