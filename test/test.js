const chai = require("chai")
const assert = chai.assert
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised")
// const chaiJestMock = require('chai-jest-mocks')

chai.use(chaiAsPromised)
// chai.use(chaiJestMock)

const CC = require("../index.js")

let currencyConverter = new CC()

describe("currencyConverter", () =>  {
    describe("constructor", () =>  {
        it("should instantiate an object without parameters", () =>  {
            let CC_ = new CC()
            assert.equal(CC_.currencyFrom, "")
        })
    
        it("should instantiate an object with json object as a parameter", () =>  {
            let CC_ = new CC({from:"GBP", to:"CAD", amount: 100})
            assert.equal(CC_.currencyFrom, "GBP")
        })

        it("should instantiate an object with json object as a parameter with isDecimalComma", () =>  {
            let CC_ = new CC({from:"GBP", to:"CAD", amount: 100, isDecimalComma: true})
            assert.equal(CC_.currencyFrom, "GBP")
        })

        it("should instantiate an object with json object with partial parameters", () =>  {
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

        it("should throw a TypeError", () =>  {
            expect(() => new CC({from:20, amount: 100})).to.throw(TypeError)
        })
    })

    describe("currencyFrom", () =>  {
        it("should equal to USD", () =>  {
            currencyConverter.currencyFrom = "USD"
            assert.equal(currencyConverter.currencyFrom, "USD")
        })

        it("should equal to INR", () =>  {
            currencyConverter.from("INR")
            assert.equal(currencyConverter.currencyFrom, "INR")
        })

        it("should throw a TypeError", () =>  {
            expect(() => currencyConverter.from(5)).to.throw(TypeError);
        })

        it("should throw an Error", () =>  {
            expect(() => currencyConverter.from("UDD")).to.throw(Error);
        })

    })

    describe("currencyTo", () =>  {
        it("should equal to CAD", () =>  {
            currencyConverter.currencyTo = "CAD"
            assert.equal(currencyConverter.currencyTo, "CAD");
        })

        it("should equal to JPY", () =>  {
            currencyConverter.to("JPY")
            assert.equal(currencyConverter.currencyTo, "JPY");
        })

        it("should throw a TypeError", () =>  {
            expect(() => currencyConverter.to(5)).to.throw(TypeError);
        })

        it("should throw an Error", () =>  {
            expect(() => currencyConverter.to("UDD")).to.throw(Error);
        })
    })

    describe("currencyAmount", () =>  {
        it("should equal to 10", () =>  {
            currencyConverter.amount(10)
            assert.equal(currencyConverter.currencyAmount, 10);
        })

        it("should throw TypeError", () =>  {
            expect(() => currencyConverter.amount("10")).to.throw(TypeError);
        })

        it("should throw an Error", () =>  {
            expect(() => currencyConverter.amount(-1)).to.throw(Error);
        })
    })

    describe("setDecimalComma", () => {
        it("should be true", () => {
            currencyConverter.setDecimalComma(true)
            assert.equal(currencyConverter.isDecimalComma, true)
        })

        it("should throw TypeError", () =>  {
            expect(() => currencyConverter.isDecimalComma("10")).to.throw(TypeError);
        })
    })

    describe("replaceAll", () => {
        it("should replace all the , with empty space", () => {
            assert.equal(currencyConverter.replaceAll("123,456,789.50", ",", ""), "123456789.50")
        })

        it("should replace all the , with empty .", () => {
            assert.equal(currencyConverter.replaceAll("123456789,50", ",", "."), "123456789.50")
        })

        it("should replace all the . with empty space", () => {
            assert.equal(currencyConverter.replaceAll("123.456.789", ".", ""), "123456789")
        })
    })

    describe("rates", () =>  {
        it("should not return undefined values", () => {
            currencyConverter.from("USD").to("JPY")
            return expect(currencyConverter.rates()).to.eventually.not.equal(undefined)
        })

        it("should not return undefined values when isDecimalComma is true", () => {
            currencyConverter.from("USD").to("JPY").setDecimalComma(true)
            return expect(currencyConverter.rates()).to.eventually.not.equal(undefined)
        })
    })

    describe("convert", () =>  {
        it("should set the amount value if a paramter is passed", () => {
            currencyConverter.from("USD").to("USD")
            return expect(currencyConverter.convert(100)).to.eventually.equal(100)
        })

        it("should throw an Error", () =>  {
            currencyConverter.currencyFrom = ""
            currencyConverter.to("CAD").amount(100)
            expect(() => currencyConverter.convert()).to.throw(Error)
        })

        it("should throw an Error", () =>  {
            currencyConverter.currencyTo = ""
            currencyConverter.from("CAD").amount(100)
            expect(() => currencyConverter.convert()).to.throw(Error)
        })

        it("should throw an Error", () =>  {
            currencyConverter.currencyAmount = 0
            currencyConverter.from("USD").to("CAD")
            expect(() => currencyConverter.convert()).to.throw(Error)
        })
    })

    describe("currencyName", () =>  {
        it("should return name of the currency from the currency code", () =>  {
            assert.equal(currencyConverter.currencyName("CHF"), "Swiss Franc")
        })

        it("should throw a TypeError", () =>  {
            expect(() => currencyConverter.currencyName(5)).to.throw(TypeError);
        })

        it("should throw an Error", () =>  {
            expect(() => currencyConverter.currencyName("DDD")).to.throw(Error);
        })
    })
})

// console.log(cf)


// console.log(c.currencies)