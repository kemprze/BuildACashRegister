// defining element references

const billList = document.querySelector(".bill-list")
const fundsAvailable = document.querySelector(".available-funds")
const cashPayment = Number(document.getElementById("cash").value.match(regex));
const purchaseBtn = document.getElementById("purchase-btn")
const statusMessage = document.getElementById("change-due")

// regex to filter out non-payment-like values
const regex = /\d+.\d{2}/gi

// defining variables and constants 

let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const billValues = {
  "PENNY": 0.01,
  "NICKEL": 0.02,
  "DIME": 0.05,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}

// defining functions

const valueToBill = (element, billValues) => Math.floor(element[1] / billValues[element[0]]);

const showCurrentCashState = (billList, billValues) => {
  cid.forEach((c) => {billList.innerHTML += `<li class="bill"><b>${c[0]}</b> - $${c[1]} -- ${valueToBill(c, billValues)} bills</li>`});
}

const totalRegister = (cid) => {
  let sum = 0;
  cid.forEach((c) => sum += c[1]);

  return Number(sum.toFixed(2));
}

const updateFunds = () => {
  fundsAvailable.innerHTML += `<div class="funds">$${funds}</div>`
}

const enoughFundsInReg = () => funds >= cashPayment;

const exactValue = () => funds == cashPayment;

const enoughPayment = () => price <= cashPayment;

const funds = totalRegister(cid);

const updateRegisterStatus = () => {
  if (!enoughFundsInReg()) {
    statusMessage.innerText = "Status: INSUFFICIENT_FUNDS";
  } else {
    statusMessage.innerText = "Status: OPEN";
  }
  
  if (exactValue()) {
    statusMessage.innerText = "Status: CLOSED";
  } 
}

showCurrentCashState(billList, billValues);
updateFunds()
updateRegisterStatus();