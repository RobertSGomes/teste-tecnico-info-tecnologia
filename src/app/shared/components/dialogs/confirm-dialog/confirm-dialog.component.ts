import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { ButtonComponent } from '../../button/button.component';
import { IConfirmDialogData } from './confirm-dialog.interface';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, ButtonComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  public data = inject<IConfirmDialogData>(MAT_DIALOG_DATA);

  handleConfirm(): void {
    this.dialogRef.close(true);
  }

  handleCancel(): void {
    this.dialogRef.close(false);
  }
}
