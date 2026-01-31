import { CommonModule } from '@angular/common';

import { COMPONENTS_IMPORTS } from './components';
import { MATERIAL_IMPORTS } from './material';
import { PIPES_IMPORTS } from './pipes';

const SHARED_IMPORTS = [
  CommonModule,
  COMPONENTS_IMPORTS,
  MATERIAL_IMPORTS,
  PIPES_IMPORTS,
];

export { SHARED_IMPORTS };
