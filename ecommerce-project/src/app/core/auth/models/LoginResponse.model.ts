export interface ILoginResponse {
    Login: {
        AccessToken: string,
        RefreshToken: string,
        TokenType: string,
    }
}