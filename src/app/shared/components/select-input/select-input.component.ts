import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SubscriptSizing } from '@angular/material/form-field';
import { MATERIAL_IMPORTS } from '../../material';

@Component({
  selector: 'app-select-input',
  imports: [CommonModule, ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
})
export class SelectInputComponent<T> {
  control = input.required<FormControl>();
  subscriptSizing = input<SubscriptSizing>('fixed');

  label = input.required<string>();
  placeholder = input.required<string>();
  options = input.required<T[]>();

  hintLabel = input('');
  errorLabel = input('');

  clearable = input(false, { transform: booleanAttribute });
}
