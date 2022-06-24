import { UserRoleE } from "./enum/userRoleE.enum";

export class User{
    id:number
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    username:string
    userRole:UserRoleE;
    
}