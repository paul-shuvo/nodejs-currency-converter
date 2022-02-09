<div align="center">
<h1>NodeJS Currency Converter</h1>

[![Build Status](https://travis-ci.com/paul-shuvo/nodejs-currency-converter.svg?branch=master)](https://travis-ci.com/paul-shuvo/nodejs-currency-converter) [![Known Vulnerabilities](https://snyk.io/test/github/paul-shuvo/nodejs-currency-converter/badge.svg?targetFile=package.json)](https://snyk.io/test/github/paul-shuvo/nodejs-currency-converter?targetFile=package.json)  ![supported node versions](https://img.shields.io/badge/node%20v-12.x%20%7C%2013.x%20%7C%2014.x%20%7C%2015.x%20%7C%2016.x%20%7C%2017.x-blue) [![codecov](https://codecov.io/gh/paul-shuvo/nodejs-currency-converter/branch/master/graph/badge.svg)](https://codecov.io/gh/paul-shuvo/nodejs-currency-converter)
 ![license: MIT](https://img.shields.io/npm/l/vue.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/b512e403dfc172ee3b0d/maintainability)](https://codeclimate.com/github/paul-shuvo/nodejs-currency-converter/maintainability) [![npm version](https://badge.fury.io/js/currency-converter-lt.svg)](https://badge.fury.io/js/currency-converter-lt) ![npm](https://img.shields.io/npm/dm/currency-converter-lt)
<p>A minimal currency converter library for NodeJS that works out of the box.</p>
</div>

__Announcement__ : For crypto currency conversion, check my other package [Nodejs Crypto Converter](https://github.com/paul-shuvo/nodejs-crypto-converter).

## Getting started

### Installation

This package can be installed using `npm`

```bash
npm install currency-converter-lt
```

or, `yarn`

```bash
yarn add currency-converter-lt
```

### Usage

Import `currency-converter-lt`.

```javascript
const CC = require('currency-converter-lt')
```

Then instantiate with either the empty constructor

```javascript
let currencyConverter = new CC()
```

Or, with a json object

```javascript
let currencyConverter = new CC({from:"USD", to:"JPY", amount:100})
```

#### <p style='color:magenta'>!!! Note: if you get incorrect conversion described in this [issue](https://github.com/paul-shuvo/nodejs-currency-converter/issues/20) then make sure you pass `isDecimalComma: true` to the constructor as following:</p>

```javascript
let currencyConverter = new CC({from:"USD", to:"JPY", amount:100, isDecimalComma:true})
```


The convert method will return the conversion based on the last conversion rate and can be used as a promise.

```javascript
currencyConverter.convert().then((response) => {
    console.log(response) //or do something else
})
```

`convert` can also take the amount as a parameter.

```javascript
currencyConverter.convert(100).then((response) => {
    console.log(response) //or do something else
})
```

To find the rates use the `rates` method.

```javascript
currencyConverter.rates().then((response) => {
    console.log(response) //or do something else
})
```

Chaining is also supported.

```javascript
currencyConverter.from("USD").to("GBP").amount(125).convert().then((response) => {
    console.log(response) //or do something else
})
```



## Issues

If any issues are found, they can be reported [here](https://github.com/paul-shuvo/nodejs-currency-converter/issues).

## License

This project is licensed under the [MIT](LICENSE) license.
