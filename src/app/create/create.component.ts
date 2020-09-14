import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { Tutorial } from './../models/tutorial.model'
import * as TutorialActions from './../actions/tutorial.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  tutorialForm: FormGroup;
  submitted = false;
  tutorials: Observable<Tutorial[]>;
  @ViewChild('firstName', { static: false }) firstName;
  @ViewChild('lastName', { static: false }) lastName;
  @ViewChild('Age', { static: false }) Age;
  @ViewChild('Designation', { static: false }) Designation;
  currentIndex = "";
  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) { }

  addTutorial(firstName, lastName, Age, Designation) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.tutorialForm.invalid) {
      return;
    }
    let data = this.store.select('tutorial');
    console.log('length is ==', data, this.currentIndex)
    if (this.currentIndex === "")
      this.store.dispatch(new TutorialActions.AddTutorial({ firstName: firstName, lastName: lastName, Age: Age, Designation: Designation }))
    else
      this.store.dispatch(new TutorialActions.UpdateTutorial({ data: { firstName: firstName, lastName: lastName, Age: Age, Designation: Designation }, key: this.currentIndex }))
    this.tutorials = this.store.select('tutorial');
    this.firstName.nativeElement.value = '';
    this.currentIndex = '';
    this.lastName.nativeElement.value = '';
    this.Age.nativeElement.value = '';
    this.Designation.nativeElement.value = '';
  }

  displayChange(e) {
    this.currentIndex = e.key;
    this.firstName.nativeElement.value = e.data.firstName;
    this.lastName.nativeElement.value = e.data.lastName;
    this.Age.nativeElement.value = e.data.Age;
    this.Designation.nativeElement.value = e.data.Designation;
  }

  // convenience getter for easy access to form fields
  get f() { return this.tutorialForm.controls; }

  ngOnInit() {
    this.tutorialForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      designation: ['', Validators.required],
    });
  }

}
