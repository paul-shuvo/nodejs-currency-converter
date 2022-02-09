const cheerio = require("cheerio")
const got = require("got")

// FIXME: round upto 2 decimal places
// TODO: Add doc for other functions
class CurrencyConverter {
    currencies = {
        "AFN": "Afghan Afghani",
        "ALL": "Albanian Lek",
        "DZD": "Algerian Dinar",
        "AOA": "Angolan Kwanza",
        "ARS": "Argentine Peso",
        "AMD": "Armenian Dram",
        "AWG": "Aruban Florin",
        "AUD": "Australian Dollar",
        "AZN": "Azerbaijani M anat",
        "BSD": "Bahamian Dollar",
        "BHD": "Bahraini Dinar",
        "BBD": "Bajan Dollar",
        "BDT": "Bangladeshi Taka",
        "BYR": "Belarusian Ruble",
        "BZD": "Belize Dollar",
        "BMD": "Bermudan Dollar",
        "BTN": "Bhutan currency",
        "BOB": "Bolivian Boliviano",
        "BAM": "Bosnia-Herzegovina Convertible Mark",
        "BWP": "Botswanan Pula", "BRL": "Brazilian Real",
        "BND": "Brunei Dollar",
        "BGN": "Bulgarian Lev",
        "BIF": "Burundian Fra nc",
        "XPF": "CFP Franc",
        "KHR": "Cambodian riel",
        "CAD": "Canadian Dollar",
        "CVE": "Cape Verdean Escudo",
        "KYD": "Cayman Islands Dollar",
        "FCFA": "Central African CFA Franc",
        "CLP": "Chilean Peso",
        "CLF": "Chilean Unit of Account (UF)",
        "CNY": "Chinese Yuan",
        "CNY": "Chinese Yuan (offshore)",
        "COP": "Colombian Peso",
        "CF": "Comorian Franc",
        "CDF": "Congolese Franc",
        "CRC": "Costa Rican Colón",
        "HRK": "Croatian Kuna",
        "CUC": "Cuban Peso",
        "CZK": "Czech Koruna",
        "DKK": "Danish Krone",
        "DJF": "Djiboutian Franc",
        "DOP": "Dominican Pe so",
        "XCD": "East Caribbean Dollar",
        "EGP": "Egyptian Pound",
        "ETB": "Ethiopian Birr",
        "FJD": "Fijian Dollar",
        "GMD": "Gambian dalasi",
        "GEL": "Georgian Lari",
        "GHS": "Ghanaian Cedi",
        "GTQ": "Guatemalan Quetzal",
        "GNF": "Guinean Franc",
        "GYD": "Guyanaese Dollar",
        "HTG": "Haitian Gourde",
        "HNL": "Honduran Lempira",
        "HKD": "Hong Kong Dollar",
        "HUF": "Hungarian Forint",
        "ISK": "Icelandic Króna",
        "INR": "Indian Rupee",
        "IDR": "Indonesian Rupiah",
        "IRR": "Iranian Rial",
        "IQD": "Iraqi Dinar",
        "ILS": "Israeli New Shekel",
        "JMD": "Jamaican Dollar",
        "JPY": "Japanese Yen",
        "JOD": "Jordanian Dinar",
        "KZT": "Kazakhstani Tenge",
        "KES": "Kenyan Shilling",
        "KWD": "Kuwaiti Dinar",
        "KGS": "Kyrgystani Som",
        "LAK": "Laotian Kip",
        "LBP": "Lebanese pound",
        "LSL": "Lesotho Loti",
        "LRD": "Liberian Dollar",
        "LYD": "Libyan Dinar",
        "MOP": "Macanese Pataca",
        "MKD": "Macedonian Denar",
        "MGA": "Malagasy Ariary",
        "MWK": "Malawian Kwacha",
        "MYR": "Malaysian Ringgit",
        "MVR": "Maldivian Rufiyaa",
        "MRO": "Mauritanian Ouguiya",
        "MUR": "Mauritian Rupee",
        "MXN": "Mexican Peso",
        "MDL": "Moldovan Leu",
        "MAD": "Moroccan Dirham",
        "MZN": "Mozambican metical",
        "MMK": "Myanmar Kyat",
        "NAD": "Namibian dol lar",
        "NPR": "Nepalese Rupee",
        "ANG": "Netherlands Antillean Guilder",
        "NZD": "New Zealand Dollar",
        "NIO": "Nicaraguan Córdoba",
        "NGN": "Nigerian Naira",
        "NOK": "Norwegian Krone",
        "OMR": "Omani Rial",
        "PKR": "Pakistani Rupee",
        "PAB": "Panamanian Balboa",
        "PGK": "Papua New Guinean Kina",
        "PYG": "Paraguayan Guarani",
        "PHP": "Philippine peso",
        "PLN": "Poland Złoty",
        "GBP": "Pound sterling",
        "QAR": "Qatari Rial",
        "RON": "Romania n Leu",
        "RUB": "Russian Ruble",
        "RWF": "Rwandan franc",
        "SVC": "Salvadoran Colón",
        "SAR": "Saudi Riyal",
        "RSD": "Serbian Dinar",
        "SCR": "Seychellois Rupee",
        "SLL": "Sierra Leonean Leone",
        "SGD": "Singapore Dollar",
        "SBD": "Solomon Islands Dollar",
        "SOS": "Somali Shilling",
        "ZAR": "South African Rand",
        "KRW": "South Korean won",
        "VES": "Sovereign Bolivar",
        "LKR": "Sri Lankan Rupee",
        "SDG": "Sudanese pound",
        "SRD": "Surinamese Dollar",
        "SZL": "Swazi Lilangeni",
        "SEK": "Swedish Krona",
        "CHF": "Swiss Franc",
        "TJS": "Tajikistani Somoni",
        "TZS": "Tanzanian Shilling",
        "THB": "Thai Baht",
        "TOP": "Tongan Pa\"anga",
        "TTD": "Trinidad and Tobago Dollar",
        "TND": "Tunisian Dinar",
        "TRY": "Turkish lira",
        "TMT": "Turkmenistan manat",
        "UGX": "Ugandan Shilling",
        "UAH": "Ukrainian hryvnia",
        "AED": "United Arab Emirates Dirham",
        "USD": "United States Dollar",
        "UYU": "Uruguayan Peso",
        "UZS": "Uzbekistani Som",
        "VND": "Vietnamese dong",
        "XOF": "West African CFA franc",
        "YER": "Yemeni Rial",
        "ZMW": "Zambian Kwacha",
        "XBT": "Bitcoin",
        "ETH": "Ether",
        "EUR": "Euro",
        "LTC": "Litecoin",
        "TWD": "NT$",
        "PEN": "Peruvian Sol"
    }
    currencyCode = ["AFN", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BBD", "BDT", "BYR", "BZD", "BMD", "BTN", "XBT", "BOB", "BAM", "BWP", "BRL", "BND", "BGN", "BIF", "XPF", "KHR ", "CAD", "CVE", "KYD", "FCFA", "CLP", "CLF", "CNY", "CNY", "COP", "CF", "CDF", "CRC", "HRK", "CUC", "CZK", "DKK", "DJF", "DOP", "XCD", "EGP", "ETB", "FJD", "GMD", "GBP", "GEL", "GHS", "GTQ", " GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "IRR", "IQD", "ILS", "JMD", "JPY", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LBP", "LSL", "LRD", "LYD", "MOP", "MKD", "MGA" , "MWK", "MYR", "MVR", "MRO", "MUR", "MXN", "MDL", "MAD", "MZN", "MMK", "NAD", "NPR", "ANG", "NZD", "NIO", "NGN", "NOK", "OMR", "PKR", "PAB", "PGK", "PYG ", "PHP", "PLN", "QAR", " RON", "RUB", "RWF", "SVC", "SAR", "RSD", "SCR", "SLL", "SGD", "SBD", "SOS", "ZAR", "KRW", "VES", "LKR", "SDG", "SRD", "SZL", "SEK", "CHF", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY" , "TMT", "UGX", "UAH", "AED", "USD", "UYU", "UZS", "VND", "XOF", "YER", "ZMW", "ETH", "EUR", "LTC", "TWD", "PEN"]

