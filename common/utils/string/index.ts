import { Base } from "../"

export default class StringUtils extends Base {
    constructor() {
        super();
    }

    isValidUrl(url: string) {
        let regex = /^(http|https):\/\/[^ "]+$/
        return url.match(regex)
    }
}