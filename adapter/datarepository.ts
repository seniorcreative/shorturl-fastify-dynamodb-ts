import { DynamoDBClient, BatchGetItemCommand, BatchGetItemCommandInput, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import "dotenv/config";
import { fromEnv } from "@aws-sdk/credential-providers";
import { records, recordType } from "../model/shorturl";
import StringUtils from "../common/utils/string";

export async function getItems() {
  const client = new DynamoDBClient({ region: "us-west-1", credentials: fromEnv() });
  const commandInput: BatchGetItemCommandInput = {
    "RequestItems": {
            "shorturl": {
                "Keys": [
                    {
                        "short_url_key":{"S":"1"},
                    },
                    {
                        "short_url_key":{"S":"2"},
                    }
                ],
                "ProjectionExpression":"access_count, expiration_time, short_url, url_value"
            },
        }
    }
  const command = new BatchGetItemCommand(commandInput);
  try {
    const results = await client.send(command);
    const records: records|undefined = results.Responses;
    return records?.shorturl;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function putItem( url: string ) {

	if (!new StringUtils().isValidUrl(url)) return new Error("Invalid URL supplied.");
  
	const client = new DynamoDBClient({ region: "us-west-1", credentials: fromEnv() });

	const commandInput: PutItemCommandInput = {
    	"TableName": "shorturl",
		"Item": {
			"short_url_key": {"S": "3"},
			"url_value": {"S": url},
			"access_count": {"N": "0"},
			"expiration_time": {"N": new Date().getTime() + (86400 * 30).toString()}
		}
    }

	const command = new PutItemCommand(commandInput);
  
	try {
		const results = await client.send(command);
		const resp = JSON.stringify(results);
		return resp;
	} catch (err) {
		console.error(err);
		return err;
	}
}