import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ReactiveFormsModule, AbstractControl, Form, ValidationErrors } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';

interface EndpointType {
  name: string;
  required: boolean;
  description: string;
  type: string;
}
interface EndpointTypes {
  [key: string]: EndpointType[]
}

interface FormField {
  [key: string]: FormControl
}

@Component({
  selector: 'app-main-form-dynamically-by-array',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './main-form-dynamically-by-array.component.html',
  styleUrl: './main-form-dynamically-by-array.component.scss'
})
export class MainFormDynamicallyByArrayComponent implements OnInit {

  endPointTypes: EndpointTypes = {
    http: [
      { name: 'endPointAddress', required: true, description: 'Address', type: 'text' },
      { name: 'charset', required: true, description: 'Charset', type: 'text' },
      { name: 'credential', required: true, description: 'Credential', type: 'text' },
      { name: 'folder', required: false, description: 'Folder', type: 'text' },
      { name: 'filename', required: false, description: 'File Name', type: 'text' },
    ],
    sftp: [
      { name: 'endPointAddress', required: true, description: 'Address', type: 'text' },
      { name: 'folder', required: true, description: 'Folder', type: 'text' },
      { name: 'charset', required: true, description: 'Charset', type: 'text' },
      { name: 'userId', required: true, description: 'User Od', type: 'text' },
    ],
    api: [
      { name: 'endPointAddress', required: false, description: 'Address', type: 'text' },
    ]
  }

  errors: string[] = [];

  dynamicForm = new FormGroup({
    type: new FormControl('http'),
    endPointAddress: new FormControl(''),
    charset: new FormControl(''),
    credential: new FormControl(''),
    folder: new FormControl(''),
    filename: new FormControl(''),
    userId: new FormControl(''),
  });

  constructor(
  ) { }

  ngOnInit(): void {

    this.getFieldsByEndpointTypes()
      .filter((field: EndpointType) => field.name !== this.dynamicForm.get('type')?.value).forEach((field: EndpointType) => {
        if (field.required)  this.dynamicForm.get(field.name)?.setValidators([Validators.required])
        else this.dynamicForm.get(field.name)?.clearValidators()
        this.dynamicForm.get(field.name)?.setValue(null)
        this.dynamicForm.get(field.name)?.updateValueAndValidity()
      });

    this.dynamicForm.get('type')?.valueChanges.pipe(
      tap(() => {
        this.errors = [];
        this.dynamicForm.setErrors([]);
        Object.keys(this.dynamicForm.controls).forEach((controlName: string) => {
          if (controlName === 'type') return;
          console.log(">>>>>>",controlName);
          const control = this.dynamicForm.get(controlName);
          if (control) {
            control.setValue(null);
            control.setValidators([]);
            control.clearValidators();
            control.setErrors(null);
          }
        });
      })
    ).subscribe(() => {
      this.getFieldsByEndpointTypes().forEach((field: EndpointType) => {
        if (field.required)  {
          this.dynamicForm.get(field.name)?.reset();
          this.dynamicForm.get(field.name)?.setValidators([Validators.required])
          this.dynamicForm.get(field.name)?.setValue(null);
          this.dynamicForm.get(field.name)?.updateValueAndValidity();
        }
      });
      
    });
    this.dynamicForm.updateValueAndValidity();
  }

  getFieldsByEndpointTypes(): EndpointType[] {
    const type = this.dynamicForm.controls.type.value as string;
    if (type === null) return [];
    return this.endPointTypes[type];
  }

  getAllFormFields(): Observable<EndpointType[]> {
    const formFields = Object.keys(this.endPointTypes).map((key: string) => { 
      return this.endPointTypes[key].map((field: EndpointType) => field) 
    });
    return of(formFields.flat());
  }

  onSubmit(): void {
    this.errors = [];
    console.log(this.dynamicForm.status, this.dynamicForm.valid);
    if (this.dynamicForm.valid) {
      this.errors.push(`No Errors: status ${this.dynamicForm.status} valid ${this.dynamicForm.valid}`);
      console.log(this.dynamicForm.value);
    } else {
      Object.keys(this.dynamicForm.controls).forEach(key => {
        const controlErrors: any = this.dynamicForm.get(key)?.errors;
        if (controlErrors != undefined) {
          Object.keys(controlErrors).forEach(keyError => {
            this.errors.push('Key control: ' + key + ', keyError: ' + keyError + ', err value: ' + controlErrors[keyError]);  
          });
        }
      });
    }
  }
}
