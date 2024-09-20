import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { AddUser, DeleteUser, GetUsers, UpdateUser } from "../actions/user.action";
import { UserService } from "../services/user.service";
import { User } from "../types/user";

interface UserStateModel {
    users: User[];
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        users: []
    }
})

@Injectable()
export class UserState {
    constructor(private _us: UserService) { }

    @Selector()
    static getAllUsers(state: UserStateModel): User[] {
        return state.users;
    }

    @Action(GetUsers)
    getDataFromState(ctx: StateContext<UserStateModel>) {      
        return this._us.fetchUsers().pipe(tap((returnData: User[]) => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                users: returnData
            });
        }));
    }


    @Action(AddUser)
    addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddUser) {
        return this._us.addUsers(payload).pipe(tap((returnData:User) => {
            const state=ctx.getState();
            ctx.patchState({
                users:[...state.users, returnData]
            })
        }))
    }

    @Action(UpdateUser)
    updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id }: UpdateUser) {
        return this._us.updateUser(payload, id).pipe(tap((returnData:User) => {
            const state=ctx.getState();
            const index = state.users.findIndex(x => x.id === id);
            if (index >= 0) {
                
                const userList = [...state.users];
                userList[index]=payload;
    
                ctx.setState({
                    ...state,
                    users: userList,
                });
            } else{
                console.info(`There is no user with id: ${id}`);
            }          

        }))
    }

    @Action(DeleteUser)
    deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteUser) {
        return this._us.deleteUser(id).pipe(tap((returnData:any) => {
            const state=ctx.getState();            
            const filteredArray=state.users.filter(contents=>contents.id!==id);

            ctx.setState({
                ...state,
                users:filteredArray
            })
        }))
    }
}
