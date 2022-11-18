import "./css/styles.css";
import CurrencyExchangerService from "./currencyAPI.js";

// Business Logic
async function getRates(currencies, dollar) {
  const response = await CurrencyExchangerService.getRates(currencies, dollar);
  if (response.result === "success") {
    printElements(response, currencies, dollar);
  } else {
    printError(response, currencies, dollar);
  }
}

// UI Logic -------------------------------------------------------------------------------------------------------------------

const printElements = (response, dollar, currencies) => {
    document.getElementById( "displayExchange" ).innerText = `${dollar} in ${currencies}: ${response.conversion_rates[currencies] * dollar}`;
};

const printError = (response, dollar, currencies) => {
  if (response.result !== "success") {
    document.getElementById("displayExchange").innerText = `There was an error: ${response[error-type]}`;
  } else if (!currencies) {
    document.getElementById("displayExchange").innerText = "Please select a currency.";
  } else if (dollar === "") {
    document.getElementById("displayExchange").innerText = "Please enter an amount in USD.";
  } 
};

const handleSubmit = (event) => {
  event.preventDefault();
  const userCurrency = document.getElementById("chooseCurrency").value;
  const userAmount = document.getElementById("chooseAmount").value;
  getRates(userCurrency, userAmount);
}; 


window.addEventListener("load", function () {
  document.getElementById("currencyExchanger").addEventListener("submit", handleSubmit);
});
