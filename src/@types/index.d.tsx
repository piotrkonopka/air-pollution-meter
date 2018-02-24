declare interface EnvJSON {
    AIRLY_API_KEY: string
}

declare module '*.env.json' { 
    const json: EnvJSON;
    export = json;
}