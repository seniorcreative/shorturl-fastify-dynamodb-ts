import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import "dotenv/config";
import { fromEnv } from "@aws-sdk/credential-providers";

export abstract class DataRepository {

	constructor() {
		//
	}

	public client = new DynamoDBClient({ region: "us-west-1", credentials: fromEnv() });

}