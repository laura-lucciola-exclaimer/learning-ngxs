import { User } from "../types/user";

const ACTION_SCOPE = '[Users]';


export class GetUsers {
    static readonly type = `${ACTION_SCOPE} Fetch`;
}


export class AddUser {
    static readonly type = `${ACTION_SCOPE} Add`;
    constructor(public payload: User) { }
}


export class UpdateUser {
    static readonly type = `${ACTION_SCOPE} Update`;
    constructor(public payload: User, public id: number) { }
}

export class DeleteUser {
    static readonly type = `${ACTION_SCOPE} Delete`;
    constructor(public id: number) { }
}
