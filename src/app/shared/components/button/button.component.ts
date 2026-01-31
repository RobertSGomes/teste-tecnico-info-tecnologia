import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { IconTypes } from '../../types/icon.type';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  label = input.required<string>();
  icon = input<IconTypes>();
  disabled = input<boolean>(false);
  variant = input<'primary' | 'secondary' | 'tertiary'>('primary');

  handleClick = output<void>();
}
