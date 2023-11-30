(function (window, document) {
  "use strcit";

  var FormContacto = document.querySelector(".form");

  if (!FormContacto) {
    return;
  }

  function Constructor() {
    FormContacto.addEventListener("submit", onSubmit, false);
  }

  function CreateItem() {
    // Crear la estructura de elementos utilizando JavaScript
    const listContainer = document.querySelector(".list");

    const listItem = document.createElement("li");
    listItem.classList.add("list__li");

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item");

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", "Done item");
    button.classList.add("item__icon");

    const spanDone = document.createElement("span");
    spanDone.classList.add("item__icon__done");

    const spanCheck = document.createElement("span");
    spanCheck.classList.add("item__icon__check");

    const svgCheck = document.createElement("svg");
    svgCheck.setAttribute("viewBox", "0 0 24 24");
    svgCheck.setAttribute("aria-hidden", "true");
    svgCheck.id = "done-icon";

    const pathCheck = document.createElement("path");
    pathCheck.setAttribute(
      "d",
      "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
    );

    svgCheck.appendChild(pathCheck);
    spanCheck.appendChild(svgCheck);

    button.appendChild(spanDone);
    button.appendChild(spanCheck);

    const spanText = document.createElement("span");
    spanText.classList.add("item__text");
    spanText.textContent = "Lorem ipsum dolor sit amet";

    const divActions = document.createElement("div");
    divActions.classList.add("item__actions");

    const buttonToggle = document.createElement("button");
    buttonToggle.setAttribute("type", "button");
    buttonToggle.setAttribute("aria-label", "Toggle dropdown");
    buttonToggle.classList.add("item__toggle");

    for (let i = 0; i < 3; i++) {
      const spanDot = document.createElement("span");
      spanDot.classList.add("item__toggle__dots");
      buttonToggle.appendChild(spanDot);
    }

    const divDropdown = document.createElement("div");
    divDropdown.classList.add("item__dropdown");

    const buttonEdit = document.createElement("button");
    buttonEdit.setAttribute("type", "button");
    buttonEdit.setAttribute("aria-label", "Edit item");
    buttonEdit.classList.add("action__edit");

    const svgEdit = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgEdit.setAttribute("viewBox", "0 0 24 24");
    svgEdit.setAttribute("aria-hidden", "true");

    const pathEdit = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathEdit.setAttribute(
      "d",
      "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    );

    svgEdit.appendChild(pathEdit);
    buttonEdit.appendChild(svgEdit);

    const spanEdit = document.createElement("span");
    spanEdit.classList.add("item__txt");
    spanEdit.textContent = "Editar";

    buttonEdit.appendChild(spanEdit);
    divDropdown.appendChild(buttonEdit);
    divActions.appendChild(buttonToggle);
    divActions.appendChild(divDropdown);
    itemContainer.appendChild(button);
    itemContainer.appendChild(spanText);
    itemContainer.appendChild(divActions);
    listItem.appendChild(itemContainer);
    listContainer.appendChild(listItem);
  }

  //Functions
  function isEmpty(input) {
    return input.value == "";
  }

  //Events
  function onSubmit() {
    event.preventDefault();
    CreateItem();
    // resetFormErrors();

    // inputFirstName.value = inputFirstName.value.replaceAll("http://", "");
    // inputLastName.value = inputLastName.value.replaceAll("http://", "");
    // inputEmail.value = inputEmail.value.replaceAll("http://", "");
    // inputMessage.value = inputMessage.value.replaceAll("http://", "");

    // if (isEmpty(inputFirstName)) {
    //   hasErrors = true;
    //   addError(inputFirstName, "You must complete a Name.");
    // } else {
    //   removeError(inputFirstName);
    // }

    // if (isEmpty(inputLastName)) {
    //   hasErrors = true;
    //   addError(inputLastName, "You must complete a Last Name.");
    // } else {
    //   removeError(inputLastName);
    // }

    // if (isEmpty(inputEmail)) {
    //   hasErrors = true;
    //   addError(inputEmail, "You must complete an Email Address.");
    // } else if (isInvalidEmail(inputEmail)) {
    //   hasErrors = true;
    //   addError(inputEmail, "You must complete an Email Address valid.");
    // } else {
    //   removeError(inputEmail);
    // }

    if (isEmpty(inputMessage)) {
      hasErrors = true;
      addError(inputMessage, "You must complete a Query.");
    } else {
      removeError(inputMessage);
    }

    if (hasErrors == false) {
    } else {
      showGenericError();
      // window.scrollTo(0, 0);
    }
  }

  window.Contacto = new Constructor();
})(window, document);
