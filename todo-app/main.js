const todoInput = document.querySelector("#todo-input");
const todoContainer = document.querySelector("#todo-container");

todoContainer.addEventListener("click", (event) => {
  const target = event.target;

  // add a checkmark on complete
  if (target.classList.contains("checkbox")) {
    if (target.hasAttribute("checked")) {
      target.src = "assets/checkbox.svg";
      target.nextSibling.nextSibling.setAttribute("contenteditable", "true");
      target.removeAttribute("checked");
    } else {
      target.src = "assets/checkbox-checked.svg";
      target.setAttribute("checked", "");
      target.nextSibling.nextSibling.removeAttribute("contenteditable");
    }
  }

  // delete a todo
  if (target.classList.contains("delete")) {
    const todoElement = target.closest(".todo");
    if (!todoElement) return;

    todoElement.classList.add("removing");

    setTimeout(() => {
      console.log("re");
      todoElement.remove();
      updateTodoCount();
    }, 600);
  }
});

const createTodoElement = (todo) => {
  const elementHTML = `
      <div class="todo__element">
        <div>
          <img
            src="assets/checkbox.svg"
            alt="checkbox"
            class="checkbox"
          />
          <p class="todo__title" spellcheck="false" contenteditable="true" >${todo}</p>
        </div>
            <img src="assets/delete.svg" alt="delete" class="delete" />
      </div>
      <hr />
  `;

  const element = document.createElement("div");
  element.classList.add("todo");
  element.innerHTML = elementHTML;
  return element;
};

const addTodo = (event) => {
  const todo = event.target.value.trim();
  if (!todo) return;

  const todoElement = createTodoElement(todo);
  if (todoContainer.firstChild)
    todoContainer.insertBefore(todoElement, todoContainer.firstChild);
  else todoContainer.appendChild(todoElement);

  updateTodoCount();

  event.target.value = "";
};

const updateTodoCount = () => {
  const todoCount = document.querySelectorAll(".todo").length;
  const todoHeading = document.querySelector(".todo__heading > span");
  todoHeading.textContent = String(todoCount).padStart(2, "0");
};

todoInput.addEventListener("change", addTodo);
