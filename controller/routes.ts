import { GetItemsData } from '../adapter/getitems';
import { PutItemData } from '../adapter/putitem';

export default [
    // TODO: Get rid of this
    { path: "/list", method: new GetItemsData().getData },
    // TODO: Move this into a new location, and write a test to check that the put class -> command receives the correct arguments
    { path: "/put", method: new PutItemData().putData, args: "http://www.google.com" }
];