export interface User {
    token: string,
    refreshToken: string,
    expiresIn: Date,
    isAdmin: boolean
}