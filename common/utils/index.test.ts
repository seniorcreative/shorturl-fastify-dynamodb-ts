import { isValidUrl, isValidDate } from "./";

describe('Is the url valid', () => {
    test("testing http invalidity", () => {
        expect(isValidUrl("htttp:/wrong")).toBeFalsy();
    });

    test("testing http validity", () => {
        expect(isValidUrl("http://right.com")).toBeTruthy();
    });

    test("testing https validity", () => {
        expect(isValidUrl("https://right.com")).toBeTruthy();
    });
});

describe('Is the expiry date valid', () => {
    test("testing date invalidity", () => {
        expect(isValidDate(new Date("14 June 2020"))).toBeFalsy();
    });

    test("testing date validity", () => {
        let now = new Date();
        expect(isValidDate(new Date(now.getTime() + (86400 * 30)))).toBeTruthy();
    });
});
