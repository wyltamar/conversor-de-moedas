const buttonConverter = document.querySelector("button")
const inputValue = document.querySelector("input")
const currencyDolar = document.querySelector(".currency-dolar")
const selectCurrency = document.querySelector(".select-currency")
let codeCurrency = "USD"
const currencyToConvert = document.querySelector(".currency-to-convert")
let codeCurrencyToConvert = "BRL"


// Função para desabilitar o botão de conversão quando as moedas selecionadas forem iguais  
function disabledButton() {
    if(selectCurrency.value === currencyToConvert.value ) {
        buttonConverter.disabled = true
        buttonConverter.style.cursor = "not-allowed"
        alert("Por favor selecione moedas diferentes para conversão.")

    } else {
        buttonConverter.disabled = false
        buttonConverter.style.cursor = "pointer"
    }

}

// Adicionando o evento de mudança para os selects de moeda para verificar se as moedas selecionadas são iguais e desabilitar o botão de conversão se necessário
selectCurrency.addEventListener("change", disabledButton) 

// Adicionando o evento de mudança para o select de moeda a ser convertida para verificar se as moedas selecionadas são iguais e desabilitar o botão de conversão se necessário
currencyToConvert.addEventListener("change", disabledButton)


// Função para verificar o código da moeda a ser convertida e atualizar a bandeira, nome da moeda e valor de acordo com a moeda selecionada
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

// Adicionando o evento de mudança para o select de moeda a ser convertida para verificar o código da moeda e atualizar a bandeira, nome da moeda e valor de acordo com a moeda selecionada
currencyToConvert.addEventListener("change", checkCodeCurrencyToConvert)

// Função para verificar o código da moeda selecionada para conversão e atualizar a bandeira, nome da moeda e valor de acordo com a moeda selecionada
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
    } else if (codeCurrencyVerify === "dolar") {
        codeCurrency = "USD"
        document.querySelector(".currency-name").textContent = "Dólar"
        document.querySelector(".change-flag").src = "./assets/dolar.png"
        document.querySelector(".change-flag").alt = "flag-dola"
        document.querySelector(".currency-dolar").textContent = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(0)
    } else if (codeCurrencyVerify === "real") {
        codeCurrency = "BRL"
        document.querySelector(".currency-name").textContent = "Real"
        document.querySelector(".change-flag").src = "./assets/real.png"
        document.querySelector(".change-flag").alt = "flag-real"
        document.querySelector(".currency-dolar").textContent = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(0)
    } else if (codeCurrencyVerify === "libra") {
        codeCurrency = "GBP"
        document.querySelector(".currency-name").textContent = "Libra Esterlina"
        document.querySelector(".change-flag").src = "./assets/libra.png"
        document.querySelector(".change-flag").alt = "flag-libra"
        document.querySelector(".currency-dolar").textContent = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(0)
    } else if (codeCurrencyVerify === "iene") {
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

// 
selectCurrency.addEventListener("change", checkCodeCurrency);

//
function toConvert() {

    try {

        if (inputValue.value === "" || isNaN(inputValue.value)) {

            throw new Error("Valor inválido. Por favor, insira um número válido.")
            
        }

    } catch (error) {
        alert(error.message)
    }

    const url = `https://api.frankfurter.dev/v1/latest?base=${codeCurrencyToConvert}&symbols=${codeCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const convertedAmount = data.rates[codeCurrency] * parseFloat(inputValue.value);

            if (codeCurrency === "USD") {
                currencyDolar.textContent = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: codeCurrency
                }).format(convertedAmount)
            } else if (codeCurrency === "EUR") {
                currencyDolar.textContent = new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: codeCurrency
                }).format(convertedAmount)
            } else if (codeCurrency === "BRL") {
                currencyDolar.textContent = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }).format(convertedAmount)
            } else if (codeCurrency === "GBP") {
                currencyDolar.textContent = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                }).format(convertedAmount)
            } else if (codeCurrency === "JPY") {
                currencyDolar.textContent = new Intl.NumberFormat("ja-JP", {
                    style: "currency",
                    currency: "JPY"
                }).format(convertedAmount)
            }

        }).catch(error => {
            alert("Ocorreu um erro ao obter as taxas de câmbio. Por favor, tente novamente mais tarde.")
            console.error("Erro na API:", error)
        })

    toInsrtValueInReal()
    checkCodeCurrency()

}

// Adicionando o evento de clique para o botão de conversão para acionar a função de conversão
buttonConverter.addEventListener("click", toConvert)

// Função para inserir o valor em reais
function toInsrtValueInReal() {
    let stringValue = inputValue.value
    let numberValue = parseFloat(stringValue)
    document.querySelector(".currency-real").textContent = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(numberValue)
}




