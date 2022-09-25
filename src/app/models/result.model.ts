import { Contact } from './contact.model';
import { User } from './user.model';
export class Result {
    public list: any[];
    public count: number;
    public user!: User;
    public accessToken!: string;
    public refreshToken!:string;
    public expiresAt!:string;
    
    constructor(list: any[], count: number, user:User) {
        this.list = list;
        this.count = count;
        this.user = user;
    }
}