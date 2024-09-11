document.addEventListener("DOMContentLoaded", function() {
    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "12345") {
                window.location.href = "main.html"; 
            } else {
                alert("Invalid credentials. Please try again.");
            }
        });
    }
      
            let completedCount = 0; 
        
            const completedTasksCount = document.createElement('div');
            completedTasksCount.id = 'completedTasksCount';
            document.querySelector('.container').appendChild(completedTasksCount);
        
            function updateAlertMessage(count) {
                if (count > 0) {
                    return `Congrats. ${count} Tasks have been Successfully Completed`;
                } else {
                    return "";
                }
            }
        
            async function fetchTodos() {
                try {
                    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
                    const todos = await response.json();
                    const todoList = document.getElementById("todoList");
        
                
                    todoList.innerHTML = '';
        
                    todos.forEach(todo => {
                        const li = document.createElement("li");
                        li.className = "list-group-item";
                        li.innerHTML = `
                            <input type="checkbox" data-id="${todo.id}">
                            ${todo.title}
                        `;
                        todoList.appendChild(li);
                    });
        
                
                    completedCount = 0; 
                    completedTasksCount.textContent = `Completed Tasks: ${completedCount}`;
        
                    
                    todoList.addEventListener("change", function(event) {
                        if (event.target.type === "checkbox") {
                            const isChecked = event.target.checked;
        
                            
                            completedCount = isChecked ? completedCount + 1 : completedCount - 1;
        
                        
                            const message = updateAlertMessage(completedCount);
                            if (message) {
                                alert(message);
                            }
        
                            
                            completedTasksCount.textContent = `Completed Tasks: ${completedCount}`;
                        }
                    });
        
                    
                    const unmarkAllBtn = document.createElement('button');
                    unmarkAllBtn.textContent = 'Unmark All';
                    unmarkAllBtn.id = 'unmarkAllBtn';
                    document.querySelector('.container').appendChild(unmarkAllBtn);
        
                    unmarkAllBtn.addEventListener('click', () => {
                        const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
                        checkboxes.forEach(checkbox => {
                            if (checkbox.checked) {
                                checkbox.checked = false; 
                                completedCount--; 
                            }
                        });
        
                
                        completedTasksCount.textContent = `Completed Tasks: ${completedCount}`;
                    });
        
                } catch (error) {
                    console.error("Error fetching todos:", error);
                }
            }
        
        
            fetchTodos();
        });
        