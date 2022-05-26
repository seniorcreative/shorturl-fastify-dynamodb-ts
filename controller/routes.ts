import { GetItemsData } from '../adapter/getitems';
import { PutItemData } from '../adapter/putitem';

export default [
    { path: "/list", method: new GetItemsData().getData },
    { path: "/put", method: new PutItemData().putData, args: "http://www.google.com" }
];