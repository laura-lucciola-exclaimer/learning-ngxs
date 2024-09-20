import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './app.state';
import { provideHttpClient } from '@angular/common/http';
import { MockServerService } from '../services/mock-server.service';

@NgModule({
  imports: [NgxsModule.forFeature([AppState])],
  providers: [provideHttpClient(), MockServerService]

})
export class AppStateModule { }
