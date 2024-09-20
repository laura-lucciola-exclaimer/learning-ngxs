import { TestBed } from '@angular/core/testing';
import {  HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../types/user';
import { provideHttpClient } from '@angular/common/http';

function createTestUser(): User {
  return {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  };
}

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService, 
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const dummyUsers: User[] = [createTestUser(), { ...createTestUser(), id: 2, name: 'Jane Doe' }];

    service.fetchUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should add a user', () => {
    const newUser: User = createTestUser();

    service.addUsers(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['url']}${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a user', () => {
    const updatedUser: User = createTestUser();

    service.updateUser(updatedUser, updatedUser.id).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${service['url']}${updatedUser.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });
});
