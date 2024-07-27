import { createAction, props } from '@ngrx/store';
import { ILoginRequest } from '../../models/LoginRequest';
import { ISignUpRequest } from '../../models/SignUpRequest';
import { User } from '../../models/user';

export const autologin = createAction(
    '[Auth Effect] Auto Login User'
);

export const login = createAction(
    '[Login Card] Login User',
    props<{ req: ILoginRequest }>()
);

export const loginSuccess = createAction(
    '[Auth Effect] Login User Success',
    props<{ user: User }>()
);

export const loginFailure = createAction(
    '[Auth Effect] Login User Failure'
);

export const signUp = createAction(
    '[SignUp Card] SignUp User',
    props<{ req: ISignUpRequest }>()
);

export const signUpSuccess = createAction(
    '[Auth Effect] SignUp User Success'
);

export const signUpFailure = createAction(
    '[Auth Effect] SignUp User Failure',
    props<{ error: any }>()
);

export const logout = createAction(
    '[Auth Effect] Logout User'
);

export const autologout = createAction(
    '[Auth Effect] Auto Logout User',
    props<{ expirationTime: number }>()
);

export const refreshToken = createAction(
    '[Auth Effects] Refresh Token',
    props<{ refreshToken: string | undefined }>()
);

export const refreshTokenSuccess = createAction(
    '[Auth Effect] Refresh Token Success',
    props<{ user: User }>()
);