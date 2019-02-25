/**Developed by Dmytro Symonov
 * {s} symonov.com
 * 2019
 */
function timer(setProp) {
    // Output elements for Timer data | Элементы вывода данных таймера
    let timer = document.getElementById(setProp.idTimer),
    // Spans default classes | Классы элементов вывода по умолчанию
      spanClass = {
        sec : timer.querySelector('.seconds'),
        min : timer.querySelector('.minutes'),
        hour : timer.querySelector('.hours'),
        day : timer.querySelector('.days'),
        msg : timer.querySelector('.message')
      }
    // Checking span custom classes | Проверка классов элемнтов вывода
    for (let prop in spanClass) {
      if (setProp.spanClass !== undefined && setProp.spanClass[prop] !== undefined && typeof setProp.spanClass[prop] === 'string' && setProp.spanClass[prop] !== '') {
        spanClass[prop] = timer.querySelector('.' + setProp.spanClass[prop]);
      }
    }
    // Init current date | Инициализация текущей даты
    let curDate = () => new Date,
      curTime = () => curDate().getTime(),
      diffTime = () => Math.floor((setTime() - curTime()) / 1000),
      sec = () => diffTime() % 60,
      min = () => (diffTime() - sec()) / 60 % 60,
      hour = () => ((diffTime() - sec()) / 60 - min()) / 60 % 24,
      day = () => Math.floor(((diffTime() - sec()) / 60 - min()) / 60 / 24)
    // Init 'callback' | Инициализация 'callback'
    let timerCallback = () => {
        if (timerCallback.count === true && setProp.timerCallback !== undefined) {
          timerCallback.count = false;
          setProp.timerCallback();
        }
      }
    // First call conditions 'callback' | Условия первого вызова 'callback'
    timerCallback.count = true;
    // Default options | Настройки по умолчанию
    setProp.deadLine.startDate = setProp.deadLine.startDate !== undefined && Array.isArray(setProp.deadLine.startDate) === true ? setProp.deadLine.startDate : undefined;
    setProp.deadLine.endDate = setProp.deadLine.endDate !== undefined && Array.isArray(setProp.deadLine.endDate) === true ? setProp.deadLine.endDate : undefined;
    
    let deadLine = {
      turnLoop: setProp.deadLine.turnLoop !== undefined && typeof setProp.deadLine.turnLoop === 'boolean' ? setProp.deadLine.turnLoop : false,
      loopDays: setProp.deadLine.loopDays !== undefined && typeof setProp.deadLine.loopDays === 'number' && setProp.deadLine.loopDays > 0 ? setProp.deadLine.loopDays : 1,
      pauseDays: setProp.deadLine.pauseDays !== undefined && typeof setProp.deadLine.pauseDays === 'number' && setProp.deadLine.pauseDays > 0 ? setProp.deadLine.pauseDays : 0,
      timeZone: setProp.deadLine.timeZone !== undefined && typeof setProp.deadLine.timeZone === 'number' && setProp.deadLine.timeZone>= -12 && setProp.deadLine.timeZone <= 14 ? setProp.deadLine.timeZone : (-1) * curDate().getTimezoneOffset()/60,
      startMin: setProp.deadLine.startTime !== undefined && setProp.deadLine.startTime[1] !== undefined && typeof setProp.deadLine.startTime[1] === 'number' && setProp.deadLine.startTime[1] >= 0 && setProp.deadLine.startTime[1] < 60 ? setProp.deadLine.startTime[1] : 0,
      startHour: setProp.deadLine.startTime !== undefined && setProp.deadLine.startTime[0] !== undefined && typeof setProp.deadLine.startTime[0] === 'number' && setProp.deadLine.startTime[0] >= 0 && setProp.deadLine.startTime[0] <= 24 ? setProp.deadLine.startTime[0] : 0,
      startDay: setProp.deadLine.startDate !== undefined && setProp.deadLine.startDate[0] !== undefined && typeof setProp.deadLine.startDate[0] === 'number' && setProp.deadLine.startDate[0] > 0 && setProp.deadLine.startDate[0] <= 31 ? setProp.deadLine.startDate[0] : curDate().getDate(),
      startMonth: setProp.deadLine.startDate !== undefined && setProp.deadLine.startDate[1] !== undefined && typeof setProp.deadLine.startDate[1] === 'number' && setProp.deadLine.startDate[1] > 0 && setProp.deadLine.startDate[1] <= 12 ? setProp.deadLine.startDate[1] - 1 : curDate().getMonth(),
      startYear: setProp.deadLine.startDate !== undefined && setProp.deadLine.startDate[2] !== undefined && typeof setProp.deadLine.startDate[2] === 'number' && setProp.deadLine.startDate[2] >= 0 ? setProp.deadLine.startDate[2] : curDate().getFullYear(),
      endMin: setProp.deadLine.endTime !== undefined && setProp.deadLine.endTime[1] !== undefined && typeof setProp.deadLine.endTime[1] === 'number' && setProp.deadLine.endTime[1] >= 0 && setProp.deadLine.endTime[1] < 60 ? setProp.deadLine.endTime[1] : 0,
      endHour: setProp.deadLine.endTime !== undefined && setProp.deadLine.endTime[0] !== undefined && typeof setProp.deadLine.endTime[0] === 'number' && setProp.deadLine.endTime[0] >= 0 && setProp.deadLine.endTime[0] <= 24 ? setProp.deadLine.endTime[0] : 0,
      endDay: setProp.deadLine.endDate !== undefined && setProp.deadLine.endDate[0] !== undefined && typeof setProp.deadLine.endDate[0] === 'number' && setProp.deadLine.endDate[0] > 0 && setProp.deadLine.endDate[0] <= 31 ? setProp.deadLine.endDate[0] : curDate().getDate(),
      endMonth: setProp.deadLine.endDate !== undefined && setProp.deadLine.endDate[1] !== undefined && typeof setProp.deadLine.endDate[1] === 'number' && setProp.deadLine.endDate[1] > 0 && setProp.deadLine.endDate[1] <= 12 ? setProp.deadLine.endDate[1] - 1 : curDate().getMonth(),
      endYear: setProp.deadLine.endDate !== undefined && setProp.deadLine.endDate[2] !== undefined && typeof setProp.deadLine.endDate[2] === 'number' && setProp.deadLine.endDate[2] >= 0 ? setProp.deadLine.endDate[2] : curDate().getFullYear()
    }
    let textMsg = {
      toStartMsg: '',
      toEndMsg: '',
      errMsg: ''
    }
    // Checking parameter values of text messages | Проверка значений параметров вывода сообщений
    for (let prop in textMsg) {
      if (setProp.textMsg !== undefined && setProp.textMsg[prop] !== undefined && typeof setProp.textMsg[prop] === 'string') {
        textMsg[prop] = setProp.textMsg[prop];
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
      spanClass.sec.innerHTML = sec() > 9 ? sec() : "0" + sec();
      spanClass.min.innerHTML = min() > 9 ? min() : "0" + min();
      spanClass.hour.innerHTML = hour() > 9 ? hour() : "0" + hour();
      spanClass.day.innerHTML = day();
      // Text message output | Вывод текста
      if (startDate.getTime() - timeZoneDiff > curTime()) {
        spanClass.msg.innerHTML = textMsg.toStartMsg;
      } else if (startDate.getTime() - timeZoneDiff <= curTime() && deadLine.turnLoop === true) {
        if (loopTimeEnd - curTime() <= 0) {
          spanClass.msg.innerHTML = textMsg.errMsg;
          timerCallback();
        } else {
          spanClass.msg.innerHTML = textMsg.toEndMsg;
        }
      } else if (endDate.getTime() - timeZoneDiff > curTime() && deadLine.turnLoop === false) {
        spanClass.msg.innerHTML = textMsg.toEndMsg;
      } else {
        spanClass.msg.innerHTML = textMsg.errMsg;
        timerCallback();
      }
    }
    // First call Timer | Первый вызов таймера
    updTimer();
    // Interval update Timer | Интервал обновления таймера
    let updInterval = setInterval(() => {
      if (endDate.getTime() - timeZoneDiff <= curTime() && deadLine.turnLoop === false) {
        clearInterval(updInterval);
      }
      updTimer();
    }, 1000);
  }