import { inject, Pipe, PipeTransform } from '@angular/core';
import { NgxMaskService } from 'ngx-mask';

import { MASKS } from '../constants/masks.const';

@Pipe({
  name: 'mask',
})
export class MaskPipe implements PipeTransform {
  private readonly maskService = inject(NgxMaskService);

  transform(
    value: string | number | null | undefined,
    mask: keyof typeof MASKS,
  ): string {
    if (value === null || value === undefined) return '';

    const maskToApply = MASKS[mask];

    return this.maskService.applyMask(value.toString(), maskToApply);
  }
}
