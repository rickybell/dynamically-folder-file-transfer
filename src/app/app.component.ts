import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFormDynamicallyComponent } from "./main-form-dynamically/main-form-dynamically.component";
import { MainFormDynamicallyByGroupComponent } from './main-form-dynamically-by-group/main-form-dynamically-by-group.component';
import { MainFormDynamicallyByArrayComponent } from "./main-form-dynamically-by-array/main-form-dynamically-by-array.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainFormDynamicallyComponent, MainFormDynamicallyByGroupComponent, MainFormDynamicallyByArrayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamically-folder-file-transfer';
}
