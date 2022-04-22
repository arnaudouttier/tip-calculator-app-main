const calculator = document.querySelector(".calculator");
const calculatorPeopleBLock = document.querySelector(".calculator-people");
const billAmount = document.querySelector("#bill-amount");
const percentageTip = document.querySelector(".bill");
const nfPeople = document.querySelector("#people-number");

const calculatorReset = document.querySelector(".calculator-reset");

const resultTipTt = document.querySelector(
  ".calculator-tip-amount .result-total"
);
const resultBillTt = document.querySelector(".calculator-total .result-total");

let bill = 0;
let tipPerc = 0;
let numberCLient = 0;

const tipAmountTotal = (billentage, percTip, peopleN) => {
  return (bill * (percTip / 100)) / peopleN;
};

const billTotal = (bill, peopleN, percTip) => {
  return bill / peopleN + percTip;
};

const formatView = (value) => {
  if (isNaN(value) || value === Infinity) {
    value = "$ 0.00";
  }
  return value;
};

const reset = () => {
  billAmount.value = "";
  nfPeople.value = "1";
  bill = 0;
  tipPerc = 0;
  numberCLient = 0;
  resultTipTt.innerHTML = "$ 0.00";
  resultBillTt.innerHTML = "$ 0.00";
};

const changeOnCalculator = (event) => {
  if (event.target.name === "bill") {
    bill = event.target.value;
  }

  if (event.target.name === "client") {
    numberCLient = event.target.value;
    console.log(numberCLient);

    if (numberCLient === "0") {
      calculatorPeopleBLock.classList.add("warning");
    } else {
      calculatorPeopleBLock.classList.remove("warning");
    }
  }

  if (event.target.type === "radio" || event.target.name === "custom-perc") {
    tipPerc = event.target.value;
    console.log(tipPerc);
  }

  resultTipTt.innerHTML = formatView(
    tipAmountTotal(bill, tipPerc, numberCLient)
  );
  resultBillTt.innerHTML = formatView(
    billTotal(bill, numberCLient, tipAmountTotal(bill, tipPerc, numberCLient))
  );
};

calculator.addEventListener("change", changeOnCalculator);

calculatorReset.addEventListener("click", reset);
