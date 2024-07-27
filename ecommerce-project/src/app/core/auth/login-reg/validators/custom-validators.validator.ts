import { FormControl } from "@angular/forms";

export class CustomValidators {
    static NameValidator(control: FormControl): { [key: string]: any } | null {
        return /\d/.test(control.value) ? { invalidName: "You can't include numbers" } : null;
    }
    static RoleValidator(control: FormControl,): { [key: string]: any } | null {
        const validRoles = ['admin', 'user'];
        return validRoles.includes(control.value.toLowerCase()) ? null : { invalidRole: "Invalid role" };
    }
}