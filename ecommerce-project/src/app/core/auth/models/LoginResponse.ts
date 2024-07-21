export interface ILoginResponse {
    Login: {
        AccessToken: string,
        ExpiresIn: number,
        RefreshExpiresIn: number,
        RefreshToken: string,
        TokenType: string,
        SessionState: string,
    }
}