/**Developed by Dmytro Symonov
 * {s} symonov.com
 * 2019
 */
function timer(setProp) {
  // Output elements for Timer data | Элементы вывода данных таймера
  const timer = document.querySelector(setProp.idTimer)
  // Spans default classes | Классы элементов вывода по умолчанию
  const spanClass = {
    sec: timer.querySelector('.seconds'),
    min: timer.querySelector('.minutes'),
    hour: timer.querySelector('.hours'),
    day: timer.querySelector('.days'),
    msg: timer.querySelector('.message')
  }
  // Checking span custom classes | Проверка классов элемнтов вывода
  for (let prop in spanClass) {
    if (setProp.spanClass !== undefined && setProp.spanClass[prop] !== undefined && typeof setProp.spanClass[prop] === 'string' && setProp.spanClass[prop] !== '') {
      spanClass[prop] = timer.querySelector('.' + setProp.spanClass[prop]);
    }
  }
  // Init current date | Инициализация текущей даты
  const curDate = () => new Date,
    curTime = () => Math.floor(curDate().getTime() / 1000),
    diffTime = () => setTime() - curTime(),
    sec = () => diffTime() % 60,
    min = () => (diffTime() - sec()) / 60 % 60,
    hour = () => ((diffTime() - sec()) / 60 - min()) / 60 % 24,
    day = () => Math.floor(((diffTime() - sec()) / 60 - min()) / 60 / 24)
  // Default options | Настройки по умолчанию
  setProp.deadLine.startDate = setProp.deadLine.startDate !== undefined && Array.isArray(setProp.deadLine.startDate) === true ? setProp.deadLine.startDate : undefined;
  setProp.deadLine.endDate = setProp.deadLine.endDate !== undefined && Array.isArray(setProp.deadLine.endDate) === true ? setProp.deadLine.endDate : undefined;
  const deadLine = {
    turnLoop: setProp.deadLine.turnLoop !== undefined && typeof setProp.deadLine.turnLoop === 'boolean' ? setProp.deadLine.turnLoop : false,
    loopDays: setProp.deadLine.loopDays !== undefined && typeof setProp.deadLine.loopDays === 'number' && setProp.deadLine.loopDays > 0 ? setProp.deadLine.loopDays : 1,
    pauseDays: setProp.deadLine.pauseDays !== undefined && typeof setProp.deadLine.pauseDays === 'number' && setProp.deadLine.pauseDays > 0 ? setProp.deadLine.pauseDays : 0,
    timeZone: setProp.deadLine.timeZone !== undefined && typeof setProp.deadLine.timeZone === 'number' && setProp.deadLine.timeZone >= -12 && setProp.deadLine.timeZone <= 14 ? setProp.deadLine.timeZone : (-1) * curDate().getTimezoneOffset() / 60,
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
  const textMsg = {
    msgOutput: false,
    toStartMsg: '',
    toEndMsg: '',
    errMsg: ''
  }
  // Checking parameter values of text messages | Проверка значений параметров сообщений
  for (let prop in textMsg) {
    if (setProp.textMsg !== undefined && setProp.textMsg[prop] !== undefined) {
      textMsg[prop] = setProp.textMsg[prop];
    }
  }
  // Messages output | Вывод сообщений
  const msgOutput = (msgArg) => {
    if (textMsg.msgOutput === true) {
      spanClass.msg.innerHTML = msgArg;
    }
  }
  // Init set Date & Time | Инициализация установленного времени и дат
  const startDate = new Date(deadLine.startYear, deadLine.startMonth, deadLine.startDay, deadLine.startHour, deadLine.startMin),
    endDate = new Date(deadLine.endYear, deadLine.endMonth, deadLine.endDay, deadLine.endHour, deadLine.endMin),
    // Time zone offset | Разность часовых поясов
    timeZoneDiff = (deadLine.timeZone + curDate().getTimezoneOffset() / 60) * 3600,
    startDateTime = Math.floor(startDate.getTime() / 1000) - timeZoneDiff,
    endDateTime = Math.floor(endDate.getTime() / 1000) - timeZoneDiff,
    // Init period looping | Определение периода повторения
    loopTimeHour = deadLine.startHour > deadLine.endHour ? deadLine.startHour - deadLine.endHour : 24 - (deadLine.endHour - deadLine.startHour),
    loopTimeDiff = loopTimeHour * 3600 + deadLine.startMin * 60 - deadLine.endMin * 60
  let loopTimeEnd,
    loopPauseEnd
  // Init timer period | Определение периода таймера
  const setTime = () => {
    if (startDateTime >= curTime()) {
      return startDateTime;
    } else if (startDateTime < curTime() && deadLine.turnLoop === true) {
      let loopTime
      for (loopTime = startDateTime; loopTime < curTime(); loopTime += (deadLine.loopDays + deadLine.pauseDays) * 86400) { }
      loopTimeEnd = loopTime - deadLine.pauseDays * 86400 - loopTimeDiff;
      loopPauseEnd = loopTime;
      if (loopTimeEnd - curTime() < 0) {
        return loopPauseEnd;
      } else {
        return loopTimeEnd;
      }
    } else if (endDateTime > curTime() && deadLine.turnLoop === false) {
      return endDateTime;
    } else {
      return curTime();
    }
  }
  // Update Timer | Обновление таймера
  const updTimer = () => {
    // Timer data output | Вывод данных таймера
    spanClass.sec.innerHTML = sec() > 9 ? sec() : '0' + sec();
    if (updTimer.count === 0 || sec() === 0) {
      setTimeout(() => spanClass.min.innerHTML = min() > 9 ? min() : '0' + min(), updTimer.count);
    }
    if (updTimer.count === 0 || sec() === 0 && min() === 0) {
      setTimeout(() => spanClass.hour.innerHTML = hour() > 9 ? hour() : '0' + hour(), updTimer.count);
    }
    if (updTimer.count === 0 || sec() === 0 && min() === 0 && hour() === 0) {
      setTimeout(() => spanClass.day.innerHTML = day(), updTimer.count);
    }
    // Text message output & callback call | Вывод текстовых сообщений и вызов callback
    if (updTimer.count === 0 || diffTime() <= 0) {
      updTimer.count = 1000;
      if (startDateTime > curTime()) {
        msgOutput(textMsg.toStartMsg);
      } else if (startDateTime <= curTime() && deadLine.turnLoop === true) {
        if (loopTimeEnd - curTime() <= 0) {
          msgOutput(textMsg.errMsg);
          setProp.timerCallback();
        } else {
          msgOutput(textMsg.toEndMsg);
        }
      } else if (endDateTime > curTime() && deadLine.turnLoop === false) {
        msgOutput(textMsg.toEndMsg);
      } else {
        msgOutput(textMsg.errMsg);
        setProp.timerCallback();
      }
    }
  }
  // First call conditions updTimer | Условия первого вызова updTimer
  updTimer.count = 0;
  // First call Timer | Первый вызов таймера
  updTimer();
  // Interval update Timer | Интервал обновления таймера
  const updInterval = setInterval(() => {
    if (endDateTime < curTime() && deadLine.turnLoop === false) {
      clearInterval(updInterval);
    } else {
      updTimer();
    }
  }, 1000);
}