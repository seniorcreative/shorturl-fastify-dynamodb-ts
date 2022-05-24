import { Base } from "../";

export default class DateUtils extends Base {

    constructor() {
        super();
    }

    isValidDate(dateArg: Date) {
        let timeNow: number = new Date().getTime();
        let expiryTime = timeNow + 30 * DateUtils.SECONDS_IN_DAY;
        let dateArgSeconds = new Date(dateArg).getTime();
        return dateArgSeconds <= expiryTime && dateArgSeconds >= timeNow;
    }
}