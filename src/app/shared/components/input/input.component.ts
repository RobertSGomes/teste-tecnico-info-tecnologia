import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { SubscriptSizing } from '@angular/material/form-field';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MATERIAL_IMPORTS,
    NgxMaskDirective,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  control = input.required<FormControl>();
  subscriptSizing = input<SubscriptSizing>('fixed');

  label = input.required<string>();
  placeholder = input.required<string>();

  minLength = input(0);
  maxLength = input(0);

  hintLabel = input('');
  errorLabel = input('');

  mask = input('');
  prefix = input('');
  suffix = input('');
}
