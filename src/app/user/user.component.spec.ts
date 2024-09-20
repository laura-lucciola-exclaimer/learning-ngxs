import { TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { UserState } from '../../states/user.state';
import { UserStateModule } from '../../states/user.state.module';

describe('UserComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([UserState]),
        UserStateModule
      ],
      providers: [provideHttpClient(), UserService]
    }).compileComponents();
  });

  it('should create the user component', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should return the correct title based on addMode', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;

    const testCases = [
      { addMode: true, expectedTitle: 'Add new user' },
      { addMode: false, expectedTitle: 'Update user' }
    ];

    testCases.forEach(testCase => {
      component.addMode.set(testCase.addMode);
      expect(component.getTitle()).toBe(testCase.expectedTitle);
    });
  });
});
