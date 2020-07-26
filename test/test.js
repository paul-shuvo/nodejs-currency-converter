const chai = require("chai")
const assert = chai.assert
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const CC = require("../index.js")

let currencyConverter = new CC()

describe("currencyConverter", function () {
    describe("constructor", function () {
        it("should instantiate an object without parameters", function () {
            let CC_ = new CC()
            assert.equal(CC_.currencyFrom, "")
        })
    
        it("should instantiate an object with json object as a parameter", function () {
            let CC_ = new CC({from:"GBP", to:"CAD", amount: 100})
            assert.equal(CC_.currencyFrom, "GBP")
        })

        it("should instantiate an object with json object with partial parameters", function () {
            let CC_ = new CC({from:"GBP", amount: 100})
            assert.equal(CC_.currencyFrom, "GBP")
            assert.equal(CC_.currencyTo, "")

            CC_ = new CC({to:"GBP", amount: 100})
            assert.equal(CC_.currencyTo, "GBP")
            assert.equal(CC_.currencyFrom, "")

            CC_ = new CC({from:"GBP", to: "USD"})
            assert.equal(CC_.currencyFrom, "GBP")
            assert.equal(CC_.currencyAmount, 1)
        })

        it("should throw a TypeError", function () {
            expect(() => new CC({from:20, amount: 100})).to.throw(TypeError)
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
        it("should equal to CAD", function () {
            currencyConverter.currencyTo = "CAD"
            assert.equal(currencyConverter.currencyTo, "CAD");
        })

        it("should equal to JPY", function () {
            currencyConverter.to("JPY")
            assert.equal(currencyConverter.currencyTo, "JPY");
        })

        it("should throw a TypeError", function () {
            expect(() => currencyConverter.to(5)).to.throw(TypeError);
        })

        it("should throw an Error", function () {
            expect(() => currencyConverter.to("UDD")).to.throw(Error);
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
        it("should set the amount value if a paramter is passed", function(){
            currencyConverter.from("USD").to("USD")
            return expect(currencyConverter.convert(100)).to.eventually.equal(100)
        })

        it("should throw an Error", function () {
            currencyConverter.currencyFrom = ""
            currencyConverter.to("CAD").amount(100)
            expect(() => currencyConverter.convert()).to.throw(Error)
        })

        it("should throw an Error", function () {
            currencyConverter.currencyTo = ""
            currencyConverter.from("CAD").amount(100)
            expect(() => currencyConverter.convert()).to.throw(Error)
        })

        it("should throw an Error", function () {
            currencyConverter.currencyAmount = 0
            currencyConverter.from("USD").to("CAD")
            expect(() => currencyConverter.convert()).to.throw(Error)
        })
    })

    describe("currencyName", function () {
        it("should return name of the currency from the currency code", function () {
            assert.equal(currencyConverter.currencyName("CHF"), "Swiss Franc")
        })

        it("should throw a TypeError", function () {
            expect(() => currencyConverter.currencyName(5)).to.throw(TypeError);
        })

        it("should throw an Error", function () {
            expect(() => currencyConverter.currencyName("DDD")).to.throw(Error);
        })
    })
})

// console.log(cf)


// console.log(c.currencies)