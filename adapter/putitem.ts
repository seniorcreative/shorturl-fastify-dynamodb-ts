import { DataRepository } from "./datarepository";
import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import StringUtils from "../common/utils/string";
import DateUtils from "../common/utils/date";

export class PutItemData extends DataRepository {

    constructor() {
        super()
    }

    public async putData(url: string) {

        if (!new StringUtils().isValidUrl(url)) return new Error("Invalid URL supplied.");

        const commandInput: PutItemCommandInput = {
            "TableName": "shorturl",
            "Item": {
                "short_url_key": { "S": "3" },
                "url_value": { "S": url },
                "access_count": { "N": "0" },
                "expiration_time": { "N": new Date().getTime() + DateUtils.EXPIRY_TIME.toString() }
            }
        }

        const command = new PutItemCommand(commandInput);

        try {
            const results = await this.client.send(command);
            const resp = JSON.stringify(results);
            return resp;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

}