let todos = JSON.parse(localStorage.getItem("todos")) || [];

    function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
      const list = document.getElementById("todo-list");
      const count = document.getElementById("count");
      list.innerHTML = "";

      todos.forEach((todo, index) => {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
        textSpan.textContent = todo;

        // ❌ Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => {
          todos.splice(index, 1);
          saveTodos();
          renderTodos();
        };

        // ✏ Edit Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏";
        editBtn.onclick = () => {
          const newText = prompt("Edit your task:", todo);
          if (newText && newText.trim() !== "") {
            todos[index] = newText.trim();
            saveTodos();
            renderTodos();
          }
        };

        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
      });

      count.textContent =`${todos.length} item${todos.length !== 1 ? "s" : ""};`
    }

    function addTodo() {
      const input = document.getElementById("todo-input");
      const newTodo = input.value.trim();
      if (newTodo !== "") {
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        input.value = "";
      }
    }

    // Page load par todos dikhane ke liye
    renderTodos();