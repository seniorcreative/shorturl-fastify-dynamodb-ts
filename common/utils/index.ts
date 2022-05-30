// Constants
export const SECONDS_IN_DAY: number = 86400;
export const EXPIRY_TIME: number = SECONDS_IN_DAY * 30;

export function isValidDate(dateArg: Date) {
    let timeNow: number = new Date().getTime();
    let expiryTime = timeNow + 30 * SECONDS_IN_DAY;
    let dateArgMilliseconds = Date.now();
    return dateArgMilliseconds <= expiryTime && dateArgMilliseconds >= timeNow;
}

export function isValidUrl(url: string) {
    let regex = /^(http|https):\/\/[^ "]+$/
    return url.match(regex)
}
