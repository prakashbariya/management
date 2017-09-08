import {Component, Inject} from '@angular/core';

import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';
import {ProgressBarService} from '../../shared/services/progress-bar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  appConfig: any;
  menuItems: any[];
  progressBarMode: string;


  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
              private progressBarService: ProgressBarService,) {
    this.appConfig = appConfig;

    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  changeLanguage(language: string): void {
    //this.loadMenus();
  }

}
