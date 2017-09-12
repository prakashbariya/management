import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';

import {NavigationEnd, Router} from '@angular/router';
import {AppConfig} from './config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(
              private title: Title,
              private meta: Meta,
              private router: Router) {
  }
}
