import { ButtonComponent } from './button/button.component';
import { DetailCellComponent } from './detail-cell/detail-cell.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { TableComponent } from './table/table.component';
import { YearPickerComponent } from './year-picker/yearpicker.component';

const DIALOGS_IMPORTS = [ConfirmDialogComponent];

const COMPONENTS_IMPORTS = [
  InputComponent,
  SelectInputComponent,
  YearPickerComponent,
  ButtonComponent,
  IconComponent,
  TableComponent,
  DetailCellComponent,
  ...DIALOGS_IMPORTS,
];

export { COMPONENTS_IMPORTS };
