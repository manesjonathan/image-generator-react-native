export interface SignInData {
    idToken: string;
    scopes: string[];
    serverAuthCode: null;
    user: {
        email: string;
        familyName: string;
        givenName: string;
        id: string;
        name: string;
        photo: string;
    };
}
