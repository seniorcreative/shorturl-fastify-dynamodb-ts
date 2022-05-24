import DateUtils from "./";

test("testing date invalidity", () => {
    expect(new DateUtils().isValidDate(new Date("14 June 2020"))).toBeFalsy();
});

test("testing date validity", () => {
    let now = new Date();
    expect(new DateUtils().isValidDate(new Date(now.getTime() + (86400 * 30)))).toBeTruthy();
});

