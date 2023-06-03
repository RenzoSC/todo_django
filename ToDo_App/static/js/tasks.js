function create_task(){
    let form = document.getElementById("task_form");
    form.style.display = "block";
    let tasks = document.getElementById("tasks_items");
    tasks.style.display = "none";
    let btn_task = document.getElementById("btn_task");
    btn_task.style.display = "none";
}

function end_form(){
    let form = document.getElementById("task_form");
    form.style.display = "none";
    let btn_task = document.getElementById("btn_task");
    btn_task.style.display = "flex";
    let tasks = document.getElementById("tasks_items");
    tasks.style.display = "block";
}