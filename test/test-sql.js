import expect from "expect.js";
import {sql} from "@zingle/sqlt";

describe("sql(string)", () => {
  it("should return tagged string", () => {
    const result = sql("foo");
    expect(String(result)).to.be("foo");
    expect(result).to.be.a(String);
    expect(result.sql).to.be(true);
  });

  it("should preserve already tagged string", () => {
    const tagged = sql("foo");
    expect(sql(tagged)).to.be(tagged);
  });
});

describe("sql`...`", () => {
  it("should return tagged string", () => {
    const result = sql`foo`;
    expect(String(result)).to.be("foo");
    expect(result).to.be.a(String);
    expect(result.sql).to.be(true);
  });

  it("should handle numbers", () => {
    expect(sql`${42}`.toString()).to.be("42");
  });

  it("should quote strings", () => {
    expect(sql`${"foo"}`.toString()).to.be("'foo'");
  });

  it("should evaluate and quote ISO dates", () => {
    const date = new Date();
    expect(sql`${date}`.toString()).to.be("'" + date.toISOString() + "'")
  });

  it("should map undefined, null, and bools to SQL keywords", () => {
    expect(sql`${undefined}`.toString()).to.be("null");
    expect(sql`${null}`.toString()).to.be("null");
    expect(sql`${true}`.toString()).to.be("true");
    expect(sql`${false}`.toString()).to.be("false");
  });

  it("should throw on non-finite number", () => {
    expect(() => sql`${Infinity}`).to.throwError();
  });

  it("should throw on other types of values", () => {
    expect(() => sql`${Symbol("foo")}`).to.throwError();
    expect(() => sql`${{foo:42}}`).to.throwError();
  });
});
