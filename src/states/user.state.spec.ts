import { TestBed } from '@angular/core/testing';
import { Store, provideStore } from '@ngxs/store';
import { UserState } from './user.state';
import { AddUser, DeleteUser, GetUsers, UpdateUser } from '../actions/user.action';
import { UserService } from '../services/user.service';
import { User } from '../types/user';
import { createTestUser } from '../utils/create-test-user';
import { of } from 'rxjs';

describe('UserState', () => {
    let store: Store;
    let userService: jasmine.SpyObj<UserService>;

  
    beforeEach(() => {
        const spy = jasmine.createSpyObj('UserService', ['fetchUsers', 'addUsers', 'updateUser', 'deleteUser']);
      TestBed.configureTestingModule({
        providers: [provideStore([UserState]),
        { provide: UserService, useValue: spy }
      ]
      });
  
      store = TestBed.inject(Store);
      userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    });
  
    it('should get users', () => {
      const testUsers: User[] = [createTestUser()];
        userService.fetchUsers.and.returnValue(of(testUsers));
    
        store.dispatch(new GetUsers());
    
        const users = store.selectSnapshot(UserState.getAllUsers);
        expect(users).toEqual(testUsers);
      });

    it('should add user', () => {
      const testUsers: User = createTestUser();
        userService.addUsers.and.returnValue(of(testUsers));
    
        store.dispatch(new AddUser(testUsers));
    
        const users = store.selectSnapshot(UserState.getAllUsers);
        expect(users).toEqual([testUsers]);
      });

    it('should add user', () => {
      const testUsers: User = createTestUser();
        userService.addUsers.and.returnValue(of(testUsers));
    
        store.dispatch(new AddUser(testUsers));
    
        const users = store.selectSnapshot(UserState.getAllUsers);
        expect(users).toEqual([testUsers]);
      });

      it('should update an existing user', () => {
        const testUsers: User = createTestUser();
        userService.addUsers.and.returnValue(of(testUsers));    
        store.dispatch(new AddUser(testUsers));
        const updatedUser: User = { ...testUsers, name: 'Updated Name' };
        userService.updateUser.and.returnValue(of(updatedUser));
    
        store.dispatch(new UpdateUser(updatedUser, updatedUser.id));
    
        const users = store.selectSnapshot(UserState.getAllUsers);
        expect(users[0].name).toBe('Updated Name');
      });

      it('should not update an missing user', () => {
        const testUsers: User = createTestUser();
        userService.addUsers.and.returnValue(of(testUsers));    
        store.dispatch(new AddUser(testUsers));
        const updatedUser: User = { ...testUsers, name: 'Updated Name' };
        userService.updateUser.and.returnValue(of(updatedUser));
    
        store.dispatch(new UpdateUser(updatedUser, 1000));
    
        const users = store.selectSnapshot(UserState.getAllUsers);
        expect(users[0].name).toBe(testUsers.name);
      });  

      it('should delete an existing user', () => {
        const testUsers: User = createTestUser();
        userService.addUsers.and.returnValue(of(testUsers));    
        store.dispatch(new AddUser(testUsers));
        userService.deleteUser.and.returnValue(of({}));
    
        store.dispatch(new DeleteUser(testUsers.id));
    
        const users = store.selectSnapshot(UserState.getAllUsers);
        expect(users.length).toBe(0);
      });

      it('should not delete an missing user', () => {
        const testUsers: User = createTestUser();
        userService.addUsers.and.returnValue(of(testUsers));    
        store.dispatch(new AddUser(testUsers));
        userService.deleteUser.and.returnValue(of({}));
    
        store.dispatch(new DeleteUser(1000));
    
        const users = store.selectSnapshot(UserState.getAllUsers);
        expect(users[0].id).toBe(testUsers.id);
      });    
  });
