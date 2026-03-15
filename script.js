// Lógica de programação
/* 

[X] Captar quando o botão Converter for clicado;
[x] Criar uma função para mostrar que o botão foi clicado; 
[X] Pegar o valor em real que será convertido e mostrar no console;
[X] Fazer a conversão de real para dólar;
[X] Colocar o valor em real informado pelo usuário no valor de real na tela;
[X] Colocar no campo dólar o valor convertido;
[ ] Formatar os valores para forma monetária;
[ ] Implementar a conversão para Euro ao trocarmos o select;

*/
const buttonConverter = document.querySelector("button")
const inputValue = document.querySelector("input")
const currencyDolar = document.querySelector(".currency-dolar")



function toConvert() { 

    const API_KEY = "e0336a24fd5b3577e2ddf631"
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/BRL/USD/${inputValue.value}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(`Resultado: ${data.conversion_result}`);
            currencyDolar.textContent = `US$ ${data.conversion_result.toFixed(2)}`            

        });

    toInsrtValueInReal()
    
    
    
}

buttonConverter.addEventListener("click", toConvert)

function toInsrtValueInReal(){
    document.querySelector(".currency-real").textContent = `R$ ${inputValue.value}`
}



