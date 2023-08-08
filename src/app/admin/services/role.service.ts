import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Role } from "../models/role.model";

@Injectable({ 
    providedIn: 'root' 
})
export class RoleSerivce {

    BASE_URL: string = environment.ADMIN_API + "/role";

    constructor(private _http: HttpClient) {}

    public getAllRoles() {
        return this._http.get<Role[]>(`${this.BASE_URL}/all`);
    }

}