/********************* NAV **********************/
function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalX = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// eventlistener closeModal
closeModalX.addEventListener("click", closeModal);

//Fonction close modal
function closeModal() {
  modalbg.style.display = "none";
  //form.style.opacity: Pr réafficher la pop up form
  form.style.opacity = "1";
  successConfirmation.style.display = "none";
}
