import "./css/styles.css";
import CurrencyExchangerService from "./js/currencyAPI.js";

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
  let value = document.querySelector("input:checked.currencies").value;
  let dollar = document.getElementById("dollar").value;
  if (value === "SOS") {
    document.getElementById("displayExchange").innerHTML = `The currency exchange from USD to ${currency} is: ${response.conversion_rates.SOS * dollar}S`;
  } else if (value === "GBP") {
    document.getElementById("displayExchange").innerHTML = `The currency exchange from USD to ${currency} is: ${response.conversion_rates.GBP * dollar}£`;
  } else if (value === "CAD") {
    document.getElementById("displayExchange").innerHTML = `The currency exchange from USD to ${currency} is: ${response.conversion_rates.CAD * dollar}$`;
  } else if (value === "CNY") {
    document.getElementById("displayExchange").innerHTML = `The currency exchange from USD to ${currency} is: ${response.conversion_rates.CNY * dollar}¥`;
  } else if (value === "MXN") {
    document.getElementById("displayExchange").innerHTML = `The currency exchange from USD to ${currency} is: ${response.conversion_rates.MXN * dollar}₱`;
  }
  console.log
  console.log(response.conversion_rates.SOS * dollar);
  console.log(response.conversion_rates.GBP * dollar);
  console.log(response.conversion_rates.CAD * dollar);
};

const printError = (error, currency) => {
  document.getElementById(
    "displayExchange"
  ).innerHTML = `There was an error accessing the currency exchange for ${currency}: ${error}`;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const userCurrency = document.querySelector("input:checked.currencies").value;
  const userAmount = document.getElementById("dollar").value;
  getRates(userCurrency, userAmount);
};

window.addEventListener("load", function () {
  document
    .getElementById("currencyExchanger")
    .addEventListener("submit", handleSubmit);
});
