import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-form-dynamically-by-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './main-form-dynamically-by-group.component.html',
  styleUrl: './main-form-dynamically-by-group.component.scss'
})
export class MainFormDynamicallyByGroupComponent {
  name = 'Add / Remove Fields - dynamically';
  public userForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.userForm = this._fb.group({
      address: this._fb.array([this.addAddressGroup()]),
    });
  }

  private addAddressGroup(): FormGroup {
    return this._fb.group({
      street: [],
      city: [],
    });
  }

  //Add Fields
  addAddress(): void {
    this.addressArray.push(this.addAddressGroup());
    console.log(this.addressArray.controls);
  }

  //Remove Fields
  removeAddress(index: number): void {
    this.addressArray.removeAt(index);
  }
  //Fields Array
  get addressArray(): FormArray {
    return <FormArray>this.userForm.get('address');
  }
}
