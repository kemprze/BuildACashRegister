const billList = document.querySelector(".bill-list")

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

const valueToBill = (element, billValues) => Math.floor(element[1] / billValues[element[0]]);

const showCurrentCashState = (billList, billValues) => {
  const {title, value} = cid;

  cid.forEach((c) => {billList.innerHTML += `<li class="bill">${c[0]} - ${c[1]} -- ${valueToBill(c, billValues)} bills</li>`});
}

showCurrentCashState(billList, billValues)