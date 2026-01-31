import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  MatFormFieldModule,
  SubscriptSizing,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import moment, { Moment } from 'moment';

const YEAR_ONLY_FORMAT = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-year-picker',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './year-picker.component.html',
  styleUrl: './year-picker.component.css',
  providers: [
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: YEAR_ONLY_FORMAT },
  ],
})
export class YearPickerComponent implements OnInit {
  control = input.required<FormControl<number | null>>();
  subscriptSizing = input<SubscriptSizing>('fixed');
  label = input.required<string>();
  placeholder = input.required<string>();
  hintLabel = input('');
  errorLabel = input('');
  min = input(null, {
    transform: (year: number | null) => this.toMomentYear(year),
  });
  max = input(null, {
    transform: (year: number | null) => this.toMomentYear(year),
  });

  internalControl = new FormControl<Moment | null>(null);

  ngOnInit() {
    this.handleSyncInternalControl(this.control().value);
    this.control().valueChanges.subscribe((year) => {
      this.handleSyncInternalControl(year);
    });
  }

  handleSyncInternalControl(year: number | null) {
    if (year == null) {
      this.internalControl.setValue(null);
      return;
    }

    this.internalControl.setValue(moment({ year, month: 0, day: 1 }));
  }

  handleYearSelected(year: Moment, datepicker: MatDatepicker<Moment>) {
    this.control().setValue(year.year());

    datepicker.close();
  }

  private toMomentYear(year: number | null): Moment | null {
    return year == null ? null : moment({ year, month: 0, day: 1 });
  }
}
