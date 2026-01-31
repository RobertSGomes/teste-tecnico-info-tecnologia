import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly DURATION_MS = 3 * 1000; // 3 Segundos

  private readonly matSnackbar = inject(MatSnackBar);

  showSuccessMessage(message: string, duration = this.DURATION_MS): void {
    this.matSnackbar.open(message, undefined, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'snackbar-success',
    });
  }

  showErrorMessage(message: string, duration = this.DURATION_MS): void {
    this.matSnackbar.open(message, undefined, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'snackbar-error',
    });
  }
}
