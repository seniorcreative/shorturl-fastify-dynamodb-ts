import StringUtils from "./";

test("testing http invalidity", () => {
    expect(new StringUtils().isValidUrl("htttp:/wrong")).toBeFalsy();
});

test("testing http validity", () => {
    expect(new StringUtils().isValidUrl("http://right.com")).toBeTruthy();
});

test("testing https validity", () => {
    expect(new StringUtils().isValidUrl("https://right.com")).toBeTruthy();
});