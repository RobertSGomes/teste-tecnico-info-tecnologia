import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  label = input.required<string>();
  disabled = input<boolean>(false);

  handleClick = output<void>();
}
