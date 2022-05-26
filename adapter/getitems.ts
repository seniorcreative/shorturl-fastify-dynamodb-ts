import { DataRepository } from "./datarepository";
import { BatchGetItemCommand, BatchGetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { records } from "../model/shorturl";

export class GetItemsData extends DataRepository {

    constructor() {
        super()
    }

    public async getData() {
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
            const records: records | undefined = results.Responses;
            return records?.shorturl;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

}