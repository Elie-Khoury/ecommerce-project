import { createReducer, on } from "@ngrx/store"
import * as AuthActions from '../actions/auth.actions'
import { User } from "../../models/user"



export interface AuthState {
    user: User | null
}

export const initialAuthState: AuthState = { user: null }

export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        };
    }),
    on(AuthActions.logout, (state) => {
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.refreshTokenSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    })
)