    constructor(params) {
        this.currencyFrom = ""
        this.currencyTo = ""
        this.currencyAmount = 1
        this.convertedValue = 0
        this.isDecimalComma = false

        if(params != undefined){
            if(params["from"] !== undefined)
                this.from(params["from"])

            if(params["to"] !== undefined)
                this.to(params["to"])
            
            if(params["amount"] !== undefined)
                this.amount(params["amount"])

            if(params["isDecimalComma"] !== undefined)
                this.setDecimalComma(params["isDecimalComma"])
        }

    }
    from (currencyFrom) {
        if(typeof currencyFrom !== "string")
            throw new TypeError("currency code should be a string")
            
        if(!this.currencyCode.includes(currencyFrom.toUpperCase()))
            throw new Error(`${currencyFrom} is not a valid currency code`)

        this.currencyFrom = currencyFrom.toUpperCase()
        return this
    }
    to (currencyTo) {
        if(typeof currencyTo !== "string")
            throw new TypeError("currency code should be a string")

        if(!this.currencyCode.includes(currencyTo.toUpperCase()))
            throw new Error(`${currencyTo} is not a valid currency code`)

        this.currencyTo = currencyTo
        return this
    }
    amount (currencyAmount){
        if(typeof currencyAmount !== "number")
            throw new TypeError("amount should be a number")

        if(currencyAmount <= 0)
            throw new Error("amount should be a positive number")
            
        this.currencyAmount = currencyAmount
        return this
    }

