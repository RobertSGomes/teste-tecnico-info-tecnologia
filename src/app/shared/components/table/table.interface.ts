import { IconTypes } from '../../types/icon.type';

export interface ITableColumn<T> {
  id: string;
  headerLabel: string;
  rowLabel: (row: T) => string | number;
  minWidth: number;
  maxWidth?: number;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
}

export interface ITableAction<T> {
  id: string;
  label: string;
  icon?: IconTypes;
  handleClick: (rowData: T) => void;
}
