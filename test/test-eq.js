import expect from "expect.js";
import {eq} from "@zingle/sqlt";

describe("eq(value)", () => {
  it("should return 'is ...' when appropriate", () => {
    expect(eq(null).toString()).to.be("is null");
    expect(eq(true).toString()).to.be("is true");
    expect(eq(false).toString()).to.be("is false");
  });

  it("should return '= ...' when appropriate", () => {
    expect(eq(42).toString()).to.be("= 42");
    expect(eq("foo").toString()).to.be("= 'foo'");
  });
});