    setDecimalComma (isDecimalComma){
        if(typeof isDecimalComma !== "boolean")
            throw new TypeError("isDecimalComma should be a boolean")
        
        this.isDecimalComma = isDecimalComma
        return this
    }

    rates(){
        if(this.currencyFrom === this.currencyTo)
            return new Promise((resolve, _) => {resolve(this.currencyAmount) })
        else    
            return got(`https://www.google.co.in/search?q=${this.currencyAmount}+${this.currencyFrom}+to+${this.currencyTo}`)
                .then((html) => {
		    // const fs = require('fs');

		    // fs.writeFile("a.html", html.body, function(err) {
		    // if(err) {
			// return console.log(err);
		    // }
	    	    // console.log("The file was saved!")}) 
		    return cheerio.load(html.body)})
                .then(($) => {return $(".iBp4i").text().split(" ")[0]})
                .then((rates) => {
                    if(this.isDecimalComma){
                        if(rates.includes("."))
                            rates = rates.replaceAll(".", "")
                        if(rates.includes(","))
                            rates = rates.replaceAll(",", ".")
                    }
                    else{
                        if(rates.includes(","))
                            rates = rates.replaceAll(",", "")
                    }

                    return parseFloat(rates)
            })
    }

    convert(currencyAmount){
        if(currencyAmount !== undefined){
            this.amount(currencyAmount)
        }

        if(this.currencyFrom == "")
            throw new Error("currency code cannot be an empty string")

        if(this.currencyTo == "")
            throw new Error("currency code cannot be an empty string")

        if(this.currencyAmount == 0)
            throw new Error("currency amount should be a positive value")

        return this.rates().then((rates) =>{
            // this.convertedValue = rates * this.currencyAmount

	    // as the google result now sends the exact converted
	    // currency, multiplying the rates with currencyAmount 
	    // makes it redundant.
	    this.convertedValue = rates * 1
            return this.convertedValue
        })
    }

    currencyName(currencyCode_){
        if(typeof currencyCode_ != "string")
            throw new TypeError("currency code should be a string")
        
        if(!this.currencyCode.includes(currencyCode_.toUpperCase()))
            throw new Error(`${currencyCode_} is not a valid currency code`)

        return this.currencies[currencyCode_]
    }
  }

module.exports = CurrencyConverter
