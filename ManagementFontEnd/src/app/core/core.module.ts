import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {LoggerService} from './logger.service';

import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from "../shared/modules/material.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    NavComponent,
    FooterComponent
  ],
  declarations: [
    NavComponent,
    FooterComponent
  ],
  providers: [
    LoggerService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
