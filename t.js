const CC = require("./index.js")
let currencyConverter = new CC();

currencyConverter
.from("USD")
.to("EUR")
.amount(125)
.convert()
.then((response) =>
console.log(response))