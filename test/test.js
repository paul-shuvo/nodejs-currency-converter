const assert = require('chai').assert
const expect = require('chai').expect
const cc = require('../index.js')

let currencyConverter = new cc()

describe('currencyConverter', function () {
    describe('currencyFrom', function () {
        it('should equal to USD', function () {
            currencyConverter.currencyFrom = 'USD'
            assert.equal(currencyConverter.currencyFrom, 'USD')
        })

        it('should equal to INR', function () {
            currencyConverter.from('INR')
            assert.equal(currencyConverter.currencyFrom, 'INR')
        })

        it('should throw TypeError', function () {
            expect(() => currencyConverter.from(5)).to.throw(TypeError);
        })

        it('should throw an Error', function () {
            expect(() => currencyConverter.from('UDD')).to.throw(Error);
        })

    })

    describe('currencyTo', function () {
        it('should equal to BDT', function () {
            currencyConverter.currencyTo = 'BDT'
            assert.equal(currencyConverter.currencyTo, 'BDT');
        })

        it('should equal to JPY', function () {
            currencyConverter.to('JPY')
            assert.equal(currencyConverter.currencyTo, 'JPY');
        })

        it('should throw TypeError', function () {
            expect(() => currencyConverter.to(5)).to.throw(TypeError);
        })
    })

    describe('currencyAmount', function () {
        it('should equal to 10', function () {
            currencyConverter.amount(10)
            assert.equal(currencyConverter.currencyAmount, 10);
        })

        it('should throw TypeError', function () {
            expect(() => currencyConverter.amount('10')).to.throw(TypeError);
        })

        it('should throw an Error', function () {
            expect(() => currencyConverter.amount(-1)).to.throw(Error);
        })
    })

    describe('convert', function () {
        it('should throw an Error', function () {
            currencyConverter.currencyFrom = ""
            expect(() => currencyConverter.convert()).to.throw(ReferenceError)
        })

        it('should throw an Error', function () {
            currencyConverter.currencyTo = ""
            expect(() => currencyConverter.convert()).to.throw(ReferenceError)
        })

        it('should throw an Error', function () {
            currencyConverter.currencyAmount = 0
            expect(() => currencyConverter.convert()).to.throw(ReferenceError)
        })
    })
})

// console.log(cf)


// console.log(c.currencies)