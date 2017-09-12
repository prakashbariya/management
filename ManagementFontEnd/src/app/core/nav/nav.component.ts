import {Component, Inject} from '@angular/core';

import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  appConfig: any;
  menuItems: any[];
  progressBarMode: string;


  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig) {
    this.appConfig = appConfig;

  }

  changeLanguage(language: string): void {
    //this.loadMenus();
  }

}
