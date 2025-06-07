// defining element references

const billList = document.querySelector(".bill-list")
const fundsAvailable = document.querySelector(".available-funds")
const purchaseBtn = document.getElementById("purchase-btn")
const statusMessage = document.getElementById("change-due")

const cashPayment = () => {
  const input = document.getElementById("cash").value.trim();
  if (!input) return 0; // empty input
  
const matches = input.match(/\d+(\.\d+)?/);; // match number with optional decimal .xx
  
  if (matches) {
    return Number(matches[0]);
  }
  return 0;
};


// defining variables and constants 

let price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]

const billValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}

// defining functions

// counts the number of bills of every value 
const valueToBill = (element, billValues) => Math.floor(element[1] / billValues[element[0]]);

// updates the list with value and number of each bill
const showCurrentCashState = (billList, billValues) => {
  cid.forEach((c) => {billList.innerHTML += `<li class="bill"><b>${c[0]}</b> - $${c[1]} -- ${valueToBill(c, billValues)} bills</li>`});
}

// calculates the total amount of funds in the registry at the moment
const totalRegister = (cid) => {
  let sum = 0;
  cid.forEach((c) => sum += c[1]);

  return Number(sum.toFixed(2));
}

// updates the funds div with the calculated value

const updateFunds = () => {
  fundsAvailable.innerHTML += `<div class="funds">$${fundsInRegister}</div>`
}

// checks if there is enough funds to process the payment
// issue - nullability of input value
const enoughFundsInReg = () => cashPayment() !== null && fundsInRegister >= cashPayment();

// checks if the funds value in the register are the exact same as the cash from the customer
const exactValue = () => fundsInRegister === cashPayment() && cashPayment() !== null;

// checks if the funds from the customer are enough to pay for the object
const enoughPayment = (fundsInRegister) => price <= cashPayment();

// checks if the funds from the customer cover the price exactly

const priceCoveredExactly = () => price === cashPayment();

const fundsInRegister = totalRegister(cid);

// calculates the change to be disbursed
const changeToDisburse = () => {
  let changeDue = +(cashPayment() - price).toFixed(2);
  let changeArray = [];

  // Calculate total funds in drawer now:
  const fundsInRegister = totalRegister(cid);

  // Sort cid largest to smallest
  const sortedCid = [...cid].sort((a, b) => billValues[b[0]] - billValues[a[0]]);

  sortedCid.forEach(([name, total]) => {
    let value = billValues[name];
    let amountFromThisBill = 0;

    while (changeDue >= value && total >= value) {
      changeDue = +(changeDue - value).toFixed(2);
      total = +(total - value).toFixed(2);
      amountFromThisBill = +(amountFromThisBill + value).toFixed(2);
    }

    if (amountFromThisBill > 0) {
      changeArray.push(`${name}: $${amountFromThisBill}`);
    }
  });

  if (changeDue > 0) {
    statusMessage.innerText = "Status: INSUFFICIENT_FUNDS";
  } else {
    if ((cashPayment() - price) === fundsInRegister) {
      statusMessage.innerText = "Status: CLOSED " + changeArray.join(" ");
      // Clear the cash-in-drawer since register is empty now
      cid = cid.map(([name]) => [name, 0]);
    } else {
      statusMessage.innerText = "Status: OPEN " + changeArray.join(" ");
    }
  }
};


// master function to invoke the rest of functions
const main = (e) => {
  e.preventDefault();
  statusMessage.innerText = "";

  const fundsInRegister = totalRegister(cid);

  if (!enoughPayment(fundsInRegister)) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (priceCoveredExactly()) {
    statusMessage.innerText = "No change due - customer paid with exact cash";
    return;
  }

  changeToDisburse(fundsInRegister);
};



showCurrentCashState(billList, billValues);
updateFunds()

// event listener to invoke the rest of the functions

purchaseBtn.addEventListener("click", (e) => main(e));