import { dbank } from "../../declarations/dbank";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("#submit-btn");

  const amountTopUp = parseFloat(document.getElementById("input-amount").value);
  const amountWithdraw = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if(document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(amountTopUp);
  }
  if(document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank.withdraw(amountWithdraw);
  }

  update();

  document.getElementById("input-amount").value = ""; 
  document.getElementById("withdrawal-amount").value = ""; 

  button.removeAttribute("disabled");
});

window.addEventListener("load", async function() {
  update();
});

async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100; 
}