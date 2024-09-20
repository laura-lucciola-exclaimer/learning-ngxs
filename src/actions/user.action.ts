import { User } from "../types/user";

const ACTION_SCOPE = '[Users]';


export class GetUsers {
    static readonly type = `${ACTION_SCOPE} Fetch`;
}


export class AddUsers {
    static readonly type = `${ACTION_SCOPE} Add`;
    constructor(public payload: User) { }
}


export class UpdateUsers {
    static readonly type = `${ACTION_SCOPE} Update`;
    constructor(public payload: User, public id: number, public i:number) { }
}


export class DeleteUsers {
    static readonly type = `${ACTION_SCOPE} Delete`;
    constructor(public id: number) { }
}
