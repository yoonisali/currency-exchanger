import './css/styles.css';
import CurrencyExchangerService from "./js/currencyAPI.js"

// Business Logic
async function getRates(currency) {
  const response = await CurrencyExchangerService.getRates(currency);
  if (response.result === "success") {
    printElements(response, currency);
  } else {
    printError(response, currency);
  }
}

// UI Logic -------------------------------------------------------------------------------------------------------------------

const printElements = (response, currency) => {
    document.getElementById( "displayExchange" ).innerHTML = `The currency exchange from USD to ${currency} is: ${response.conversion_rates}`;
};

const printError = (error, currency) => {
    document.getElementById("displayExchange").innerHTML = `There was an error accessing the currency exchange for ${currency}: ${error}`;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const userCurrency = document.querySelector("input:checked.currencies").value;
  const userAmount = document.getElementById("dollar").value;
  getRates(userCurrency, userAmount);
}; 


window.addEventListener("load", function () {
  document.getElementById("currencyExchanger").addEventListener("submit", handleSubmit);
});

