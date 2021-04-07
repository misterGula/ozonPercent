    
    
window.addEventListener('load', function() {   
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
        monthWage: 22000,
        maxDay: 0,
        getMaxDay: function () {
            let checks = document.getElementsByName('maxDay-item');            
            if (checks[0].checked) {
                appData.maxDay = 14;             
            } else if (checks[2].checked) {
                appData.maxDay = 16;
            } else {
                appData.maxDay = 15;
            };
        },
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


    // application input value

    let start = document.getElementById('start'),
        factDay = document.querySelector('.factDay-item'),
        allPercent = document.querySelector('.allPercent-item'),
        errors = document.querySelector('.error-item');


    // application output value

    let wageValue = document.querySelector('.wage-value'),
        factWageValue = document.querySelector('.factWage-value'),
        bonusValue = document.querySelector('.bonus-value'),
        factBonusValue = document.querySelector('.factBonus-value'),
        dayWage = document.querySelector('.dayWage-value'),
        allWage = document.querySelector('.allWage-value'),
        factWage = document.querySelector('.factWages-value'),
        middlePercent = document.querySelector('.middlePercent-value');


    // application work

    start.addEventListener('click', function () {

        appData.getMaxDay();
        appData.factDay = factDay.value;
        appData.allPercent = allPercent.value;
        appData.errors = errors.value;

        let a = +(appData.monthWage * (appData.factDay / appData.maxDay)).toFixed(2);
        wageValue.textContent = a;
        factWageValue.textContent = calcTaxDeduction(a);
        let b = +(appData.calcDayBonus(appData.allPercent, appData.factDay) * appData.factDay);
        bonusValue.textContent = b;
        factBonusValue.textContent = calcTaxDeduction(b);
        allWage.textContent = a + b;
        middlePercent.textContent = (appData.allPercent / appData.factDay).toFixed(2);
        let daySum = (a + b) / appData.factDay;
        dayWage.textContent = calcTaxDeduction(daySum);
        let d = (daySum * appData.factDay) - appData.errors * 250;
        factWage.textContent = calcTaxDeduction(d);

    });

    

}); 