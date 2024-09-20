import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GetUsers, AddUser, UpdateUser, DeleteUser } from '../../actions/user.action';
import { UserState } from '../../states/user.state';
import { CommonModule } from '@angular/common';
import { UserStateModule } from '../../states/user.state.module';
import { User } from '../../types/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UserStateModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  public userForm!: FormGroup;
  public users$ = this.store.select(UserState.getAllUsers);

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      website: ['']
    });

    this.store.dispatch(new GetUsers());
  }

  public addUser() {
    this.store.dispatch(new AddUser(this.userForm.value));
    this.userForm.reset();
  }

  public updateUser(id: number) {

    const newData : User = {
      id: id,
      name: "Hello World",
      username: "helloWorld2024",
      email: 'helloWorld2024@gmail.com',
      phone: '02138-280055',
      website: 'helloWorld.com'
    }

    this.store.dispatch(new UpdateUser(newData, id));
  }

  public deleteUser(i: number) {
    this.store.dispatch(new DeleteUser(i));
  }
}

