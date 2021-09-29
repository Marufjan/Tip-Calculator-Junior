"use strict";

//////////////// Selection Form, Tips, Amounts /////////////////////////
const form = document.querySelector(".form-1");
const reset = document.querySelector(".reset");
const tipAmount = document.querySelector(".sum-tip");
const totalAmount = document.querySelector(".sum-total");
const billAmount = document.querySelector(".bill-value");
const customAmount = document.querySelector(".custom");
const peopleAmount = document.querySelector(".numPeople-value");
const tipPercentages = document.querySelectorAll(".box");
const errorPeople = document.querySelector(".errorPeople");
const errorBill = document.querySelector(".errorBill");

/////////////////// Starting  Numbers ////////////////////////////////
let amount = 0,
  people = 0,
  tip = 0;

///////////////////////// Bill Amount ///////////////////////////////////////

billAmount.addEventListener("input", function () {
  // Bill Value
  amount = parseFloat(billAmount.value);

  // For Error
  if (amount >= 1) {
    calcResults();
    return;
  } else {
    errorBill.classList.add("show");
    billAmount.value = "";
    billAmount.style.boxShadow = "0 0 5px hsl(1, 48%, 50%)";
  }
});

/////////////////////////// Tip Buttons ////////////////////////////////////////
tipPercentages.forEach((percent) => {
  percent.addEventListener("click", (e) => {
    // Preventing Default
    e.preventDefault();
    // Tip Value
    tip = parseFloat(percent.value);

    if (percent.classList.contains("active")) {
      percent.classList.remove("constant");
      percent.classList.add("active");
    } else {
      tipPercentages.forEach((per) => {
        per.classList.add("constant");
        per.classList.remove("active");
      });

      percent.classList.remove("constant");
      percent.classList.add("active");
    }

    calcResults();
  });
});

//////////////////////// Custom Amount ///////////////////////////////
customAmount.addEventListener("input", function () {
  customAmount.classList.add("active");
  tip = parseFloat(customAmount.value);
  calcResults();
});

///////////////////////// Number of people /////////////////////////

peopleAmount.addEventListener("input", function () {
  people = parseFloat(peopleAmount.value);

  // Calling Function
  if (people >= 1) {
    calcResults();
  } else {
    errorPeople.classList.add("show");
    peopleAmount.value = "";
    peopleAmount.style.boxShadow = "0 0 5px hsl(1, 48%, 50%)";
  }
});

/////////////////// Calculating Tips ///////////////////////////////////////
const calcResults = function () {
  if (tip >= 1 && amount >= 1 && people >= 1) {
    let tipPerPerson = (tip * amount) / 100;
    tipAmount.textContent = `$${(tipPerPerson / people).toFixed(2)}`;

    let billPerPerson = amount + tipPerPerson;
    totalAmount.textContent = `$${(billPerPerson / people).toFixed(2)}`;
  }
};

/////////////////////// Resetting the Form ///////////////////////////
const resetAll = function () {
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  billAmount.value = "";
  customAmount.value = "";
  peopleAmount.value = "";
  peopleAmount.style.boxShadow = "";
  billAmount.style.boxShadow = "";
  errorPeople.classList.remove("show");
  errorBill.classList.remove("show");

  tipPercentages.forEach((percent) => {
    if (percent.classList.contains("active")) {
      percent.classList.remove("active");
      percent.classList.add("constant");
    }
  });
};

resetAll();

// EventListener
reset.addEventListener("click", resetAll);
