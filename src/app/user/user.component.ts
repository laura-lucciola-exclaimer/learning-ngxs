import { Component, OnInit, signal } from '@angular/core';
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
  public addMode = signal(true);
  public userId = signal(0);

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

  public getTitle(): string{
    return this.addMode() ? 'Add new user' : 'Update user';
  }

  public setUpdateUserState(id: number) {
    this.addMode.set(false);
    
    this.users$.subscribe(users => {
      const user =  users.find(x => x.id === id);
      
      if (user) {
        this.userId.set(id);
        this.userForm.setValue(user);   
    } else{
        console.info(`There is no user with id: ${id}`);
    } 
  })    
  }

  public deleteUser(i: number) {
    this.store.dispatch(new DeleteUser(i));
  }

  public submitForm(){
    this.addMode() ? this.addUser() : this.updateUser();
 }

 private addUser() {
   this.store.dispatch(new AddUser(this.userForm.value));
   this.userForm.reset();
 }
 private updateUser() {
   this.store.dispatch(new UpdateUser(this.userForm.value, this.userId()))
   .subscribe( _ => {
     this.addMode.set(true);
     this.userForm.reset();    
   });
 }

}

