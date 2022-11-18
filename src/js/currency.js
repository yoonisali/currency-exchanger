import './css/styles.css';
import CurrencyExchangerService from './currencyAPI.js';

// Business Logic 
async function getRates() {
  const response = await  CurrencyExchangerService.getRates();
  if (response) {
    displayExchange();
  }

}

// UI Logic -------------------------------------------------------------------------------------------------------------------

const displayExchange = (response, usDollar, currency) => {
  if (response.result !== "success") {
    document.getElementById("displayExchange").innerText = `There was an error: ${response.message}`;
  } else if (!currency) {
    document.getElementById("displayExchange").innerText = "Please select a currency."
  } else if (usDollar === '') {
    document.getElementById("displayExchange").innerText = "Please enter an amount in USD."
  } else if (response.result === "success") {
    document.getElementById("displayExchange").innerText = `${usDollar} in ${currency}: ${response.conversion_rates[currency]*usDollar}`;
  }
}
const handleSubmit = (event) => {
  event.preventDefault();
  const userCurrency = document.getElementById("chooseCurrency").value;
  const userAmount = document.getElementById("chooseAmount").value;
  getRates(userCurrency, userAmount);
}

window.addEventListener("load", function () {
  document.getElementById("currencyExchanger").addEventListener("submit", handleSubmit);
})