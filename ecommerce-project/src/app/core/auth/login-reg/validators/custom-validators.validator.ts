import { FormControl } from "@angular/forms";

export class CustomValidators {
    static NameValidator(control: FormControl): { [key: string]: any } | null {
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return /\d/.test(control.value) ? { invalidName: "You can't include numbers" } : null;
    }
    static RoleValidator(control: FormControl,): { [key: string]: any } | null {
        const validRoles = ['admin', 'user'];
        return validRoles.includes(control.value) ? null : { invalidRole: "Invalid role" };
    }
}