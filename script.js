let start = document.getElementById('start');
let prognoz = document.getElementById('prognoz');

let factDayItem = document.getElementsByClassName('factDay-item')[0],
    percentItem = document.getElementsByClassName('allPercent-item')[0];
    errorsItem = document.getElementsByClassName('error-item')[0];

let okladValue = document.getElementsByClassName('oklad-value')[0],
    factOkladValue = document.getElementsByClassName('factOklad-value')[0],
    premiaValue = document.getElementsByClassName('premia-value')[0],
    factPremiaValue = document.getElementsByClassName('factPremia-value')[0],
    daySumValue = document.getElementsByClassName('daySum-value')[0],
    plataValue = document.getElementsByClassName('plata-value')[0];
    allPlataValue = document.getElementsByClassName('allPlata-value')[0],
    dayValue = document.getElementsByClassName('day-value')[0];

let wantPercentItem = document.getElementsByClassName('wantPercent-item')[0],
    minusDayItem = document.getElementsByClassName('minusDay-item')[0];

let wantPercentValue = document.getElementsByClassName('wantPercent-value')[1], 
    wantPercentLostValue = document.getElementsByClassName('wantPercentLost-value')[1];

let appData = {
    maxDay: 0,
    factDay: 0,
    percent: 0,
    errors: 0,
    dayPercent: 0,
    wantPercent: 0,
    allOklad: function(){
        return +((appData.factDay / appData.maxDay) * 22000).toFixed(2);
    },
    allPremia: function(){
        return +(appData.dayPercent * appData.factDay).toFixed(2);
    },
    getDayPercent: function(percent, factDay){
        let myPercent = (appData.percent / appData.factDay);

        if (myPercent >= 60 && myPercent < 70) {
            appData.dayPercent = myPercent * 6;
        } else if (myPercent >= 70 && myPercent < 80) {
            appData.dayPercent = myPercent * 7;
        } else if (myPercent >= 80 && myPercent < 90) {
            appData.dayPercent = myPercent * 8;
        } else if (myPercent >= 90 && myPercent < 100) {
            appData.dayPercent = myPercent * 10;
        } else if (myPercent >= 100 && myPercent < 110) {
            appData.dayPercent = myPercent * 12;
        } else if (myPercent >= 110) {
            appData.dayPercent = myPercent * 14;
        } else {
            appData.dayPercent = 0;
        };
        },
    getMaxDay: function(){
        let checks = document.getElementsByName('maxDay-item');
    if(checks[0].checked){
        appData.maxDay = 14;
    }else if(checks[2].checked){
        appData.maxDay = 16;
    }else{
        appData.maxDay = 15;
    };
    }
    };

start.addEventListener('click', function () {
    
    appData.getMaxDay();
    appData.factDay = factDayItem.value;
    appData.percent = percentItem.value;
    appData.errors = errorsItem.value;
    appData.getDayPercent(appData.percent,appData.factDay);

    okladValue.textContent = appData.allOklad();
    factOkladValue.textContent = (appData.allOklad()*0.87).toFixed(2);
    premiaValue.textContent = appData.allPremia();
    factPremiaValue.textContent = +((appData.allPremia()* 0.87) - appData.errors*250).toFixed(2);

    let sumPlata = (appData.allOklad() + appData.allPremia()).toFixed(2);
    allPlataValue.textContent = sumPlata;
    let plata = +(sumPlata*0.87 - appData.errors*250).toFixed(2);
    plataValue.textContent = plata;
    daySumValue.textContent = (sumPlata*0.87 / appData.factDay).toFixed(2);
    dayValue.textContent = (appData.percent/appData.factDay).toFixed(2);

});

prognoz.addEventListener('click', function(){
    appData.wantPercent = wantPercentItem.value;
    let minusDayOne = minusDayItem.value;
    
    if(appData.percent != 0){
        appData.percent = percentItem.value;
    }else{
        alert('Выполните предыдущие расчеты');
    }
    appData.getMaxDay();
    let minusDayTwo = appData.maxDay - appData.factDay;    

    wantPercentValue.textContent = ((appData.wantPercent*(appData.maxDay-minusDayOne) - appData.percent)/(minusDayTwo - minusDayOne)).toFixed(2);
    wantPercentLostValue.textContent = (appData.wantPercent*(+appData.factDay + 1) - appData.percent);
});