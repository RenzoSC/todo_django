
var date = moment();
renderCalendar(date);
    
function renderCalendar(date){
    let listOfMonths = ['January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];
    let selectedDate = date;
    let cells = generateDates(date);
    let body_calendar = document.getElementById('cal-body-content');
    let templateCells = '';

    let x=0;
    for(let i=0; i<5; i++){
        templateCells += `<div class="row justify-content-between">`;
        for(let j=0; j <7; j++){
            if(cells[x].date.date()== moment().get('date') && cells[x].isInCurrentMonth){
                selectedDate = cells[x].date;
                templateCells += `<div class="col-1" >${cells[x].date.date()}</div>`;
            }else{
                if(cells[x].isInCurrentMonth){
                    templateCells += `<div class="col-1 day-selectable">${cells[x].date.date()}</div>`;
                }else{
                    templateCells += `<div class="col-1 day-no-selectable">${cells[x].date.date()}</div>`;
                }
            }
            x++;
        }
        templateCells += `</div>`;
    }
    body_calendar.innerHTML = templateCells;
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
