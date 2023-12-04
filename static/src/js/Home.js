(function (window, document) {
  "use strict";

  var FormContacto = document.querySelector(".form");

  if (!FormContacto) {
    return;
  }

  // Constructor para toggleDropdown
  function DropdownController() {
    var dropdownActive = null;

    this.toggleDropdown = function (button) {
      var itemElement = button.closest(".item");
      var dropdownElement = itemElement.querySelector(".item__dropdown");

      var dropdownElementActive = document.querySelector(
        ".item__dropdown.active"
      );

      if (dropdownElementActive && dropdownElementActive !== dropdownElement) {
        // Oculta el dropdown activo si es diferente al actual
        dropdownElementActive.classList.remove("active");
      }

      dropdownElement.classList.toggle("active");

      // Actualiza el dropdown activo
      dropdownActive = dropdownElement.classList.contains("active")
        ? dropdownElement
        : null;
    };
  }

  function Constructor() {
    FormContacto.addEventListener("submit", onSubmit, false);
  }

  function obtenerValorInput() {
    // Obtener el valor del input por su id
    var valorInput = FormContacto.querySelector(".form__text").value;

    return valorInput;
  }
  function limpiarValorInput() {
    // Obtener el valor del input
    var valorInput = FormContacto.querySelector(".form__text");

    valorInput.value = "";
  }

  /**
   * Generates an edit form for a given button.
   *
   * @param {HTMLElement} button - The button element that triggers the edit form generation.
   */
  function generateEdit(button) {
    const textElement =
      button.parentNode.parentNode.parentNode.querySelector(".item__text");

    if (textElement.querySelector(".form-edit__text") !== null) {
      return;
    }
    const textoElement = textElement.textContent;
    textElement.textContent = "";
    const formElement = document.createElement("form");
    formElement.className = "form-edit";

    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "text";
    inputElement.className = "form-edit__text";
    inputElement.placeholder = textoElement;
    inputElement.value = textoElement;

    const buttonElement = document.createElement("button");
    buttonElement.type = "submit";
    buttonElement.className = "form-edit__save";
    buttonElement.onclick = function () {
      editText(buttonElement);
    };

    const spanElement = document.createElement("span");
    spanElement.className = "form-edit__text";
    spanElement.textContent = "Guardar";

    // Construir la estructura
    buttonElement.appendChild(spanElement);
    formElement.appendChild(inputElement);
    // inputElement.focus();
    formElement.appendChild(buttonElement);
    textElement.appendChild(formElement);
    textElement.querySelector(".form-edit__text").focus();
  }

  function editText(button) {
    const elemento = button.parentNode;
    const textEdit =
      elemento.parentNode.querySelector(".form-edit__text").value;
    elemento.parentNode.textContent = textEdit;
  }

  function toggleDropdown(button) {
    // Obtener el elemento padre (item) del botón
    var itemElement = button.closest(".item");

    // Obtener el elemento dropdown dentro del item
    var dropdownElement = itemElement.querySelector(".item__dropdown");

    // Toggle (agregar/eliminar) la clase 'active' en el elemento dropdown
    dropdownElement.classList.toggle("active");

    // Obtener todos los elementos item en la lista
    var allItemElements = document.querySelectorAll(".list__li .item");

    // Iterar sobre todos los elementos item
    allItemElements.forEach(function (item) {
      // Verificar si el elemento actual es diferente al elemento padre del botón
      if (item !== itemElement) {
        // Si es diferente, quitar la clase 'active' del dropdown en ese elemento
        item.querySelector(".item__dropdown").classList.remove("active");
      }
    });
  }

  function CreateItem({ text = "default" }) {
    var dropdownController = new DropdownController();
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

    const svgCheck = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgCheck.setAttribute("viewBox", "0 0 24 24");
    svgCheck.setAttribute("aria-hidden", "true");
    svgCheck.id = "done-icon";

    const pathCheck = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
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
    spanText.textContent = text;

    const divActions = document.createElement("div");
    divActions.classList.add("item__actions");

    const buttonToggle = document.createElement("button");
    buttonToggle.setAttribute("type", "button");
    buttonToggle.setAttribute("aria-label", "Toggle dropdown");
    buttonToggle.classList.add("item__toggle");
    // Aquí, asignamos la función toggleDropdown al evento onclick
    buttonToggle.onclick = function () {
      dropdownController.toggleDropdown(buttonToggle);
    };

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
    buttonEdit.onclick = function () {
      generateEdit(buttonEdit);
    };

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

    const buttonRemove = document.createElement("button");
    buttonRemove.setAttribute("type", "button");
    buttonRemove.setAttribute("aria-label", "remove item");
    buttonRemove.classList.add("action__remove");

    const svgremove = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgremove.setAttribute("viewBox", "0 0 24 24");
    svgremove.setAttribute("aria-hidden", "true");

    const pathremove = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathremove.setAttribute(
      "d",
      "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    );

    svgremove.appendChild(pathremove);
    buttonRemove.appendChild(svgremove);

    const spanRemove = document.createElement("span");
    spanRemove.classList.add("item__txt");
    spanRemove.textContent = "Eliminar";
    // Agregar función al botón de eliminación
    buttonRemove.onclick = function () {
      // Obtener el elemento padre (listItem) del botón
      var listItem = buttonRemove.closest(".list__li");

      // Eliminar el elemento del DOM
      listItem.parentNode.removeChild(listItem);
    };

    const buttonFavorite = document.createElement("button");
    buttonFavorite.setAttribute("type", "button");
    buttonFavorite.setAttribute("aria-label", "Favorite item");
    buttonFavorite.classList.add("action__favorite");

    const svgFavorite = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgFavorite.setAttribute("viewBox", "0 0 24 24");
    svgFavorite.setAttribute("aria-hidden", "true");

    const pathFavorite = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathFavorite.setAttribute(
      "d",
      "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"
    );

    svgFavorite.appendChild(pathFavorite);
    buttonFavorite.appendChild(svgFavorite);

    const spanFavorite = document.createElement("span");
    spanFavorite.classList.add("item__txt");
    spanFavorite.textContent = "Favorito";

    buttonFavorite.appendChild(spanFavorite);
    divDropdown.appendChild(buttonFavorite);

    buttonRemove.appendChild(spanRemove);
    divDropdown.appendChild(buttonRemove);
    buttonEdit.appendChild(spanEdit);
    divDropdown.appendChild(buttonEdit);
    divActions.appendChild(buttonToggle);
    divActions.appendChild(divDropdown);
    itemContainer.appendChild(button);
    itemContainer.appendChild(spanText);
    itemContainer.appendChild(divActions);
    listItem.appendChild(itemContainer);
    listContainer.appendChild(listItem);

    limpiarValorInput();
  }

  //Functions
  function isEmpty(input) {
    return input.value == "";
  }

  //Events
  function onSubmit() {
    event.preventDefault();
    const textTask = obtenerValorInput();
    if (textTask == "") {
      return;
    }
    CreateItem({
      text: textTask,
    });
    // Al crear un nuevo item, ocultamos el dropdown activo
  }

  window.Contacto = new Constructor();
})(window, document);
