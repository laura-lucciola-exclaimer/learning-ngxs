import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {  By } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserComponent } from './user/user.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([]),
        NgxsLoggerPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        AppComponent,
        UserComponent
      ]
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the user component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const userComponent = fixture.debugElement.query(By.directive(UserComponent));
    expect(userComponent).toBeTruthy();
  });
});