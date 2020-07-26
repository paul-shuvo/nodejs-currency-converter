# NodeJS Currency Converter

A simple currency converter based on [fixer.io](http://fixer.io).

## Getting started

### Installation
This package can be installed using npm

```
npm install nodejs-currency-converter
```

### Usage
Import `nodejs-currency-converter`.

```
const cc = require('nodejs-currency-converter')
```

Then instantiate with either the empty constructor
```
let currencyConverter = new cc()
```
Or, with a json object
```
let currencyConverter = new cc({from:"USD", to:"JPY", amount:100})
```
<!-- convertCurrency(1, 'USD', 'BRL').then(response => response);
``` -->
The convert method will return the conversion based on the last conversion rate and can be used as a promise.
```
currencyConverter.convert().then((response) => {
    console.log(response) //or do something else
})
```
`convert` can also take the amount as a parameter.
```
currencyConverter.convert(100).then((response) => {
    console.log(response) //or do something else
})
```
To find the rates use the `rates` method.
```
currencyConverter.rates().then((response) => {
    console.log(response) //or do something else
})
```
Chaining is also supported. 
```
currencyConverter.from("USD).to("GBP").amount(125).convert().then((response) => {
    console.log(response) //or do something else
})
```

## Issues
If any issues are found, they can be reported [here](https://github.com/paul-shuvo/nodejs-currency-converter/issues).

## License

This project is licensed under the [MIT](LICENSE) license.
