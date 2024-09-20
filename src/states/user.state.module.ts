import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './user.state';
import { provideHttpClient } from '@angular/common/http';
import { MockServerService as UserService } from '../services/mock-server.service';

@NgModule({
  imports: [NgxsModule.forFeature([UserState])],
  providers: [provideHttpClient(), UserService]

})
export class UserStateModule { }
