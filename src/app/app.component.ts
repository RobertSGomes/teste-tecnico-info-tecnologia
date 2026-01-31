import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { COMPONENTS_IMPORTS } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [COMPONENTS_IMPORTS, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
