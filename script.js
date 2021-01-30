let start = document.getElementById('start');

let maxDayItem = document.getElementsByClassName('maxDay-item')[0],
    factDayItem = document.getElementsByClassName('factDay-item')[0],
    percentItem = document.getElementsByClassName('allPercent-item')[0];
    errorsItem = document.getElementsByClassName('error-item')[0];

let okladValue = document.getElementsByClassName('oklad-value')[0],
    factOkladValue = document.getElementsByClassName('factOklad-value')[0],
    premiaValue = document.getElementsByClassName('premia-value')[0],
    factPremiaValue = document.getElementsByClassName('factPremia-value')[0],
    daySumValue = document.getElementsByClassName('daySum-value')[0],
    plataValue = document.getElementsByClassName('plata-value')[0];
    allPlataValue = document.getElementsByClassName('allPlata-value')[0];

let appData = {
    maxDay: 0,
    factDay: 0,
    percent: 0,
    errors: 0,
    dayPercent: 0,
    allOklad: function(){
        return +((appData.factDay / appData.maxDay) * 22000).toFixed(2);
    },
    allPremia: function(){
        return +(appData.dayPercent * appData.factDay).toFixed(2);
    }
    };

start.addEventListener('click', function () {

    appData.maxDay = maxDayItem.value;
    appData.factDay = factDayItem.value;
    appData.percent = percentItem.value;
    appData.errors = errorsItem.value;

    let myPercent = (appData.percent / appData.factDay);

    if (myPercent >= 60 && myPercent < 70) {
        appData.dayPercent = myPercent * 6;
    } else if (myPercent >= 70 && myPercent < 80) {
        appData.dayPercent = myPercent * 7;
    } else if (myPercent >= 80 && myPercent < 90) {
        appData.dayPercent = myPercent * 8;
    } else if (myPercent >= 90 && myPercent < 10) {
        appData.dayPercent = myPercent * 10;
    } else if (myPercent >= 100 && myPercent < 110) {
        appData.dayPercent = myPercent * 12;
    } else if (myPercent >= 110) {
        appData.dayPercent = myPercent * 14;
    } else {
        appData.dayPercent = 0;
    };

    okladValue.textContent = appData.allOklad();
    factOkladValue.textContent = (appData.allOklad()*0.87).toFixed(2);
    premiaValue.textContent = appData.allPremia();
    factPremiaValue.textContent = +(appData.allPremia()* 0.87).toFixed(2) - appData.errors*250;

    let sumPlata = appData.allOklad() + appData.allPremia();
    allPlataValue.textContent = sumPlata;
    let plata = (sumPlata*0.87 - appData.errors*250).toFixed(2);
    plataValue.textContent = plata;
    daySumValue.textContent = (plata / appData.factDay).toFixed(2);

});