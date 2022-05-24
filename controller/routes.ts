import { getItems, putItem } from '../adapter/datarepository';

export default [
    {path: "/list", method: getItems },
    {path: "/put", method: putItem, args: "http://www.google.com" }
];