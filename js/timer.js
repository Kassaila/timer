function timer(setProp) {
    // Output elements for Timer data | Элементы вывода данных таймера
    let timer = document.getElementById(setProp.idTimer),
      secSpan = timer.querySelector('.seconds'),
      minSpan = timer.querySelector('.minutes'),
      hourSpan = timer.querySelector('.hours'),
      daySpan = timer.querySelector('.days'),
      msgSpan = timer.querySelector('.timer_message');
    // Init current date | Инициализация текущей даты
    let curDate = () => new Date,
      curTime = () => curDate().getTime(),
      diffTime = () => Math.floor((setTime() - curTime()) / 1000),
      sec = () => diffTime() % 60,
      min = () => (diffTime() - sec()) / 60 % 60,
      hour = () => ((diffTime() - sec()) / 60 - min()) / 60 % 24,
      day = () => Math.floor(((diffTime() - sec()) / 60 - min()) / 60 / 24)
    // Init callback | Определение callback
    let timerCallback = () => {
        if (timerCallback.count === true && setProp.timerCallback !== undefined) {
          timerCallback.count = false;
          setProp.timerCallback();
        }
      }
    // Условия первого вызова callback
    timerCallback.count = true;
    // Default options | Настройки поумолчанию
    setProp.setDeadLine.startDate = setProp.setDeadLine.startDate !== undefined && Array.isArray(setProp.setDeadLine.startDate) === true ? setProp.setDeadLine.startDate : undefined;
    setProp.setDeadLine.endDate = setProp.setDeadLine.endDate !== undefined && Array.isArray(setProp.setDeadLine.endDate) === true ? setProp.setDeadLine.endDate : undefined;
    
    let deadLine = {
      turnLoop: setProp.setDeadLine.turnLoop !== undefined && typeof setProp.setDeadLine.turnLoop === 'boolean' ? setProp.setDeadLine.turnLoop : false,
      loopDays: setProp.setDeadLine.loopDays !== undefined && typeof setProp.setDeadLine.loopDays === 'number' && setProp.setDeadLine.loopDays > 0 ? setProp.setDeadLine.loopDays : 1,
      pauseDays: setProp.setDeadLine.pauseDays !== undefined && typeof setProp.setDeadLine.pauseDays === 'number' && setProp.setDeadLine.pauseDays > 0 ? setProp.setDeadLine.pauseDays : 0,
      timeZone: setProp.setDeadLine.timeZone !== undefined && typeof setProp.setDeadLine.timeZone === 'number' && setProp.setDeadLine.timeZone>= -12 && setProp.setDeadLine.timeZone <= 14 ? setProp.setDeadLine.timeZone : (-1) * curDate().getTimezoneOffset()/60,
      startMin: setProp.setDeadLine.startTime !== undefined && setProp.setDeadLine.startTime[1] !== undefined && typeof setProp.setDeadLine.startTime[1] === 'number' && setProp.setDeadLine.startTime[1] >= 0 && setProp.setDeadLine.startTime[1] < 60 ? setProp.setDeadLine.startTime[1] : 0,
      startHour: setProp.setDeadLine.startTime !== undefined && setProp.setDeadLine.startTime[0] !== undefined && typeof setProp.setDeadLine.startTime[0] === 'number' && setProp.setDeadLine.startTime[0] >= 0 && setProp.setDeadLine.startTime[0] <= 24 ? setProp.setDeadLine.startTime[0] : 0,
      startDay: setProp.setDeadLine.startDate !== undefined && setProp.setDeadLine.startDate[0] !== undefined && typeof setProp.setDeadLine.startDate[0] === 'number' && setProp.setDeadLine.startDate[0] > 0 && setProp.setDeadLine.startDate[0] <= 31 ? setProp.setDeadLine.startDate[0] : curDate().getDate(),
      startMonth: setProp.setDeadLine.startDate !== undefined && setProp.setDeadLine.startDate[1] !== undefined && typeof setProp.setDeadLine.startDate[1] === 'number' && setProp.setDeadLine.startDate[1] > 0 && setProp.setDeadLine.startDate[1] <= 12 ? setProp.setDeadLine.startDate[1] - 1 : curDate().getMonth(),
      startYear: setProp.setDeadLine.startDate !== undefined && setProp.setDeadLine.startDate[2] !== undefined && typeof setProp.setDeadLine.startDate[2] === 'number' && setProp.setDeadLine.startDate[2] >= 0 ? setProp.setDeadLine.startDate[2] : curDate().getFullYear(),
      endMin: setProp.setDeadLine.endTime !== undefined && setProp.setDeadLine.endTime[1] !== undefined && typeof setProp.setDeadLine.endTime[1] === 'number' && setProp.setDeadLine.endTime[1] >= 0 && setProp.setDeadLine.endTime[1] < 60 ? setProp.setDeadLine.endTime[1] : 0,
      endHour: setProp.setDeadLine.endTime !== undefined && setProp.setDeadLine.endTime[0] !== undefined && typeof setProp.setDeadLine.endTime[0] === 'number' && setProp.setDeadLine.endTime[0] >= 0 && setProp.setDeadLine.endTime[0] <= 24 ? setProp.setDeadLine.endTime[0] : 0,
      endDay: setProp.setDeadLine.endDate !== undefined && setProp.setDeadLine.endDate[0] !== undefined && typeof setProp.setDeadLine.endDate[0] === 'number' && setProp.setDeadLine.endDate[0] > 0 && setProp.setDeadLine.endDate[0] <= 31 ? setProp.setDeadLine.endDate[0] : curDate().getDate(),
      endMonth: setProp.setDeadLine.endDate !== undefined && setProp.setDeadLine.endDate[1] !== undefined && typeof setProp.setDeadLine.endDate[1] === 'number' && setProp.setDeadLine.endDate[1] > 0 && setProp.setDeadLine.endDate[1] <= 12 ? setProp.setDeadLine.endDate[1] - 1 : curDate().getMonth(),
      endYear: setProp.setDeadLine.endDate !== undefined && setProp.setDeadLine.endDate[2] !== undefined && typeof setProp.setDeadLine.endDate[2] === 'number' && setProp.setDeadLine.endDate[2] >= 0 ? setProp.setDeadLine.endDate[2] : curDate().getFullYear()
    }
    let textMsg = {
      startMsg: '',
      endMsg: '',
      errMsg: ''
    }
    // Checking parameter values of text massege | Проверка значений параметров вывода сообщений
    for (let prop in textMsg) {
      if (setProp.setTextMsg !== undefined && setProp.setTextMsg[prop] !== undefined && typeof setProp.setTextMsg[prop] === 'string') {
        textMsg[prop] = setProp.setTextMsg[prop];
      }
    }
    // Init set Date & Time | Инициализация установленного времени и дат
    let startDate = new Date(deadLine.startYear, deadLine.startMonth, deadLine.startDay, deadLine.startHour, deadLine.startMin),
      endDate = new Date(deadLine.endYear, deadLine.endMonth, deadLine.endDay, deadLine.endHour, deadLine.endMin);
    // Time zone offset | Разность часовых поясов
    let timeZoneDiff;
    timeZoneDiff = (deadLine.timeZone + curDate().getTimezoneOffset()/60) * 3600000;
    // Init period looping | Определение периода повторения
    let loopTimeEnd,
      loopPauseEnd,
      loopTimeDiff,
      loopTimeHour;
    if (deadLine.turnLoop === true) {
      loopTimeHour = deadLine.startHour > deadLine.endHour ? deadLine.startHour - deadLine.endHour : 24 - (deadLine.endHour - deadLine.startHour);
      loopTimeDiff = loopTimeHour * 3600000 + deadLine.startMin * 60000 - deadLine.endMin * 60000;
    }
    //console.log('timeZoneDiff: '+ (deadLine.timeZone + curDate().getTimezoneOffset()/60), 'timeZone: '+curDate().getTimezoneOffset()/60, curDate());
    // Init timer period | Определение периода таймера
    let setTime = () => {
      if (startDate.getTime() - timeZoneDiff > curTime()) {
        return startDate.getTime() - timeZoneDiff;
      } else if (startDate.getTime() - timeZoneDiff <= curTime() && deadLine.turnLoop === true) {
        let loopTime;
        for (loopTime = startDate.getTime() - timeZoneDiff; loopTime <  curTime(); loopTime += (deadLine.loopDays + deadLine.pauseDays) * 86400000) {}
        loopTimeEnd = loopTime - deadLine.pauseDays * 86400000 - loopTimeDiff;
        loopPauseEnd = loopTime;
        if (loopTimeEnd - curTime() <= 0) {
          return loopPauseEnd;
        } else {
          return loopTimeEnd;
        }
      } else if (endDate.getTime() - timeZoneDiff > curTime() && deadLine.turnLoop === false) {
        return endDate.getTime() - timeZoneDiff;
      } else {
        return curTime();
      }
    }
    // Update Timer | Обновление таймера
    let updTimer = () => {
      // Timer data output | Вывод данных таймера
      secSpan.innerHTML = sec() > 9 ? sec() : "0" + sec();
      minSpan.innerHTML = min() > 9 ? min() : "0" + min();
      hourSpan.innerHTML = hour() > 9 ? hour() : "0" + hour();
      daySpan.innerHTML = day();
      // Text message output | Вывод текста
      if (startDate.getTime() - timeZoneDiff > curTime()) {
        msgSpan.innerHTML = textMsg.startMsg;
      } else if (startDate.getTime() - timeZoneDiff <= curTime() && deadLine.turnLoop === true) {
        if (loopTimeEnd - curTime() <= 0) {
          msgSpan.innerHTML = textMsg.errMsg;
          timerCallback();
        } else {
          msgSpan.innerHTML = textMsg.endMsg;
        }
      } else if (endDate.getTime() - timeZoneDiff > curTime() && deadLine.turnLoop === false) {
        msgSpan.innerHTML = textMsg.endMsg;
      } else {
        msgSpan.innerHTML = textMsg.errMsg;
        timerCallback();
      }
    }
    // First call Timer | Вызов таймера
    updTimer();
    // Interval update Timer | Интервал обновления таймера
    let updInterval = setInterval(() => {
      if (endDate.getTime() - timeZoneDiff <= curTime() && deadLine.turnLoop === false) {
        clearInterval(updInterval);
      }
      updTimer();
    }, 1000);
  }