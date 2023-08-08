import { RoleEnum } from "./role.enum";

export interface Role {
    id: number;
    roleName: RoleEnum;
    description: string;
    createdDate: string;
}