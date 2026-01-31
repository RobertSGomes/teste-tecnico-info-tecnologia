import { inject, Injectable } from '@angular/core';
import { NgxMaskService } from 'ngx-mask';

import { MASKS } from '../constants/masks.const';

@Injectable({ providedIn: 'root' })
export class MaskHelper {
  maskService = inject(NgxMaskService);

  format(
    value: string | number | null | undefined,
    mask: keyof typeof MASKS,
  ): string {
    if (value == null) return '';

    const maskToApply = MASKS[mask];

    return this.maskService.applyMask(value.toString(), maskToApply);
  }
}
