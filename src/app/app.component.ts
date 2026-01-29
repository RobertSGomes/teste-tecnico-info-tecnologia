import { Component } from '@angular/core';
import { COMPONENTS_IMPORTS } from './shared/components';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [COMPONENTS_IMPORTS, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
