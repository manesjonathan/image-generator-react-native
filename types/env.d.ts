declare module '@env' {
    import * as process from "process";

    export const API_URL: string = process.env.API_URL;
    export const WEB_CLIENT_ID: string = process.env.WEB_CLIENT_ID;
    export const ANDROID_CLIENT_ID: string = process.env.ANDROID_CLIENT_ID;
    export const IOS_CLIENT_ID: string = process.env.IOS_CLIENT_ID;
    export const STRIPE_PK_TEST: string = process.env.STRIPE_PK_TEST;
}
