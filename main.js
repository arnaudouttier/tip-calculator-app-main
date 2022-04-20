const billAmount = document.querySelector("#bill-amount");
const customTip = document.querySelector("#custom-tip");
const numberPeopleGroup = document.querySelector(".number-people-group");
const spanWarning = document.querySelector(".span-input-warning");
const nbOfPeople = document.querySelector("#people-number");
const tipResult = document.querySelector(".result-tip-amount .result-output");
const personResult = document.querySelector(".result-total .result-output");

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
  billAmount.value = "0";
  customTip.value = "0";
  nbOfPeople.value = "0";
  tipResult.innerHTML = 0;
  personResult.innerHTML = 0;
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

document.querySelector(".card").addEventListener("change", calculateTip);
document.querySelector(".bill-reset").addEventListener("click", reset);
