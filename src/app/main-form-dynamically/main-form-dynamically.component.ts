import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

interface EndpointType {
  name: string;
  required: boolean;
  description: string;
  type: string;
}
interface EndpointTypes {
  [key: string]:EndpointType[]
}

interface FormField {
  [key:string]: FormControl
}

@Component({
  selector: 'app-main-form-dynamically',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './main-form-dynamically.component.html',
  styleUrl: './main-form-dynamically.component.scss',
})

export class MainFormDynamicallyComponent implements OnInit {
  dynamicForm!: FormGroup;

  formFields: EndpointType[] | [] = [];

  endPointTypes: EndpointTypes = {
    http: [
      { name: 'address', required: true, description: 'Address', type: 'text' },
      { name: 'mycharset', required: true, description: 'Charset', type: 'text'  },
      { name: 'credential', required: true, description: 'Credential', type: 'text'  },
      { name: 'folder', required: false, description: 'Folder', type: 'text'  },
      { name: 'filename', required: false, description: 'File Name', type: 'text'  },
    ],
    sftp: [
      { name: 'address', required: true, description: 'Address', type: 'text' },
      { name: 'folder', required: true, description: 'Folder' , type: 'text' },
      { name: 'mycharset', required: true, description: 'Charset' , type: 'text' },
      { name: 'userId', required: true, description: 'User Od' , type: 'text' },
    ],
    api: [
      { name: 'address', required: false, description: 'Address', type: 'text' },
    ]
  }

  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dynamicForm = new FormGroup({
      endPointType: new FormControl('sftp', [Validators.required])
    });

    this.formFields = this.endPointTypes['sftp'];
    Object.keys(this.dynamicForm.controls).forEach((key) => {
      if (key !== 'endPointType'){
        this.dynamicForm.removeControl(key);
      }
    })
    this.formFields.forEach((field) => {
      this.dynamicForm.addControl(field.name, this.formBuilder.control(null, field.required ? Validators.required : null));
    })


    this.dynamicForm.get('endPointType')?.valueChanges.subscribe((value) => {
      console.log(">>>>>> Start >>>>>",this.dynamicForm.controls  )
      this.formFields = this.endPointTypes[value];
      Object.keys(this.dynamicForm.controls).forEach((key) => {
        if (key !== 'endPointType'){
          this.dynamicForm.removeControl(key);
        }
      })
      console.log(">>>>>> End >>>>>",this.dynamicForm.controls)
      // this.dynamicForm.patchValue({endPointType: value});
      this.dynamicForm.updateValueAndValidity();
      this.formFields.forEach((field) => {
        this.dynamicForm.addControl(field.name, this.formBuilder.control('', field.required ? Validators.required : null));
        
      })
      this.dynamicForm.updateValueAndValidity( {onlySelf: false, emitEvent: true});
    });
  }

  get rows(): FormArray {
    return (this.dynamicForm.get('rows') as FormArray);
  }

  // addRow() {
  //   let row = this.formBuilder.group({
  //     item: [null, Validators.required],
  //     quantity: [null, Validators.required],
  //     totalPrice: [null]
  //   });
    
  //   row.controls['totalPrice'].disable();
    
  //   this.rows.push(row);
  // }
  
  onSubmit() {
    console.log(this.dynamicForm.value);
    if (!this.dynamicForm.valid) {
      console.log('Validation failed');
    } 
  }
}
