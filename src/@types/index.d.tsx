declare interface EnvJSON {
    AIRLY_API_KEY: string,
    GOOGLE_MAPS_API_KEY: string,
}

declare module '*.env.json' { 
    const json: EnvJSON;
    export = json;
}