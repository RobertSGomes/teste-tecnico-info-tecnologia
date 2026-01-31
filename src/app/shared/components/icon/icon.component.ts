import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IconTypes } from '../../types/icon.type';

@Component({
  selector: 'app-icon',
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  name = input.required<IconTypes>();
  size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
}
