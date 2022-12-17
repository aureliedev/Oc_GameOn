/************************ DOM ELEMENTS ************************/
const form = document.getElementById("form");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locationCity = document.querySelector(".location-city");
const locations = Array.from(document.querySelectorAll(".location-input")); // nouvelle instance d'Array à partir d'un objet semblable à un tableau
const terms = document.querySelector("#checkbox1");
const newsletter = document.querySelector("#checkbox2");

const successConfirmation = document.querySelector(".success-confirmation");

/********************* REGEX (expressions régulières) **********************/
const nameRegex = /^[a-zéèôöîïûùü' -]{2,50}$/i;
const emailRegex = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/i;

/********************* EVENTLISTENER **********************/
firstName.addEventListener("change", () => {
  verifyInput(firstName, nameRegex);
});

lastName.addEventListener("change", () => {
  verifyInput(lastName, nameRegex);
});

email.addEventListener("change", () => {
  verifyInput(email, emailRegex);
});

birthDate.addEventListener("blur", () => {
  //"blur": Supprime le focus d'une saisie de texte
  verifyDate(birthDate);
});

quantity.addEventListener("change", () => {
  verifyQuantity(quantity);
});

// FORM
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});

/********************** FUNCTIONS ********************/

//Fonction des champs et des regex
function verifyInput(input, regex) {
  //si les regex testés des inputs sont OK pas d'affichage d'erreurs avec removeAttribute
  if (regex.test(input.value)) {
    input.parentNode.removeAttribute("data-error-visible");
    return true;
  }
  //si erreur on les affiches avec setAttribute et on stop la
  input.parentNode.setAttribute("data-error-visible", true);
  return false;
}

//Fonction pour la date
function verifyDate(input) {
  //2 const créé: une avec la date de mtn et l'autre avec la date saisie ds le champs
  const currentDate = new Date(Date.now());
  const dateIndicated = new Date(input.value);
  if (
    //on vérifie que dateIndicated est supérieur a currentDate et doit y avoir 15 d'écart
    !input.value ||
    dateIndicated.getFullYear() > currentDate.getFullYear() - 15
    //getFullYear() renvoie l'année de la date renseignée d'après l'heure locale.
  ) {
    //si erreur on les affiches avec setAttribute et on stop la
    input.parentNode.setAttribute("data-error-visible", true);
    return false;
  } //sinon on retourne true
  input.parentNode.setAttribute("data-error-visible", false);
  return true;
}

//Fonction pour la quantité
function verifyQuantity(input) {
  //Si la value des champs n'est pas comprises entre 0 et 100
  if (!input.value || input.value < 0 || input.value > 100) {
    // on  affiche les erreurs avec setAttribute et on stop la
    input.parentNode.setAttribute("data-error-visible", true);
    return false;
  }
  //sinon on retourne true
  input.parentNode.setAttribute("data-error-visible", false);
  return true;
}

//Fonction pour la localisation
function verifyLocation(arrayInputs) {
  let selectedLocation = ""; // variable vide
  const selectedLocationInput = arrayInputs.find(
    //.find: renvoie la valeur du premier élément trouvé dans le tableau: l'élément coché = true
    (input) => input.checked === true
  );
  // si il n'y a pas d'élement séléctionné alors on affiche l'erreur
  if (!selectedLocationInput) {
    locationCity.setAttribute("data-error-visible", true);
    return false;
  }
  // sinon on passe la valeur de l'élément selectionné du champs ds la variable vide crée précedemment selectedLocation
  selectedLocation = selectedLocationInput.value;
  locationCity.setAttribute("data-error-visible", false);
  return true;
}

//Fonction des conditions générales d'utiisation
function verifyTerms() {
  //si les terms ne sont pas cochés
  if (terms.checked === false) {
    //alors on affiche l'erreur
    terms.parentNode.setAttribute("data-error-visible", true);
    return false;
  }
  //sinon on n'affiche pas l'erreur
  terms.parentNode.setAttribute("data-error-visible", false);
  return true;
}

//Fonction pour la newsletter
function verifyNewsletter() {
  //si newsletter est cochée => OK
  if (newsletter.checked === true) {
    return true;
  }
  //snon KO
  return false;
}

//Fonction pour la validation de tous les champs du formulaire
function validate() {
  verifyInput(firstName, nameRegex);
  verifyInput(lastName, nameRegex);
  verifyInput(email, emailRegex);
  verifyDate(birthDate);
  verifyLocation(locations);
  verifyTerms();
  //Si toutes les fonctions créer contiennent leurs arguments
  if (
    verifyInput(firstName, nameRegex) &&
    verifyInput(lastName, nameRegex) &&
    verifyInput(email, emailRegex) &&
    verifyDate(birthDate) &&
    verifyLocation(locations) &&
    verifyTerms()
  ) {
    // On creer un objet pour contenir les valeurs des inputs
    let dataSent = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      birthdate: birthDate.value,
      quantity: quantity.value,
      location: locations.find((input) => input.checked === true).value,
      newsletter: verifyNewsletter(),
    };
    console.log(dataSent, "formulaire OK");

    // Effacement des valeurs des inputs avec des champs vident
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    birthDate.value = "";
    quantity.value = 0;
    locations.find((input) => input.checked === true).checked = false;
    newsletter.checked = false;

    form.style.opacity = "0";
    successConfirmation.style.display = "block";
    //Si tout est respecté, on valide l'envoie du formulaire et on affiche la modal successConfirmation
  } else {
    console.log("formulaire KO");
  }
}
