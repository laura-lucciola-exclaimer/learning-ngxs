import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { MockServerService } from './services/mock-server.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      NgxsModule.forRoot([]),
      NgxsLoggerPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot()
    ),
    MockServerService
  ]
}).catch((err) => console.error(err));