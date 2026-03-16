const buttonConverter = document.querySelector("button")
const inputValue = document.querySelector("input")
const currencyDolar = document.querySelector(".currency-dolar")
const selectCurrency = document.querySelector(".select-currency")
let codeCurrency = "USD";

function checkCodeCurrency() {
    const select = document.querySelector(".select-currency")
    const codeCurrencyVerify = select.value

    if (codeCurrencyVerify === "euro") {
        codeCurrency = "EUR"
        document.querySelector(".currency-name").textContent = "Euro"
        document.querySelector(".change-flag").src = "./assets/euro.png"
        document.querySelector(".change-flag").alt = "flag-euro"
        document.querySelector(".currency-dolar").textContent = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(0)
    }else if (codeCurrencyVerify === "dolar") {
        codeCurrency = "USD"
        document.querySelector(".currency-name").textContent = "Dólar"
        document.querySelector(".change-flag").src = "./assets/dolar.png"
        document.querySelector(".change-flag").alt = "flag-dola"
        document.querySelector(".currency-dolar").textContent = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(0)
    }

}

selectCurrency.addEventListener("change", checkCodeCurrency);

function toConvert() {

    const API_KEY = "e0336a24fd5b3577e2ddf631"
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/BRL/${codeCurrency}/${inputValue.value}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (codeCurrency === "USD") {
                currencyDolar.textContent = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(data.conversion_result)
            } else if (codeCurrency === "EUR") {
                currencyDolar.textContent = new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                }).format(data.conversion_result)
            }
        });

    toInsrtValueInReal()
    checkCodeCurrency()

}

buttonConverter.addEventListener("click", toConvert)

function toInsrtValueInReal() {
    let stringValue = inputValue.value
    let numberValue = parseFloat(stringValue)
    document.querySelector(".currency-real").textContent = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(numberValue)
}




