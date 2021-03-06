
'use strict';

//Tabs
const tab = document.querySelectorAll('.menu-tabs'),
    menu = document.querySelector('.menu'),
    tabContent = document.querySelectorAll('.tabcontent');

function hideTabContent(a) {
    for (let i = a; i < tab.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].style.backgroundColor = 'rgba(1, 0, 42, .5)';
    };
};
hideTabContent(1);


function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
        tab[b].style.backgroundColor = 'rgba(3, 0, 177, 0.5)';
    };
};

menu.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('menu-tabs')) {
        for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
            }

        }
    }
});

// application data

let appData = {
    factDay: 0,
    errors: 0,
    allPercent: 0,
    wantPercent: 0,
    monthWage: 22000,
    maxDay: 0,
    everyDayPercent: 0,
    calcDayBonus: function (allPercent, factDay) {
        let everyDayPercent = allPercent / factDay;
        let dayBonus;

        if (everyDayPercent >= 60 && everyDayPercent < 70) {
            dayBonus = everyDayPercent * 6;
        } else if (everyDayPercent >= 70 && everyDayPercent < 80) {
            dayBonus = everyDayPercent * 7;
        } else if (everyDayPercent >= 80 && everyDayPercent < 90) {
            dayBonus = everyDayPercent * 8;
        } else if (everyDayPercent >= 90 && everyDayPercent < 100) {
            dayBonus = everyDayPercent * 10;
        } else if (everyDayPercent >= 100 && everyDayPercent < 110) {
            dayBonus = everyDayPercent * 12;
        } else if (everyDayPercent >= 110) {
            dayBonus = everyDayPercent * 14;
        } else {
            dayBonus = 0;
        }
        return dayBonus;
    }
};

function calcTaxDeduction(value) {
    return Number((value * 0.87).toFixed(2));
}

function getMaxDay(a, b) {
    let checks = document.getElementsByName('maxDay-item');
    if (checks[a].checked) {
        appData.maxDay = 14;
    } else if (checks[b].checked) {
        appData.maxDay = 16;
    } else {
        appData.maxDay = 15;
    };
}

let monthArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


// application input value

const start = document.getElementById('start'),
      factDay = document.querySelectorAll('.factDay-item'),
      allPercent = document.querySelector('.allPercent-item'),
      errors = document.querySelector('.error-item');

const prognozWage = document.getElementById('prognozWage'),
      prognozPercent = document.getElementById('prognozPercent'),
      wantPercent = document.querySelectorAll('.wantPercent-item'),
      trueMiddlePercent = document.querySelector('.middlePercent-item');


// application output value

let wageValue = document.querySelectorAll('.wage-value'),
    factWageValue = document.querySelectorAll('.factWage-value'),
    bonusValue = document.querySelectorAll('.bonus-value'),
    factBonusValue = document.querySelectorAll('.factBonus-value'),
    dayWage = document.querySelectorAll('.dayWage-value'),
    allWage = document.querySelectorAll('.allWage-value'),
    factWage = document.querySelectorAll('.factWages-value'),
    middlePercent = document.querySelectorAll('.middlePercent-value'),
    lostPercent = document.querySelector('.lostPercent-value');


// application work

start.addEventListener('click', function () {

    getMaxDay(0, 2);
    appData.factDay = factDay[0].value;
    appData.allPercent = allPercent.value;
    appData.errors = errors.value;

    let a = +(appData.monthWage * (appData.factDay / appData.maxDay)).toFixed(2);
    wageValue[0].textContent = a;
    factWageValue[0].textContent = calcTaxDeduction(a);
    let b = +(appData.calcDayBonus(appData.allPercent, appData.factDay) * appData.factDay);
    bonusValue[0].textContent = b;
    factBonusValue[0].textContent = calcTaxDeduction(b);
    allWage[0].textContent = a + b;
    middlePercent[0].textContent = (appData.allPercent / appData.factDay).toFixed(2);
    let daySum = (a + b) / appData.factDay;
    dayWage[0].textContent = calcTaxDeduction(daySum);
    let d = (daySum * appData.factDay) - appData.errors * 250;
    factWage[0].textContent = calcTaxDeduction(d);
    debugger

});

