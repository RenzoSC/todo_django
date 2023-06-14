
var date = moment();
renderCalendar(date);

make_petition(date.format('YYYY-MM-DD'));

function renderCalendar(date){
    // let listOfMonths = ['January', 'February', 'March', 'April', 
    // 'May', 'June', 'July', 'August', 'September', 'October',
    // 'November', 'December'];
    let selectedDate = date.format('YYYY-MM-DD');
    let cells = generateDates(date);
    let body_calendar = document.getElementById('cal-body-content');
    let templateCells = '';

    const span = document.getElementById("date_cal");
    const month = date.format("MMM");
    const year = date.format("YYYY");
    span.textContent = `${month} ${year}`;

    let x=0;
    templateCells+=`<div class="row justify-content-between p-0 d-flex align-items-end" id="cal-body-head">
        <div class="col-1 text-center cal-dayw p-0">Lun</div>
        <div class="col-1 text-center cal-dayw p-0">Mar</div>
        <div class="col-1 text-center cal-dayw p-0">Mie</div>
        <div class="col-1 text-center cal-dayw p-0">Jue</div>
        <div class="col-1 text-center cal-dayw p-0">Vie</div>
        <div class="col-1 text-center cal-dayw p-0">Sab</div>
        <div class="col-1 text-center cal-dayw p-0">Dom</div>
    </div>`;
    for(let i=0; i<5; i++){
        templateCells += `<div class="row justify-content-between align-items-center text-center p-0">`;
        for(let j=0; j <7; j++){
            if(cells[x].date.date()== moment().get('date') && cells[x].isInCurrentMonth){
                selectedDate = cells[x].date.format('YYYY-MM-DD');
                templateCells += `<div class="col-1 cal-day d-flex justify-content-center align-items-center day-selectable select " data-cell-id="${x}" data-date="${cells[x].date.format('YYYY-MM-DD')}">${cells[x].date.date()}</div>`;
            }else{
                if(cells[x].isInCurrentMonth){
                    templateCells += `<div class="col-1 cal-day d-flex justify-content-center align-items-center day-selectable "data-cell-id="${x}" data-date="${cells[x].date.format('YYYY-MM-DD')}">${cells[x].date.date()}</div>`;
                }else{
                    templateCells += `<div class="col-1 cal-day d-flex justify-content-center align-items-center day-no-selectable "data-cell-id="${x}" data-date="${cells[x].date.format('YYYY-MM-DD')}">${cells[x].date.date()}</div>`;
                }
            }
            x++;
        }
        templateCells += `</div>`;
    }
    body_calendar.innerHTML = templateCells;

    /*Aca agregamos event listeners a las cells */
    let html_cells = body_calendar.querySelectorAll('.day-selectable');
    html_cells.forEach(cell =>{
        cell.addEventListener('click', e =>{
            let target_cell = e.target;
            let last_select = document.querySelector(".select");
            last_select.classList.remove("select");
            target_cell.classList.add("select");
            
            selectedDate = cells[parseInt(target_cell.dataset.cellId)].date.format('YYYY-MM-DD'); //cambio el selectedDate

            make_petition(selectedDate);

        })
    })

    /*Acá agregamos los listener a los botones de navegacion del header del cal*/

    let nav_head_btns = document.querySelectorAll(".cal-nav");
    nav_head_btns.forEach(btn=>{
        btn.addEventListener('click',handleNavButtonClick);
    });

}

function generateDates(monthToShow=moment()){
        
    if(!moment.isMoment(monthToShow)){
        return null;
    }
    let dateStart = moment(monthToShow).startOf("month");
    let dateEnd = moment(monthToShow).endOf("month");
    let cells = [];

    while(dateStart.day() !== 1){
        dateStart.subtract(1,"days");
    }  //le resta 1 hasta que el primer dia sea lunes (ult lunes del ant mes)
        
    while(dateEnd.day() !== 0){
        dateEnd.add(1,"days");
    } //suma 1 hasta que el ult dia sea domingo (primer dom del posterior mes)

    do{
        cells.push({
            date:moment(dateStart),
            isInCurrentMonth: dateStart.month() === monthToShow.month(),
        });    //cada celda va a guardar su corresp fecha y si es del mes corresp o no
        dateStart.add(1,"days");
    }while(dateStart.isSameOrBefore(dateEnd));

    return cells;
}

function handleNavButtonClick(e) {
    let target_btn = e.target;

    if (target_btn.id == "prev-btn") {
      date.subtract(1, "months");
    } else {
      date.add(1, "months");
    }
    renderCalendar(date);
  }

function make_petition(selectedDate){
    $.ajax({
        url:'/',
        type:'POST',
        data:{
            f_date:selectedDate,
            csrfmiddlewaretoken: csrfToken,
            read_task: true,
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

function addClickEventToButtons() {
    $('.complete-task-btn-container').off('click'); // Remover eventos de clic anteriores
    $('.complete-task-btn-container').on('click', check); // Agregar eventos de clic a los nuevos botones
}


function check(event){
    event.stopPropagation(); // Detener la propagación del evento
    let target = event.currentTarget;
    var taskId = target.parentNode.parentNode.dataset.taskid;  
    $.ajax({
        url: '/',
        type: 'POST',
        data: {
            task_id: taskId,
            csrfmiddlewaretoken: csrfToken,
            checked: true,
        },
        success: function(response) {
            // Actualizar la visualización de la tarea en la página si es necesario
            let x = 'task-item-' + response.task_id;
            let taskitem = document.querySelector('#' + x + ' > div:first-child');
            if(taskitem.classList.contains('checked')){
                taskitem.classList.remove('checked');
            }else{
                taskitem.classList.add('checked');
            }
        },
        error: function(xhr, status, error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
}

function eliminate_task(event){
    event.stopPropagation();
    let target = event.currentTarget;
    var taskId = target.parentNode.dataset.taskid; 
    $.ajax({
        url: '/',
        type: 'POST',
        data: {
            task_id: taskId,
            csrfmiddlewaretoken: csrfToken,
            delete: true,
        },
        success: function(response) {
            // Actualizar la visualización de la tarea en la página si es necesario
            let x = 'task-item-' + response.task_id;
            let taskitem = document.getElementById(x);
            if(taskitem){
                taskitem.remove();
            }
            let task_item_container = $('#tasks_items');
            if (task_item_container.children().length === 0) {
                var no_task = $('<h1>No tasks this day!</h1>')
                task_item_container.append(no_task)
            }
        },
        error: function(xhr, status, error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
}