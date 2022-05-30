import ShortUrlDynamoDbRepository from '../adapter/ShortUrlDynamoDbRepository';
import { EXPIRY_TIME } from "../common/utils"

const putData = {
    "short_url_key": "3",
    "url_value": 'https://www.duckduckgo.com',
    "short_url": 'test123',
    "access_count": 0,
    "expiration_time": new Date().getTime() + EXPIRY_TIME
}

export default [
    { path: "/put", method: new ShortUrlDynamoDbRepository().createOrUpdate(putData), args: "http://www.google.com" }
];