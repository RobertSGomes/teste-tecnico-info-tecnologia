import { Pipe, PipeTransform, inject } from '@angular/core';
import { NgxMaskService } from 'ngx-mask';

@Pipe({
  name: 'mask',
})
export class MaskPipe implements PipeTransform {
  private readonly maskService = inject(NgxMaskService);

  transform(value: string | number | null | undefined, mask: string): string {
    if (value === null || value === undefined) return '';

    return this.maskService.applyMask(value.toString(), mask);
  }
}
