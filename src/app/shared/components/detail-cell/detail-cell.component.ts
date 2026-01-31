import { Component, input } from '@angular/core';

@Component({
  selector: 'app-detail-cell',
  imports: [],
  templateUrl: './detail-cell.component.html',
  styleUrl: './detail-cell.component.css',
})
export class DetailCellComponent {
  title = input.required<string>();
  description = input<string | number | null | undefined>(null);
  isLoading = input<boolean>();
}
