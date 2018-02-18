import * as dotenv from 'dotenv';

dotenv.config({
    path: process.env.ENVFILE || '.env'
});

let config = {
    AIRLY_API_KEY: process.env.AIRLY_API_KEY
};

export default config;
