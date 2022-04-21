const billAmount = document.querySelector("#bill-amount");
const customTip = document.querySelector("#custom-tip");
const numberPeopleGroup = document.querySelector(".calculator-people");
const spanWarning = document.querySelector(".span-warning");
const nbOfPeople = document.querySelector("#people-number");
const tipResult = document.querySelector(
  ".calculator-tip-amount .result-total"
);
const personResult = document.querySelector(".calculator-total .result-total");

let np = 0;
var percentageButton = 0;

const convertToNumber = (x, base) => {
  const parsed = parseFloat(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
};

const tipAmount = (billTotal, percentageTip, numberPeople) => {
  let result = (billTotal * percentageTip) / 100 / numberPeople;
  return convertToNumber(result, 10);
};

const totalPerson = (billTotal, numberPeople, amountTip) => {
  let result = billTotal / numberPeople + amountTip;
  return convertToNumber(result, 10);
};

const peopleInputRender = (inputSelector) => {
  if (inputSelector.value == 0) {
    numberPeopleGroup.classList.add("warning");
    spanWarning.style.display = "block";
  } else {
    numberPeopleGroup.classList.remove("warning");
    spanWarning.style.display = "none";
  }
};

const renderResultBill = (aTip, ttPerson) => {
  tipResult.innerHTML = `$ ${aTip}`;
  if (ttPerson === Infinity) {
    personResult.innerHTML = `$ 0.00`;
  } else {
    personResult.innerHTML = `$ ${ttPerson}`;
  }
};

const reset = () => {
  billAmount.value = "";
  customTip.value = "";
  nbOfPeople.value = "";
  tipResult.innerHTML = `$ 0.00`;
  personResult.innerHTML = `$ 0.00`;
};

const calculateTip = () => {
  let bill = document.querySelector("#bill-amount").value;
  let nP = nbOfPeople.value;

  document.querySelectorAll(".percentage-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      renderResultBill(
        tipAmount(bill, event.currentTarget.value, nP),
        totalPerson(bill, nP, tipAmount(bill, event.currentTarget.value, nP))
      );
    });
  });

  peopleInputRender(nbOfPeople);

  renderResultBill(
    tipAmount(bill, customTip.value, nP),
    totalPerson(bill, nP, tipAmount(bill, customTip.value, nP))
  );
};

document.querySelector(".calculator").addEventListener("change", calculateTip);
document.querySelector(".calculator-reset").addEventListener("click", reset);
