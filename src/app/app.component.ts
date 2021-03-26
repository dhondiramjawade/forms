import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'forms';
  list: Array<any> = [{ lable: "First Name", value: "A", control: new FormControl("Yash") }, { lable: "Last Name", value: "B", control: new FormControl("Jawade") }];
  json: any = "";
  data1: any = "init";
  data2: any;
  fControl = new FormControl("abc");

  // group 
  fGroup = new FormGroup({
    fName: new FormControl("Yash", [Validators.required]),
    lName: new FormControl("Jawade", [Validators.required]),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  })

  dFGroup = this.fb.group({
    fName: [],
    lName: [],
    address: this.fb.group({
      street: [],
      city: [],
      state: [],
      zip: []
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  })

  public get aliases() {
    return this.dFGroup.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) {

  }
  onclick() {
    this.json = this.list.map(x => x.value);
    this.fControl.setValue("clicked");
  }

  gOnclick() {

  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

}
