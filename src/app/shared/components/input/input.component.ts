import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  SubscriptSizing,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
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
  hintLabel = input('');
  errorLabel = input('');
  minLength = input(0);
  maxLength = input(0);
  mask = input('');
  prefix = input('');
  suffix = input('');
}
