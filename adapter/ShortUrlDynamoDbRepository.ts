import { DataRepository } from "./datarepository";
import { ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";

export class GetItemData extends DataRepository {

    constructor() {
        super()
    }

    public async getData(short_url: any) {
        const commandInput: ScanCommandInput = {
            "TableName": "shorturl",
            "FilterExpression": "short_url = :short_url",
            ExpressionAttributeValues: {
                ":short_url": { S: short_url },
            },
            "ProjectionExpression": "access_count, expiration_time, short_url, url_value"
        }
        const command = new ScanCommand(commandInput);
        try {
            const results = await this.client.send(command);
            return { arg: short_url, records: results.Items };
        } catch (err) {
            console.error(err);
            return err;
        }
    }

}