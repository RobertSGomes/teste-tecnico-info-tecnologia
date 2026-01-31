import { inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MASKS } from '../constants/masks.const';

export type ControlValue<T> = T[keyof T] | null;
export type FormGroupType<T> = FormGroup & {
  controls: {
    [K in keyof T]: FormControl<T[K] | null>;
  };
};

export abstract class BaseForm<T> {
  readonly formBuilder = inject(FormBuilder);
  readonly masks = MASKS;

  /** FormGroup do formulário */
  form!: FormGroupType<T>;

  /** Cada componente específico deve implementar a definição do valor padrão do formulário */
  abstract defaultFormValue: T;

  /** Cada componente específico deve implementar a criação do formulário */
  abstract buildForm(): void;

  /** Retorna o valor do formulário */
  getFormValue(): T {
    return this.form.getRawValue() as T;
  }

  /** Atualiza valores do formulário */
  patchFormValue(value: Partial<T>): void {
    this.form.patchValue(value);
  }

  /** Reseta o formulário */
  resetForm(): void {
    this.form.reset(this.defaultFormValue);
  }

  /** Retorna o control */
  getControl(controlName: keyof T) {
    return this.form.get(controlName as string) as FormControl;
  }

  /** Retorna o valor do control */
  getControlValue(controlName: keyof T): ControlValue<T> {
    const control = this.form.get(controlName as string);

    if (!control) return null;

    return control.value;
  }

  /** Define o valor do control */
  setControlValue(controlName: keyof T, value: ControlValue<T>): void {
    const control = this.form.get(controlName as string);

    if (!control) return;

    control.setValue(value);
  }

  /** Desabilita o control */
  disableControl(controlName: keyof T): void {
    const control = this.form.get(controlName as string);

    if (!control) return;

    control.disable();
  }

  /** Habilita o control */
  enableControl(controlName: keyof T): void {
    const control = this.form.get(controlName as string);

    if (!control) return;

    control.enable();
  }

  /** Reseta o valor do control */
  resetControl(controlName: keyof T): void {
    const control = this.form.get(controlName as string);
    const defaultControlValue = this.defaultFormValue[controlName];

    if (!control) return;

    control.reset(defaultControlValue);
  }

  /** Checa se o formulário é inválido */
  isFormInvalid(): boolean {
    this.form.markAllAsTouched();

    return this.form.invalid;
  }

  /** Checa se o formulário é válido */
  isFormValid(): boolean {
    this.form.markAllAsTouched();

    return this.form.valid;
  }
}
