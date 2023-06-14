function create_task(){
    let form = document.getElementById("task_form");
    form.style.display = "block";
    let tasks = document.getElementById("tasks_items");
    tasks.style.display = "none";
    let btn_task = document.getElementById("btn_task");
    btn_task.style.display = "none";
    let datepicker = document.querySelector(".datepicker");
    let date = document.querySelector(".select");
    datepicker.value = date.dataset.date;
}

function end_form(event){
    event.preventDefault()
    // Obtener los valores de los campos de entrada
    let title = document.getElementById("id_title").value;
    let description = document.getElementById("id_description").value;
    let f_date = document.getElementById("id_f_date").value;

    if(!(title.trim() === "")){
        $.ajax({
            url:'/',
            type:'POST',
            data:{
                csrfmiddlewaretoken: csrfToken,
                title : title,
                description : description,
                f_date: f_date,
            },
            success: function(response) {
                // Actualizar la sección de tareas en tu página con las tareas obtenidas
                var tasksContainer = $('#tasks_items');
    
                // Vaciar el contenedor antes de agregar las nuevas tareas
                tasksContainer.empty();
    
                // Iterar sobre las tareas filtradas y crear los divs correspondientes
                if(response.filtered_tasks.length >=1){
                    for (var i = 0; i < response.filtered_tasks.length; i++) {
                        var task = response.filtered_tasks[i];
                        let taskDiv = $(`<div class="task-item row my-3 p-3 overflow-auto justify-content-between" id="task-item-`+task.id+`"></div>`);
                        let division1 = task.done? $('<div class="col-1 flex-grow-1 checked" ></div>'):$('<div class="col-1 flex-grow-1" ></div>') ;
                        var taskTitle = $('<h3>' + task.title + '</h3>');
                        let description = $('<p>' + task.description +'</p>');
                        
                        // Agregar el título al div de la tarea
                        division1.append(taskTitle);
                        division1.append(description);
                        // Agregar el div de la tarea al contenedor
                        taskDiv.append(division1);
    
                        let division2 = $(`<div class="col-1 task-btn-check p-1 d-flex align-items-center justify-content-between flex-column" data-taskid="`+task.id+`"></div>`);
                        if(!task.done){
                            division2.append($(`<div class="complete-task-btn-container" data-taskid="`+task.id+`">
                            <label class="complete-task-btn">
                            <input type="checkbox" onclick="check(event)">
                            <span class="checkmark"></span>
                            </label>
                            </div>
                            <button class="eliminate p-0" onclick="eliminate_task(event)">🗑️</button>`));
                        }else{
                            division2.append($(`<div class="complete-task-btn-container" data-taskid="`+task.id+`">
                            <label class="complete-task-btn">
                            <input type="checkbox" checked="checked" onclick="check(event)">
                            <span class="checkmark"></span>
                            </label>
                            </div>
                            <button class="eliminate p-0" onclick="eliminate_task(event)">🗑️</button>`));
                        }
                        
                        taskDiv.append(division2);
                        tasksContainer.append(taskDiv);
                        
                    }
                }else{
                    var no_task = $('<h1>No tasks this day!</h1>')
                    tasksContainer.append(no_task);
                }
                
                
              },
            error: function(xhr, status, error) {
                console.log('Error en la solicitud AJAX:', error);
            }
        })
    }

    let form = document.getElementById("task_form");
    form.reset();
    form.style.display = "none";
    let btn_task = document.getElementById("btn_task");
    btn_task.style.display = "flex";
    let tasks = document.getElementById("tasks_items");
    tasks.style.display = "block";
    let date = document.querySelector(".select");
}