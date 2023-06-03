
var date = moment();
renderCalendar(date);
    
function renderCalendar(date){
    // let listOfMonths = ['January', 'February', 'March', 'April', 
    // 'May', 'June', 'July', 'August', 'September', 'October',
    // 'November', 'December'];
    let selectedDate = date;
    let cells = generateDates(date);
    let body_calendar = document.getElementById('cal-body-content');
    let templateCells = '';

    const span = document.getElementById("date_cal");
    const month = date.format("MMM");
    const year = date.format("YYYY");
    span.textContent = `${month} ${year}`;

    let x=0;
    templateCells+=`<div class="row justify-content-between p-0 d-flex align-items-end" id="cal-body-head">
        <div class="col-1 text-center cal-day p-0">Lun</div>
        <div class="col-1 text-center cal-day p-0">Mar</div>
        <div class="col-1 text-center cal-day p-0">Mie</div>
        <div class="col-1 text-center cal-day p-0">Jue</div>
        <div class="col-1 text-center cal-day p-0">Vie</div>
        <div class="col-1 text-center cal-day p-0">Sab</div>
        <div class="col-1 text-center cal-day p-0">Dom</div>
    </div>`;
    for(let i=0; i<5; i++){
        templateCells += `<div class="row justify-content-between align-items-center text-center p-0">`;
        for(let j=0; j <7; j++){
            if(cells[x].date.date()== moment().get('date') && cells[x].isInCurrentMonth){
                selectedDate = cells[x].date;
                templateCells += `<div class="col-1 cal-day d-flex justify-content-center align-items-center day-selectable select " data-cell-id="${x}">${cells[x].date.date()}</div>`;
            }else{
                if(cells[x].isInCurrentMonth){
                    templateCells += `<div class="col-1 cal-day d-flex justify-content-center align-items-center day-selectable "data-cell-id="${x}">${cells[x].date.date()}</div>`;
                }else{
                    templateCells += `<div class="col-1 cal-day d-flex justify-content-center align-items-center day-no-selectable "data-cell-id="${x}">${cells[x].date.date()}</div>`;
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
            
            selectedDate = cells[parseInt(target_cell.dataset.cellId)].date; //cambio el selectedDate
            
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