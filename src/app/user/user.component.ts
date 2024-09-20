import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GetUsers, AddUsers, UpdateUsers, DeleteUsers } from '../../actions/app.action';
import { AppState } from '../../states/app.state';
import { CommonModule } from '@angular/common';
import { AppStateModule } from '../../states/app.state.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppStateModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  public userForm!: FormGroup;
  public users$ = this.store.select(AppState.getAllUsers);

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

    this.users$.subscribe(users => {
      console.log('Users:', users); // Debugging line
    });
  }


  addUser() {
    this.store.dispatch(new AddUsers(this.userForm.value));
    this.userForm.reset();
  }

  updateUser(id: number, i: number) {

    const newData = {
      id: id,
      name: "Hello World",
      username: "helloWorld2024",
      email: 'helloWorld2024@gmail.com',
      phone: '02138-280055',
      website: 'helloWorld.com'
    }

    this.store.dispatch(new UpdateUsers(newData, id, i));
  }

  deleteUser(i: number) {
    this.store.dispatch(new DeleteUsers(i));
  }
}

