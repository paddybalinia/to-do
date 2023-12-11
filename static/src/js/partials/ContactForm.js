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
    checkLocalStorageAndCreateContent();
    focusInput();
  }

  function focusInput() {
    var miInput = document.querySelector(".form__text");

    // Añadir un evento para detectar el foco
    miInput.addEventListener("focus", function () {
      FormContacto.classList.add("focus");
    });

    // Añadir un evento para detectar la pérdida de foco
    miInput.addEventListener("blur", function () {
      FormContacto.classList.remove("focus");
    });
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

  function onclickDoneList(button) {
    button.classList.contains("checked")
      ? removeDoneList(button)
      : moveToDoneList(button);

    // Obtener el id del item padre
    const id = button.closest(".list__li").getAttribute("data-id");

    // Obtener el item del local storage por el id
    const item = getItemById(id);

    // Toggle la propiedad checked del item
    item.checked = !item.checked;

    // Guardar el item actualizado en el local storage
    saveItem(item);

    counterDoneList();
  }

  function onclickFavorite(button) {
    // Obtener el id del item padre
    const itemLi = button.closest(".list__li");
    const id = itemLi.getAttribute("data-id");

    itemLi.classList.toggle("favorited");

    // Obtener el item del local storage por el id
    const item = getItemById(id);

    // Toggle la propiedad checked del item
    item.favorite = !item.favorite;

    // Guardar el item actualizado en el local storage
    saveItem(item);

    counterDoneList();
  }
  function getItemById(id) {
    // Obtener el objeto almacenado actualmente en el localStorage
    var storedItemsJSON = localStorage.getItem("items");

    // Convertir la cadena JSON a un array de objetos (si hay algo almacenado)
    var storedItems = storedItemsJSON ? JSON.parse(storedItemsJSON) : [];

    // Buscar el item por el id
    return storedItems.find((item) => item.id === id) || {};
  }
  function removeItem(button) {
    // Obtener el elemento padre (listItem) del botón
    var listItem = button.parentNode.parentNode.parentNode;
    const id = listItem.getAttribute("data-id");

    // Eliminar el elemento del DOM
    listItem.parentNode.removeChild(listItem);

    // Obtener el índice del item del local storage por el id
    const index = getIndexById(id);

    // Obtener los elementos del Local Storage
    var items = JSON.parse(localStorage.getItem("items"));

    // Eliminar el elemento del array de items
    items.splice(index, 1);

    // Actualizar el Local Storage con los nuevos items
    localStorage.setItem("items", JSON.stringify(items));
    counterDoneList();
  }

  // Función para obtener el índice de un item por su id
  function getIndexById(id) {
    var items = JSON.parse(localStorage.getItem("items"));
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return i;
      }
    }
    return -1; // Retorna -1 si no se encuentra el elemento
  }

  function saveItem(item) {
    // Obtener el array de objetos almacenados actualmente en el localStorage
    var storedItemsJSON = localStorage.getItem("items");

    // Convertir la cadena JSON a un array de objetos (si hay algo almacenado)
    var storedItems = storedItemsJSON ? JSON.parse(storedItemsJSON) : [];

    // Actualizar o agregar el item en el array
    const index = storedItems.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (index !== -1) {
      // Si el item ya existe, actualizarlo
      storedItems[index] = item;
    } else {
      // Si el item no existe, agregarlo
      storedItems.push(item);
    }

    // Convertir el array a una cadena JSON
    var updatedItemsJSON = JSON.stringify(storedItems);

    // Guardar el array actualizado en el localStorage
    localStorage.setItem("items", updatedItemsJSON);
  }

  function counterDoneList() {
    var totalElement = document.querySelector(".box-done__total");
    var totalList = document.querySelectorAll(".list--done .list__li");

    totalElement.innerText = totalList.length;
  }

  function moveToDoneList(button) {
    button.classList.add("checked");
    // Obtener el <li> padre del botón clickeado
    var listItem = button.closest(".list__li");

    // Mover el <li> al <ul> con la clase 'list--done'
    document.querySelector(".list--done").appendChild(listItem);

    var totalElement = document.querySelector(".box-done__total");

    // Obtener el número actual y convertirlo a entero
    var currentNumber = parseInt(totalElement.innerText);

    // Sumarle uno al número actual
    var newNumber = currentNumber + 1;

    // Actualizar el contenido del elemento span con el nuevo número
    totalElement.innerText = newNumber;
  }

  function removeDoneList(button) {
    button.classList.remove("checked");
    // Obtener el <li> padre del botón clickeado
    var listItem = button.closest(".list__li");

    // Mover el <li> al <ul> con la clase 'list--done'
    document.querySelector(".list").appendChild(listItem);

    var totalElement = document.querySelector(".box-done__total");

    // Obtener el número actual y convertirlo a entero
    var currentNumber = parseInt(totalElement.innerText);

    // Sumarle uno al número actual
    var newNumber = currentNumber - 1;

    // Actualizar el contenido del elemento span con el nuevo número
    totalElement.innerText = newNumber;
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

    const textareaElement = document.createElement("textarea");
    textareaElement.name = "text";
    textareaElement.className = "form-edit__text";
    textareaElement.placeholder = textoElement;
    textareaElement.value = textoElement;
    textareaElement.onkeyup = function () {
      textAreaAdjust(textareaElement);
    };

    const buttonElement = document.createElement("button");
    buttonElement.type = "submit";
    buttonElement.className = "form-edit__save";
    buttonElement.onclick = function () {
      editText(buttonElement);
    };

    const spanElement = document.createElement("span");
    spanElement.className = "form-edit__save__text";
    spanElement.textContent = "Guardar";

    // Construir la estructura
    buttonElement.appendChild(spanElement);
    formElement.appendChild(textareaElement);
    // textareaElement.focus();
    formElement.appendChild(buttonElement);
    textElement.appendChild(formElement);
    textElement.querySelector(".form-edit__text").focus();
    textAreaAdjust(textElement.querySelector(".form-edit__text"));
  }

  function editText(button) {
    // Obtener el id del item padre
    const id =
      button.parentNode.parentNode.parentNode.parentNode.getAttribute(
        "data-id"
      );
    const elemento = button.parentNode;
    const textEdit =
      elemento.parentNode.querySelector(".form-edit__text").value;
    elemento.parentNode.textContent = textEdit;

    // Obtener el item del local storage por el id
    const item = getItemById(id);

    // Texto editado del item
    item.title = textEdit;

    // Guardar el item actualizado en el local storage
    saveItem(item);
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
  function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = 25 + element.scrollHeight + "px";
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  function CreateItem({
    text = "default",
    checked = false,
    favorite = false,
    itemDate = "defalut",
    itemId = "default",
  }) {
    var dropdownController = new DropdownController();
    // Crear la estructura de elementos utilizando JavaScript
    const listContainer = document.querySelector(".list");

    const listItem = document.createElement("li");
    listItem.classList.add("list__li");

    itemDate = Date.now();
    itemId = generateId();

    listItem.setAttribute("data-date", itemDate);
    listItem.setAttribute("data-id", itemId);

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item");

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", "Done item");
    button.classList.add("item__icon");
    button.onclick = function () {
      onclickDoneList(button);
    };

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
    // spanEdit.textContent = "Editar";

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
    // spanRemove.textContent = "Eliminar";
    // Agregar función al botón de eliminación
    buttonRemove.onclick = function () {
      removeItem(buttonRemove);
    };

    const buttonFavorite = document.createElement("button");
    buttonFavorite.setAttribute("type", "button");
    buttonFavorite.setAttribute("aria-label", "Favorite item");
    buttonFavorite.classList.add("action__favorite");

    buttonFavorite.onclick = function () {
      onclickFavorite(button);
    };

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

    buttonRemove.appendChild(spanRemove);
    divDropdown.appendChild(buttonRemove);
    buttonEdit.appendChild(spanEdit);
    divDropdown.appendChild(buttonEdit);
    divActions.appendChild(buttonFavorite);
    divActions.appendChild(buttonEdit);
    divActions.appendChild(buttonRemove);
    divActions.appendChild(buttonToggle);
    divActions.appendChild(divDropdown);
    itemContainer.appendChild(button);
    itemContainer.appendChild(spanText);
    itemContainer.appendChild(divActions);
    listItem.appendChild(itemContainer);
    listContainer.insertBefore(listItem, listContainer.firstChild);

    //orderList();
    limpiarValorInput();

    // Guardar los datos en el Local Storage
    const itemData = {
      title: text,
      id: itemId,
      date: itemDate,
      checked: checked,
      favorite: favorite,
    };
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(itemData);
    localStorage.setItem("items", JSON.stringify(items));
  }

  function checkLocalStorageAndCreateContent() {
    var dropdownController = new DropdownController();
    const items = JSON.parse(localStorage.getItem("items")) || [];

    if (items.length > 0) {
      // Ordenar por favorite (favoritos primero) y luego por date
      items.sort(function (a, b) {
        // Ordenar por favorite (favoritos primero)
        if (a.favorite && !b.favorite) {
          return -1;
        } else if (!a.favorite && b.favorite) {
          return 1;
        }

        // Si los favoritos son iguales o ambos no son favoritos, ordenar por date
        return b.date - a.date;
      });
      const listContainer = document.querySelector(".list");
      const doneListContainer = document.querySelector(".list--done");

      items.forEach(function (item) {
        const listItem = document.createElement("li");
        listItem.classList.add("list__li");
        item.favorite ? listItem.classList.add("favorited") : null;

        listItem.setAttribute("data-date", item.date);
        listItem.setAttribute("data-id", item.id);

        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item");

        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("aria-label", "Done item");
        button.classList.add("item__icon");
        item.checked ? button.classList.add("checked") : null;

        button.onclick = function () {
          onclickDoneList(button);
        };

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
        spanText.textContent = item.title;

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
        // spanEdit.textContent = "Editar";

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
        // spanRemove.textContent = "Eliminar";
        // Agregar función al botón de eliminación
        buttonRemove.onclick = function () {
          removeItem(buttonRemove);
        };

        const buttonFavorite = document.createElement("button");
        buttonFavorite.setAttribute("type", "button");
        buttonFavorite.setAttribute("aria-label", "Favorite item");
        buttonFavorite.classList.add("action__favorite");
        buttonFavorite.onclick = function () {
          onclickFavorite(button);
        };

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

        buttonRemove.appendChild(spanRemove);
        divDropdown.appendChild(buttonRemove);
        buttonEdit.appendChild(spanEdit);
        divDropdown.appendChild(buttonEdit);
        divActions.appendChild(buttonFavorite);
        divActions.appendChild(buttonEdit);
        divActions.appendChild(buttonRemove);
        divActions.appendChild(buttonRemove);
        divActions.appendChild(buttonToggle);
        divActions.appendChild(divDropdown);
        itemContainer.appendChild(button);
        itemContainer.appendChild(spanText);
        itemContainer.appendChild(divActions);
        listItem.appendChild(itemContainer);

        if (item.checked) {
          doneListContainer.appendChild(listItem);
        } else {
          listContainer.appendChild(listItem);
        }
      });
      counterDoneList();
    }
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
