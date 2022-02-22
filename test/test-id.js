import expect from "expect.js";
import {id} from "@zingle/sqlt";

describe("id(string)", () => {
  it("should return tagged string", () => {
    expect(id("foo")).to.be.a(String);
    expect(id("foo").sql).to.be(true);
  });

  it("should escape and quote value", () => {
    expect(String(id("foo bar"))).to.be('"foo bar"');
  });
});
