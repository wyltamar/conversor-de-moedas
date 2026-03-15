// Lógica de programação
/* 

[X] Captar quando o botão Converter for clicado;
[x] Criar uma função para mostrar que o botão foi clicado; 
[X] Pegar o valor em real que será convertido e mostrar no console;
[X] Fazer a conversão de real para dólar;
[X] Colocar o valor em real informado pelo usuário no valor de real na tela;
[X] Colocar no campo dólar o valor convertido;
[X] Formatar os valores para forma monetária;
[X] Implementar a conversão para Euro ao trocarmos o select;
[X] Trocar bandeira ao mudar a moeda estrangeira

*/
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
        document.querySelector(".currency-dolar").textContent = "€ 0.0"
    }else if (codeCurrencyVerify === "dolar") {
        codeCurrency = "USD"
        document.querySelector(".currency-name").textContent = "Dólar"
        document.querySelector(".change-flag").src = "./assets/dolar.png"
        document.querySelector(".change-flag").alt = "flag-dola"
        document.querySelector(".currency-dolar").textContent = "US$ 0.0"
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
                currencyDolar.textContent = `US$ ${data.conversion_result.toFixed(2)}`
            } else if (codeCurrency === "EUR") {
                currencyDolar.textContent = `€ ${data.conversion_result.toFixed(2)}`

            }
        });

    toInsrtValueInReal()
    checkCodeCurrency()

}

buttonConverter.addEventListener("click", toConvert)

function toInsrtValueInReal() {
    let stringValue = inputValue.value
    let numberValue = parseFloat(stringValue)
    document.querySelector(".currency-real").textContent = `R$ ${numberValue.toFixed(2)}`
}




