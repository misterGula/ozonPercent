
'use strict';

//Tabs
let tab = document.querySelectorAll('.menu-tabs'),
    menu = document.querySelector('.menu'),
    tabContent = document.querySelectorAll('.tabcontent');

function hideTabContent(a) {
    for (let i = a; i < tab.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
    };
};
hideTabContent(1);

function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
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

function getMaxDay(a,b) {
    let checks = document.getElementsByName('maxDay-item');
    if (checks[a].checked) {
        appData.maxDay = 14;
    } else if (checks[b].checked) {
        appData.maxDay = 16;
    } else {
        appData.maxDay = 15;
    };
}


// application input value

let start = document.getElementById('start'),
    factDay = document.getElementsByClassName('factDay-item'),
    allPercent = document.querySelector('.allPercent-item'),
    errors = document.querySelector('.error-item');

let prognozWage = document.getElementById('prognozWage'),
    wantPercent = document.querySelector('.wantPercent-item');


// application output value

let wageValue = document.getElementsByClassName('wage-value'),
    factWageValue = document.getElementsByClassName('factWage-value'),
    bonusValue = document.getElementsByClassName('bonus-value'),
    factBonusValue = document.getElementsByClassName('factBonus-value'),
    dayWage = document.getElementsByClassName('dayWage-value'),
    allWage = document.getElementsByClassName('allWage-value'),
    factWage = document.getElementsByClassName('factWages-value'),
    middlePercent = document.getElementsByClassName('middlePercent-value');



// application work

start.addEventListener('click', function () {

    getMaxDay(0,2);
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

});

prognozWage.addEventListener('click', function () {

    appData.wantPercent = wantPercent.value;
    getMaxDay(3,5);
    appData.factDay = factDay[1].value;
    if(appData.factDay == ''){appData.factDay = 15 };

    let a = +(appData.monthWage * (appData.factDay / appData.maxDay)).toFixed(2);
    wageValue[1].textContent = a;
    factWageValue[1].textContent = calcTaxDeduction(a);
    let x = appData.wantPercent*appData.factDay;
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



