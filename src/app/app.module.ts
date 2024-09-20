import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
    imports: [
      BrowserModule,
      NgxsModule.forRoot([]),
      NgxsLoggerPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot(),
    ],

  })
  export class AppModule { }