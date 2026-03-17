// Desafio:
//[X] Adicionar um shadow nos inputs e selects para dar um efeito de profundidade.
//[X] O usuário deve ser capaz de inserir um valor em reais (BRL), euro (EUR) ou dólar (USD) no campo de entrada.
//[X] O aplicativo deve trocar a bandeira,o nome da moeda e o valor de acordo com a moeda selecionada para conversão.
//[X] Ao escolher a moeda para a qual deseja converter (dólar, euro, etc.) e obotao de converter for
//    clicado a função de conversão deve ser acionada, realizando a conversão do valor inserido para a moeda selecionada.
//[X] O aplicativo deve exibir o valor convertido na moeda selecionada. 
//[X] Adicionar mais duas moedas para conversão, como libra esterlina (GBP) e iene japonês (JPY).
//[] O aplicativo deve lidar com erros, como entradas inválidas ou falhas na API, exibindo mensagens de erro apropriadas para o usuário.
//[] O aplicativo deve ser responsivo, adaptando-se a diferentes tamanhos de tela, como desktops, tablets e smartphones.

const buttonConverter = document.querySelector("button")
const inputValue = document.querySelector("input")
const currencyDolar = document.querySelector(".currency-dolar")
const selectCurrency = document.querySelector(".select-currency")
let codeCurrency = "USD"
const currencyToConvert = document.querySelector(".currency-to-convert")
let codeCurrencyToConvert = "BRL"

function checkCodeCurrencyToConvert() {

    if (currencyToConvert.value === "real") {
        codeCurrencyToConvert = "BRL"
        document.querySelector(".flags").src = "./assets/real.png"
        document.querySelector(".flags").alt = "flag-real"
        document.querySelector(".currency").textContent = "Real"
        document.querySelector(".currency-real").textContent = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(0)

    } else if (currencyToConvert.value === "dolar") {
        codeCurrencyToConvert = "USD"
        document.querySelector(".flags").src = "./assets/dolar.png"
        document.querySelector(".flags").alt = "flag-dolar"
        document.querySelector(".currency").textContent = "Dólar"
        document.querySelector(".currency-real").textContent = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(0)
    } else if (currencyToConvert.value === "euro") {
        codeCurrencyToConvert = "EUR"
        document.querySelector(".flags").src = "./assets/euro.png"
        document.querySelector(".flags").alt = "flag-euro"
        document.querySelector(".currency").textContent = "Euro"
        document.querySelector(".currency-real").textContent = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(0)
    }

}

currencyToConvert.addEventListener("change", checkCodeCurrencyToConvert)


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
    }else if (codeCurrencyVerify === "real") {
        codeCurrency = "BRL"
        document.querySelector(".currency-name").textContent = "Real"
        document.querySelector(".change-flag").src = "./assets/real.png"
        document.querySelector(".change-flag").alt = "flag-real"
        document.querySelector(".currency-dolar").textContent = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(0)
    }else if (codeCurrencyVerify === "libra") {
        codeCurrency = "GBP"
        document.querySelector(".currency-name").textContent = "Libra Esterlina"
        document.querySelector(".change-flag").src = "./assets/libra.png"
        document.querySelector(".change-flag").alt = "flag-libra"
        document.querySelector(".currency-dolar").textContent = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(0)
    }else if (codeCurrencyVerify === "iene") {
        codeCurrency = "JPY"
        document.querySelector(".currency-name").textContent = "Iene Japonês"
        document.querySelector(".change-flag").src = "./assets/iene.png"
        document.querySelector(".change-flag").alt = "flag-iene"
        document.querySelector(".currency-dolar").textContent = new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "JPY"
        }).format(0)
    }

}

selectCurrency.addEventListener("change", checkCodeCurrency);

function toConvert() {

    const API_KEY = "e0336a24fd5b3577e2ddf631"
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${codeCurrencyToConvert}/${codeCurrency}/${inputValue.value}`;

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
            }else if (codeCurrency === "BRL") {
                currencyDolar.textContent = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
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




