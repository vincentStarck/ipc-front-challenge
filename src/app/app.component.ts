import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IPC';

  constructor(private route: Router) {

  }
  ngOnInit() {
    // initizer firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyAe_2nAeIue3-t1CBk-6vqxuBxOk_6j1hI',
      authDomain: 'ipc-backend.firebaseapp.com'
    });
    this.route.navigate(['/landing']);
  }
}
