const add_btn = document.querySelector(".add-btn");
const innerText = document.querySelector('.inputArea');

add_btn.addEventListener("click", addButton);

function addButton() {
    const todo_list = document.querySelector('.todo-list');
    
    if(innerText.value === "") {
        return alert("You have to Write a Task");
    }

    // Only remove the message if we have a valid input
    const existingMessage = todo_list.querySelector('p');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const newElement = document.createElement("li");
    newElement.setAttribute('class', 'todo-item');
    newElement.innerHTML = `
                <div>
                    <input type="checkbox">
                    <span>${innerText.value}</span>
                </div>
                <div class="update-btn">
                    <button class="edit-btn" onclick="editButton(event)">Edit</button>
                    <button class="dlt-btn" onclick="DeleteElement(event)">Delete</button>
                </div>`; 
    todo_list.appendChild(newElement);
    innerText.value = "";
}

function DeleteElement(event) {
    const todoItem = event.target.closest('.todo-item');
    const todo_list = document.querySelector('.todo-list');
    
    if (todoItem) {
        todoItem.remove();
        
        // Check if there are any remaining todo items
        const remainingTasks = todo_list.querySelectorAll('.todo-item');
        if (remainingTasks.length === 0) {
            // If no tasks remain, add back the message
            const message = document.createElement('p');
            message.style.textAlign = 'center';
            message.style.color = '#666';
            message.textContent = 'Add a task to get started!';
            todo_list.appendChild(message);
        }
    }
}

function editButton(event) {
    const todoItem = event.target.closest('.todo-item');
    const span = todoItem.querySelector('span');
    const currentText = span.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = "350px";
    input.style.padding = "8px";
    
    span.replaceWith(input);
    
    const editBtn = todoItem.querySelector('.edit-btn');
    editBtn.textContent = 'Save';
    
    editBtn.removeEventListener('click', editButton);
    editBtn.addEventListener('click', () => {
        const newSpan = document.createElement('span');
        newSpan.textContent = input.value;
        input.replaceWith(newSpan);
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editButton);
    });
}

document.querySelector('.todo-list').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        const todoItem = event.target.closest('.todo-item');
        if (event.target.checked) {
            todoItem.classList.add('completed');
        } else {
            todoItem.classList.remove('completed');
        }
    }
});