prognozWage.addEventListener('click', function () {

    appData.wantPercent = wantPercent[0].value;
    getMaxDay(3, 5);
    appData.factDay = factDay[1].value;
    if (appData.factDay == '') { appData.factDay = 15 };

    let a = +(appData.monthWage * (appData.factDay / appData.maxDay)).toFixed(2);
    wageValue[1].textContent = a;
    factWageValue[1].textContent = calcTaxDeduction(a);
    let x = appData.wantPercent * appData.factDay;
    let b = +(appData.calcDayBonus(x, appData.factDay) * appData.factDay);
    bonusValue[1].textContent = b;
    factBonusValue[1].textContent = calcTaxDeduction(b);
    allWage[1].textContent = a + b;
    middlePercent[1].textContent = appData.wantPercent;
    let daySum = (a + b) / appData.factDay;
    dayWage[1].textContent = calcTaxDeduction(daySum);
    let d = (daySum * appData.factDay) - appData.errors * 250;
    factWage[1].textContent = calcTaxDeduction(d);

});

prognozPercent.addEventListener('click', function () {

    appData.factDay = factDay[2].value;
    appData.wantPercent = wantPercent[1].value;
    appData.everyDayPercent = Number(trueMiddlePercent.value);

    let lost = (appData.wantPercent - appData.everyDayPercent)*(+appData.factDay + 1);
    let lostP = appData.everyDayPercent + lost;
    if (lostP > 0) {
        lostPercent.textContent = lostP;
    } else {
        lostPercent.textContent = 'Отдыхаем!';
    }
});

let dateYear = new Date().getFullYear();
let dateMonth = new Date().getMonth();
createCalendar('calendar', dateYear, dateMonth);
createMonthGraphik(dateMonth);

// Calendar

function createCalendar(id, year, month) {
    const elem = document.getElementById(id);
    
    
    let d = new Date(year, month);

    let table = '<table id = "graph"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';


    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    while (d.getMonth() == month) {
        table += '<td>' + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) {
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);

    }

    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    table += '</tr></table>';

    elem.innerHTML = table;
}

function getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

// Graphik

function createMonthGraphik(dateMonth){
    let td = document.querySelectorAll('td');
    td.forEach(item => {

            let cell = +item.innerHTML;
            cell = cell - 1;
            if(cell >= 0){
            let x = howManyDay(0,cell,dateMonth);
                if(x % 4 == 0){
                item.classList.add('active');
                } 
            let y = howManyDay(1,cell,dateMonth);
                if(y % 4 == 0){
                item.classList.add('active');
                }
            }                     
        });
}


function howManyDay(smena,value,dateMonth) {
    const pointDateOne = new Date(2021,3,0).getTime();
    let dayOne = 1000 * 60 * 60 * 24;
    let dayOnePoint = Math.floor(pointDateOne / dayOne);  
    let now = new Date();
    let whatDay = new Date(now.getFullYear(), dateMonth ,value).getTime();
    let whatDay1 = Math.floor(whatDay / dayOne);
    if (smena == 1){
        dayOnePoint = dayOnePoint + 1;
        return (whatDay1 - dayOnePoint);
    } else{
        return (whatDay1 - dayOnePoint);
    }
 }; 

// Graphik Choise month

const prevCreateGraphik =  document.querySelector('.prev-btn'),
      nowCreateGraphik =  document.querySelector('.now-btn'),
      nextCreateGraphik =  document.querySelector('.next-btn');

prevCreateGraphik.addEventListener('click', () => {
    createCalendar('calendar', dateYear, dateMonth - 1);
    createMonthGraphik(dateMonth - 1);
 });

nowCreateGraphik.addEventListener('click', () => {
    createCalendar('calendar', dateYear, dateMonth);
    createMonthGraphik(dateMonth);
 });

nextCreateGraphik.addEventListener('click', () => {
    createCalendar('calendar', dateYear, dateMonth + 1);
    createMonthGraphik(dateMonth + 1);
 });





 
 


