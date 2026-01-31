import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  SubscriptSizing,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
})
export class SelectInputComponent<T> {
  control = input.required<FormControl>();
  options = input.required<T[]>();
  isLoading = input<boolean>(false);
  subscriptSizing = input<SubscriptSizing>('fixed');
  label = input.required<string>();
  placeholder = input.required<string>();
  hintLabel = input('');
  errorLabel = input('');
  clearable = input(false, { transform: booleanAttribute });
}
