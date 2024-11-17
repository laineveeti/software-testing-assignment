import upperFirst from "../src/upperFirst.js";
import add from "../src/add.js";
import ceil from "../src/ceil.js";
import eq from "../src/eq.js";
import defaultTo from "../src/defaultTo.js";

import { expect, assert } from 'chai';
import sinon from 'sinon';


describe("Test suite for upperFirst.js", function() {

      it("Test with lower case string", () => {
        expect(upperFirst("test")).to.be.equal("Test");
      });

      it("Test with upper case string", () => {
        expect(upperFirst("TEST")).to.be.equal("TEST");
      });

      it("Test two words without unicode characters", () => {
        expect(upperFirst("hello world")).to.be.equal("Hello world");
      });

      it("Test two words with unicode characters", () => {
        expect(upperFirst("äivää maailma")).to.be.equal("Äivää maailma");
      });

      it("Test with null", () => {
        expect(upperFirst(null)).to.be.equal("");
      });

      it("Test with undefined", () => {
        expect(upperFirst(undefined)).to.be.equal("");
      });

      it("Test with empty", () => {
        expect(upperFirst("")).to.be.equal("");
      });

      it("Test with int", () => {
        expect(upperFirst(1)).to.be.equal("");
      }); // bug?
    
    });

describe("Test suite for add.js", function() {

      it("Test two positive integers", () => {
        expect(add(1, 2)).to.be.equal(3);
      });

      it("Test two undefined, should return default value 0", () => {
        expect(add(undefined, undefined)).to.be.equal(0);
      });

      it("Test with first param undefined, should return the second param", () => {
        expect(add(undefined, 5)).to.be.equal(5);
      });

      it("Test with second param undefined, should return the first param", () => {
        expect(add(10, undefined)).to.be.equal(10);
      });

      it("Test with first param string second int", () => {
        expect(add("1", 2)).to.be.equal(3); // bug?
      });

      it("Test with first param int second string", () => {
        expect(add(5, "1")).to.be.equal(6); // bug?
      });

      it("Test with both params string", () => {
        expect(add("7", "1")).to.be.equal(8); // bug?
      });

      it("Test with arrays of int", () => {
        expect(add([5], [7])).to.be.equal(12);
      });

      it("Test with arrays of string", () => {
        expect(add(["5"], ["7"])).to.be.equal(12);
      });

      it("Test with arrays of int and string", () => {
        expect(add(["5"], [7])).to.be.equal(12);
      });

      it("Test with nested arrays of int", () => {
        expect(add([[5]], [7])).to.be.equal(12);
      });

      it("Test negative numbers", () => {
        expect(add(-5, -10)).to.be.equal(-15);
      });

      it("Test positive numbers that have plus sign", () => {
        expect(add(+5, +10)).to.be.equal(15);
      });

      it("Test with zero, should return negative zero", () => {
        expect(add(0, undefined)).to.be.equal(-0);
      });

      it("Test with doubles", () => {
        expect(add(5.5, 12.4)).to.be.equal(17.9);
      });

      it("Test symbol, shoul return NaN", () => {
        assert.isNaN(add(5, Symbol()));
      });

      it("Test object with val, shoul return NaN", () => {
        assert.isNaN(add(5, {val: 5}));
      });

      it("Test object with undefined, shoul return NaN", () => {
        assert.isNaN(add(5, {val: undefined}));
      });
      
    
    });

describe("Test suite for ceil.js", function() {

      it("Test ceil without additional param default round to 0 decimals", () => {
        expect(ceil(12.132131234)).to.be.equal(13);
      });

      it("Test ceil with negative value and without additional param default round to 0 decimals", () => {
        expect(ceil(-12.132131234)).to.be.equal(-12);
      });

      it("Test ceil with additional param", () => {
        expect(ceil(12.132131234, 4)).to.be.equal(12.1322);
      });

      it("Test ceil with negative value and additional param", () => {
        expect(ceil(-12.132131234, 4)).to.be.equal(-12.1321);
      });

      it("Test ceil with additional param that is negative", () => {
        expect(ceil(12.132131234, -1)).to.be.equal(20);
      });

      it("Test ceil with additional param that is negative", () => {
        expect(ceil(12.132131234, -3)).to.be.equal(1000);
      });

      it("Test ceil with additional larger than 292", () => {
        expect(ceil(12.132131234, 293)).to.be.equal(12.132131234);
      });

      it("Test ceil with additional param smaller than -292", () => {
        expect(ceil(12.132131234, -350)).to.be.equal(1e+292);
      });

      it("Test ceil with a string and no additional param", () => {
        expect(ceil("12.12")).to.be.equal(13);
      });

      it("Test ceil with a string and with additional param", () => {
        expect(ceil("12.12321212", "2")).to.be.equal(12.13);
      });
      
    
    });

describe("Test suite for eq.js", function() {
      const val1 = {"val": 1}
      const val2 = {"val": 2}

      const val3 = Symbol("val3")
      const val4 = Symbol("val4")

      it("Test eq with equal objects", () => {
        expect(eq(val1, val1)).to.be.true;
      });

      it("Test eq with different objects", () => {
        expect(eq(val1, val2)).to.be.false;
      });

      it("Test eq with equal symbols", () => {
        expect(eq(val3, val3)).to.be.true;
      });

      it("Test eq with different symbols", () => {
        expect(eq(val3, val4)).to.be.false;
      });

      it("Test eq with true", () => {
        expect(eq(true, true)).to.be.true;
      });

      it("Test eq with false", () => {
        expect(eq(false, false)).to.be.true;
      });

      it("Test eq with true and false", () => {
        expect(eq(true, false)).to.be.false;
      });

      it("Test eq with equal strings", () => {
        expect(eq("hello", "hello")).to.be.true;
      });

      it("Test eq with different strings", () => {
        expect(eq("hello", "world")).to.be.false;
      });

      it("Test eq with undefined", () => {
        expect(eq(undefined, undefined)).to.be.true;
      });

      it("Test eq with null", () => {
        expect(eq(null, null)).to.be.true;
      });

      it("Test eq with null and undefined", () => {
        expect(eq(null, undefined)).to.be.true;
      });

      it("Test eq with null and undefined", () => {
        expect(eq(undefined, null)).to.be.true;
      });

      it("Test eq with int and string", () => {
        expect(eq(5, "5")).to.be.true;
      });

      it("Test eq with negative and positive zero, should return false", () => {
        expect(eq(+0, -0)).to.be.true;
      });

      it("Test eq with negative and positive zero, should return false", () => {
        expect(eq(-0, +0)).to.be.true; 
      });

      it("Test eq both NaNs", () => {
        expect(eq(NaN, NaN)).to.be.true;
      });

      it("Test eq with ints", () => {
        expect(eq(-5, -5)).to.be.true;
      });

      
    
    });

describe("Test suite for defaultTo.js", function() {

      it("Test defaultTo with valid input", () => {
        expect(defaultTo(-5, -10)).to.be.equal(-5);
      });

      it("Test defaultTo with valid input", () => {
        expect(defaultTo(0, -10)).to.be.equal(0);
      });
      
      it("Test defaultTo with null", () => {
        expect(defaultTo(null, -10)).to.be.equal(-10);
      });  

      it("Test defaultTo with undefined", () => {
        expect(defaultTo(undefined, -10)).to.be.equal(-10);
      });  

      it("Test defaultTo with NaN", () => {
        expect(defaultTo(NaN, -10)).to.be.equal(-10);
      });  

    });