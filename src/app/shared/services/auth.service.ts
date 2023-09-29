import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { AuthResponse } from "../models/auth-response.model";
import { ErrorResponse } from "../models/error-response.model";
import { AuthRequest } from "../models/auth-request.model";
import { catchError, throwError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

    login(authRequest: AuthRequest) {
        return this.httpClient.post<AuthResponse>(
            `${environment.AUTH_API}/login`, authRequest
        ).pipe(
            catchError((errorResopnse: HttpErrorResponse) => {
                return throwError(() => {
                    const error: ErrorResponse = errorResopnse.error;
                    return error;
                })
            })
        )
    }

    // isAuthenticated(jwtSer): boolean {
        
    // }
}