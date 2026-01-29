import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly matSnackbar = inject(MatSnackBar);

  showMessage(
    message: string,
    action: string = 'Close',
    duration: number = 3000,
  ): void {
    this.matSnackbar.open(message, action, { duration });
  }
}
