import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { AddUsers, DeleteUsers, GetUsers, UpdateUsers } from "../actions/app.action";
import { MockServerService } from "../services/mock-server.service";
import { User } from "../types/user";

export interface UserStateModel {
    users: User[];
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        users: []
    }
})

@Injectable()
export class AppState {
    constructor(private _mss: MockServerService) { }

    @Selector()
    static getAllUsers(state: UserStateModel): User[] {
        return state.users;
    }

    @Action(GetUsers)
    getDataFromState(ctx: StateContext<UserStateModel>) {
        console.log('get user');
        
       
        return this._mss.fetchUsers().pipe(tap(returnData => {
            const state = ctx.getState();
            console.log('Current state:', state); // Debugging line
            ctx.setState({
                ...state,
                users: returnData
            });
            console.log('Updated state:', ctx.getState()); // Debugging line
        }));
    }


    @Action(AddUsers)
    addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddUsers) {
        return this._mss.addUsers(payload).pipe(tap((returnData:any) => {
            const state=ctx.getState();
            ctx.patchState({
                users:[...state.users, returnData]
            })
        }))
    }

    @Action(UpdateUsers)
    updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id, i }: UpdateUsers) {
        return this._mss.updateUser(payload, i).pipe(tap((returnData:any) => {
            const state=ctx.getState();

            const userList = [...state.users];
            userList[i]=payload;

            ctx.setState({
                ...state,
                users: userList,
            });
        }))
    }

    @Action(DeleteUsers)
    deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteUsers) {
        return this._mss.deleteUser(id).pipe(tap((returnData:any) => {
            const state=ctx.getState();
            const filteredArray=state.users.filter(contents=>contents.id!==id);

            ctx.setState({
                ...state,
                users:filteredArray
            })
        }))
    }
}
