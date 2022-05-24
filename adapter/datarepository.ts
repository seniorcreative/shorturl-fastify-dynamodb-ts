import { DynamoDBClient, BatchGetItemCommand, BatchGetItemCommandInput } from "@aws-sdk/client-dynamodb";
import "dotenv/config";
import { fromEnv } from "@aws-sdk/credential-providers";
import { records } from "../model/shorturl"

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