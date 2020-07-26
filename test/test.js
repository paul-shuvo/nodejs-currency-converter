const chai = require("chai")
const assert = chai.assert
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const cc = require("../index.js")

let currencyConverter = new cc()

describe("currencyConverter", function () {
    describe("constructor", function () {
        it("should instantiate an object without parameters", function () {
            let cc_ = new cc()
            assert.equal(cc_.currencyFrom, "")
        })
    
        it("should instantiate an object with json object as a parameter", function () {
            let cc_ = new cc({from:"GBP", to:"CAD", amount: 100})
            assert.equal(cc_.currencyFrom, "GBP")
        })

        it("should instantiate an object with json object with partial parameters", function () {
            let cc_ = new cc({from:"GBP", amount: 100})
            assert.equal(cc_.currencyFrom, "GBP")
            assert.equal(cc_.currencyTo, "")
        })

        it("should throw a TypeError", function () {
            expect(() => new cc({from:20, amount: 100})).to.throw(TypeError)
        })
    })

    describe("currencyFrom", function () {
        it("should equal to USD", function () {
            currencyConverter.currencyFrom = "USD"
            assert.equal(currencyConverter.currencyFrom, "USD")
        })

        it("should equal to INR", function () {
            currencyConverter.from("INR")
            assert.equal(currencyConverter.currencyFrom, "INR")
        })

        it("should throw a TypeError", function () {
            expect(() => currencyConverter.from(5)).to.throw(TypeError);
        })

        it("should throw an Error", function () {
            expect(() => currencyConverter.from("UDD")).to.throw(Error);
        })

    })

    describe("currencyTo", function () {
        it("should equal to BDT", function () {
            currencyConverter.currencyTo = "BDT"
            assert.equal(currencyConverter.currencyTo, "BDT");
        })

        it("should equal to JPY", function () {
            currencyConverter.to("JPY")
            assert.equal(currencyConverter.currencyTo, "JPY");
        })

        it("should throw TypeError", function () {
            expect(() => currencyConverter.to(5)).to.throw(TypeError);
        })
    })

    describe("currencyAmount", function () {
        it("should equal to 10", function () {
            currencyConverter.amount(10)
            assert.equal(currencyConverter.currencyAmount, 10);
        })

        it("should throw TypeError", function () {
            expect(() => currencyConverter.amount("10")).to.throw(TypeError);
        })

        it("should throw an Error", function () {
            expect(() => currencyConverter.amount(-1)).to.throw(Error);
        })
    })

    describe("rates", function () {
        currencyConverter.from("USD").to("JPY")
        return expect(currencyConverter.rates()).to.eventually.not.equal(undefined)
    })

    describe("convert", function () {
        it("should throw an Error", function () {
            currencyConverter.currencyFrom = ""
            expect(() => currencyConverter.convert()).to.throw(ReferenceError)
        })

        it("should throw an Error", function () {
            currencyConverter.currencyTo = ""
            expect(() => currencyConverter.convert()).to.throw(ReferenceError)
        })

        it("should throw an Error", function () {
            currencyConverter.currencyAmount = 0
            expect(() => currencyConverter.convert()).to.throw(ReferenceError)
        })
    })
})

// console.log(cf)


// console.log(c.currencies)