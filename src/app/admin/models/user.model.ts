import { Gender } from "./gender.enum";
import { Role } from "./role.model";

export interface User {
    id: number;
    name: string;
    email: string;
    telephone: string;
    gender: Gender;
    createdDate: string; 
    roles: Role[];
}