import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import { User } from "src/app/admin/models/user.model";
import { UserService } from "src/app/admin/services/user.service";

export function createPasswordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if(confirmPassword?.errors && !confirmPassword?.errors['mismatch']) {
            return null;
        }
        
        if(password?.value !== confirmPassword?.value) {
            control.get('confirmPassword')?.setErrors({ mismatch: true });
            return { mismatch: true }
        }else {
            return null;
        }
    }
}

export function createCheckUserExistsValidator(user: User, userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        console.log("User => ", user);
        return userService.isUserAlreadyExists(control.value)
            .pipe(
                map((isUserExists: boolean) => isUserExists ? { userExists: true } : null)
            );
    }
}