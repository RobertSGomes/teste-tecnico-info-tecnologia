import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { IconComponent } from '../icon/icon.component';
import { LoadingComponent } from '../loading/loading.component';
import { ITableAction, ITableColumn } from './table.interface';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatDividerModule,
    MatPaginatorModule,
    IconComponent,
    LoadingComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T> implements OnInit {
  records = input.required<T[]>();
  recordsLength = input.required<number>();
  isLoading = input.required<boolean>();
  loadingLabel = input<string>('');
  columns = input.required<ITableColumn<T>[]>();
  actions = input<ITableAction<T>[]>();
  noDataLabel = input<string>('Nenhum resultado encontrado');

  handlePaginatorChange = output<MatPaginator>();

  pageSizeOptions = computed(() => {
    if (!this.recordsLength) return [10];

    const totalRecords = this.recordsLength();
    const possiblePageSizes = [10, 25, 50, 75, 100];

    const pageSizeOptions = possiblePageSizes.filter((size) => {
      if (size === 10) return true;
      if (totalRecords > 10 && totalRecords + 25 > size) return true;
      return false;
    });

    return pageSizeOptions;
  });

  paginator = viewChild.required<MatPaginator>(MatPaginator);

  ngOnInit() {
    this.handlePaginatorChange.emit(this.paginator());

    this.paginator().page.subscribe(() => {
      this.handlePaginatorChange.emit(this.paginator());
    });
  }

  getDisplayedColumns() {
    const displayedColumns = this.columns().map((column) => column.id);

    if (this.actions()?.length) {
      displayedColumns.push('actions');
    }

    return displayedColumns;
  }
}
