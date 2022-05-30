import "dotenv/config";
import { fromEnv } from "@aws-sdk/credential-providers";
import { ScanCommand, ScanCommandInput, BatchGetItemCommand, BatchGetItemCommandInput, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { ShortUrl, ShortUrls } from "../model/shorturl";
import { isValidUrl, EXPIRY_TIME } from "../common/utils/";
import { ShortUrlRepository } from "../core/shortUrlRepository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


export default class ShortUrlDynamoDbRepository implements ShortUrlRepository {

    protected client = new DynamoDBClient({ region: "us-west-1", credentials: fromEnv() });

    async getAll(): Promise<ShortUrl[]> {
        const commandInput: BatchGetItemCommandInput = {
            "RequestItems": {
                "shorturl": {
                    "Keys": [
                        {
                            "short_url_key": { "S": "1" },
                        },
                        {
                            "short_url_key": { "S": "2" },
                        }
                    ],
                    "ProjectionExpression": "access_count, expiration_time, short_url, url_value"
                },
            }
        }
        const command = new BatchGetItemCommand(commandInput);
        try {
            const results = await this.client.send(command);
            const records: any = results.Responses;
            return records;
        } catch (err) {
            throw new Error(`Error ${err}`);
        }
    }

    async get(id: string): Promise<ShortUrl | any> {
        const commandInput: ScanCommandInput = {
            "TableName": "shorturl",
            "FilterExpression": "short_url = :short_url",
            ExpressionAttributeValues: {
                ":short_url": { S: id },
            },
            "ProjectionExpression": "access_count, expiration_time, short_url, url_value"
        }
        const command = new ScanCommand(commandInput);
        try {
            const result = await this.client.send(command);
            return result;
        } catch (err) {
            throw new Error(`Error ${err}`);
        }
    }

    async createOrUpdate(shortUrl: ShortUrl): Promise<void> {
        if (!isValidUrl(shortUrl.url_value)) throw new Error('not valid');

        const commandInput: PutItemCommandInput = {
            "TableName": "shorturl",
            "Item": {
                "short_url_key": { "S": "3" },
                "url_value": { "S": "" },
                "short_url": { "S": shortUrl.short_url },
                "access_count": { "N": "0" },
                "expiration_time": { "N": new Date().getTime() + EXPIRY_TIME.toString() }
            }
        }

        const command = new PutItemCommand(commandInput);

        try {
            const results = await this.client.send(command);
            const resp = JSON.stringify(results);
            return;
        } catch (err) {
            throw new Error(`Error ${err}`);
        }

    }

}