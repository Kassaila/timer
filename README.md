![timer](https://user-images.githubusercontent.com/38295556/56060734-5bd64480-5d70-11e9-9206-c22b3f71883f.gif)
# Timer
## Краткое описание
**Timer** - это скрипт обратного отсчета времени, который написан на JavaScript без дополнительных библиотек. Как основу использует встроенный класс `Date` и его привязку ко времени установленному в операционной системе.
## Расположение файлов
* Файл с исходным кодом и комментариями к нему - находится в папке [/src](https://github.com/Kassaila/timer/tree/master/src) . Можете использовать его для вашего проекта и подробного ознакомления
* Файл со сжатым исходным кодом - находится в папке [/dist](https://github.com/Kassaila/timer/tree/master/dist)
* Файлы с [примерами](https://kassaila.github.io/timer/) и комментариями по настройке параметров плагина - находятся в папке [/docs](https://github.com/Kassaila/timer/tree/master/docs).
## Использование
Для инициализации **Timer** вам нужно скопировать файл [/dist/timer.min.js](https://github.com/Kassaila/timer/tree/master/dist) или [/src/timer.js](https://github.com/Kassaila/timer/tree/master/src) в директорию вашего проекта.
Далее подключить указав путь к этому файлу и вызвать функцию `timer()` с минимальными аргументами. Предварительно создав блок таймера и элементы вывода его данных:
```html
<!--set date Timer block-->
<div id="timer_block">
    <!--default output block for days-->
    <div class="days">00</div>
    <!--default output block for hours-->
    <div class="hours">00</div>
    <!--default output block for minutes-->
    <div class="minutes">00</div>
    <!--default output block for seconds-->
    <div class="seconds">00</div>
</div>
<!--Timer (connected function)-->
<script src="js/timer.js"></script>
<script>
    timer({
        // Timer block ID (required) | ID блока таймера (обязателен)
        idTimer: '#timer_block',
        // Timer data (date and time of start and end timer, time zone, loop, looping period and pause) 
        // Данные таймера (дата и время начала и окончания таймера, часовой пояс, цикл, период цикла и паузы)
        deadLine: {
            startDate: [1, 1, 2019], // [DD, MM, YYYY]; array of numbers; default: current date
            startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
            endDate: [12, 8, 2020], // [DD, MM, YYYY]; array of numbers; default: current date
            endTime: [12, 30] // [HH, MM]; array of numbers; default: [24, 0]
        }
    });
</script>
```
В данном примере функция `timer()` запускает таймер обратного отсчета, по заданному времени и дате старта до времени и даты окончания.  
## Руководство
Ниже написано подробное руководство по настройке параметров функции `timer()`.  
* [Идентификация блока Timer](#идентификация-блока-timer)  
* [Элементы вывода данных блока Timer](#элементы-вывода-данных-блока-timer)
* [Типы Timer, настройка - даты, времени и часового пояса](#типы-timer-настройка---даты-времени-и-часового-пояса) 
    * [Общие параметры](#общие-параметры)  
    * [Специальные параметры](#специальные-параметры)  
* [Состояния Timer и вывод сообщений](#состояния-timer-и-вывод-сообщений) 
* [Callback](#callback)  
### Идентификация блока Timer
Обязательное требование для работы скрипта.  
Для идентификации блока **Timer**, нужно скопировать `id` блока в параметр `idTimer`:
```javascript
    timer({
        // Timer block ID (required) | ID блока таймера (обязателен)
        idTimer: '#timer_block'
    });
```
Если в Вашем проекте несколько **Timer**, то следует вызвать функцию `timer()` для каждого из них:
```html
<!--1st Timer block-->
<div id="timer_1st">
    <div class="days">00</div>
    <div class="hours">00</div>
    <div class="minutes">00</div>
    <div class="seconds">00</div>
</div>
<!--2nd Timer block-->
<div id="timer_2nd">
    <div class="days">00</div>
    <div class="hours">00</div>
    <div class="minutes">00</div>
    <div class="seconds">00</div>
</div>
<script src="js/timer.js"></script>
<script>
    timer({
        idTimer: '#timer_1st',
        deadLine: {
            startDate: 'default', // [DD, MM, YYYY]; array of numbers; default: current date
            startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
            endDate: [8, 2, 2020], // [DD, MM, YYYY]; array of numbers; default: current date
            endTime: [24, 0] // [HH, MM]; array of numbers; default: [24, 0]
        }
    });
    timer({
        idTimer: '#timer_2nd',
        deadLine: {
            startDate: 'default', // [DD, MM, YYYY]; array of numbers; default: current date
            startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
            endDate: [28, 2, 2021], // [DD, MM, YYYY]; array of numbers; default: current date
            endTime: [24, 0] // [HH, MM]; array of numbers; default: [24, 0]
        }
    });
</script>
```
Если в Вашем проекте нужно более одного блока вывода информации для одного **Timer**, то идентифицируйте блоки по атрибуту `class`:
```html
<!--1st Timer block-->
<div class="timer_block">
    <div class="days">00</div>
    <div class="hours">00</div>
    <div class="minutes">00</div>
    <div class="seconds">00</div>
</div>
<!--2nd Timer block-->
<div class="timer_block">
    <div class="days">00</div>
    <div class="hours">00</div>
    <div class="minutes">00</div>
    <div class="seconds">00</div>
</div>
<!--3rd Timer block-->
<div class="timer_block">
    <div class="days">00</div>
    <div class="hours">00</div>
    <div class="minutes">00</div>
    <div class="seconds">00</div>
</div>
<script src="js/timer.js"></script>
<script>
    timer({
        idTimer: '.timer_block',
        deadLine: {
            startDate: 'default', // [DD, MM, YYYY]; array of numbers; default: current date
            startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
            endDate: [28, 2, 2021], // [DD, MM, YYYY]; array of numbers; default: current date
            endTime: [24, 0] // [HH, MM]; array of numbers; default: [24, 0]
        }
    });
</script>
```
### Элементы вывода данных блока Timer  
Для кастомизации элементов вывода данных, блока **Timer**, используйте атрибуты `class` установленные по умолчанию или установите свои в параметр `spanClass`:
```javascript
timer({
    idTimer: '#timer_block',
    // Output data spans custom classes (must be nested in Timer block) | Классы элементов вывода данных (должны быть вложены в блок таймера)
    spanClass: {
        sec: 'date_seconds', // string; default: 'seconds'
        min: 'date_minutes', // string; default: 'minutes'
        hour: 'date_hours', // string; default: 'hours'
        day: 'date_days', // string; default: 'days'
        msg: 'date_message' // string; default: 'message'
    }
});
```
### Типы Timer, настройка - даты, времени и часового пояса  
Для функции `timer()` есть два типа **Timer** :
* ***Конечный (обычный)*** - с датой (временем) старта и датой (временем) окончания **Timer** ;
* ***Циклический*** - с датой (временем) старта **Timer**, периодом повторения  и паузой между повторениями ;

Рассмотрим настройку общих (часовой пояс, дата и время начала таймера) и специальных (дата и время окончания таймера, цикл, период цикла и паузы) параметров `deadLine` для каждого типа **Timer**.  
### *Общие параметры:*  
`timeZone` - устанавливает часовой пояс UTC по которому будет работать **Timer** : диапазон от `-12` до `14`. Если значение не будет установлено, то будет использован часовой пояс пользователя установленный в ОС.
```javascript
timer({
    idTimer: '#timer_block',
    deadLine: {
        // location time zone UTC
        timeZone: 'default', // number; range: (-12; 14); default: user current time zone
      }
});
```
`startDate` - устанавливает дату старта **Timer** в формате `[DD, MM, YYYY]`. По умолчанию устанавливается текущая дата.  
`startTime` - устанавливает время старта **Timer** в формате `[HH, MM]`. По умолчанию установлено `[00,00]`.
```javascript
timer({
    idTimer: '#timer_block',
    deadLine: {
        startDate: 'default', // [DD, MM, YYYY]; array of numbers; default: current date
        startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
     }
});
```
### *Специальные параметры:*  
#### *Конечный (обычный) тип*  
Для этого типа **Timer** в параметре `deadLine` обязательны общие параметры `startDate`, `startTime`.  
И специальные параметры:  
`endDate` - устанавливает дату окончания **Timer** в формате `[DD, MM, YYYY]`. По умолчанию устанавливается текущая дата.  
`endTime` - устанавливает время окончания **Timer** в формате `[HH, MM]`. По умолчанию установлено `[24,00]`.
```javascript
// Example Timer with set date (start & end) | Пример таймера с указанной датой начала и окончания
timer({
    idTimer: '#timer_block',
    // Timer data (date and time of start and end timer, time zone, loop, looping period and pause) 
    // Данные таймера (дата и время начала и окончания таймера, часовой пояс, цикл, период цикла и паузы)
    deadLine: {
        // location time zone UTC
        timeZone: -4, // number; range: (-12; 14); default: user current time zone
        startDate: 'default', // [DD, MM, YYYY]; array of numbers; default: current date
        startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
        endDate: [28, 2, 2021], // [DD, MM, YYYY]; array of numbers; default: current date
        endTime: [24, 0] // [HH, MM]; array of numbers; default: [24, 0]
     }
});
```
#### *Циклический тип*  
Для этого типа **Timer** в параметре `deadLine` обязательны общие параметры `startDate`, `startTime`.  
И специальные параметры:  
`turnLoop` - переключает свойство цикличности **Timer**. По умолчанию выключено.  
`loopDays` - устанавливает период цикла в формате количества дней. По умолчанию установлено `1`.  
`pauseDays` - устанавливает период паузы после окончания цикла **Timer** и перед началом следующего цикла в формате количества дней. По умолчанию установлено `0`.  
`endTime` - устанавливает время окончания **Timer** в формате `[HH, MM]`. По умолчанию установлено `[24,00]`.
```javascript
// Example Timer with loop | Пример циклического таймера
timer({
    idTimer: '#timer_loop_block',
    // Timer data (date and time of start and end timer, time zone, loop, looping period and pause) 
    // Данные таймера (дата и время начала и окончания таймера, часовой пояс, цикл, период цикла и паузы)
    deadLine: {
        turnLoop: true, // boolean; default: false
        loopDays: 1, // number; default: 1
        pauseDays: 1, // number; default: 0
        // location time zone UTC
        timeZone: 1, // number; range: (-12; 14); default: user current time zone
        startDate: [21, 3, 2019], // [DD, MM, YYYY]; array of numbers; default: current date
        startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
        endTime: [24, 0] // [HH, MM]; array of numbers; default: [24, 0]
      }
});
```
### Состояния Timer и вывод сообщений  
**Timer** имеет три состояния к которым привязаны параметры вывода сообщений.  
Создайте блок для вывода сообщений и настройте параметры `textMsg`:  
`msgOutput` - переключает свойство вывода сообщений. По умолчанию выключено.  
`toStartMsg` - устанавливает текст сообщения для состояния - до старта **Timer**.  
`toEndMsg` - устанавливает текст сообщения для состояния - после старта и до окончания **Timer** или на период цикла (зависит от установленного типа **Timer**).  
`errMsg` - устанавливает текст сообщения для состояния - после окончания **Timer** или на период паузы (зависит от установленного типа **Timer**).  
В параметрах вывода сообщений по умолчанию устанолена пустая строка.
```html
<div id="timer_block">
    <!--default output block for message-->
    <div class="message"></div>
    <!--default output block for days-->
    <div class="days">00</div>
    <!--default output block for hours-->
    <div class="hours">00</div>
    <!--default output block for minutes-->
    <div class="minutes">00</div>
    <!--default output block for seconds-->
    <div class="seconds">00</div>
</div>
<script src="js/timer.js"></script>
<script>
    timer({
        idTimer: '#timer_block',
        spanClass: {
            msg: 'message' // string; default: 'message'
        },
        deadLine: {
            startDate: 'default', // [DD, MM, YYYY]; array of numbers; default: current date
            startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
            endDate: 'default', // [DD, MM, YYYY]; array of numbers; default: current date
            endTime: [24, 0] // [HH, MM]; array of numbers; default: [24, 0]
        },
        // Text output message | Текст выводимых сообщений
        textMsg: {
            msgOutput: true, // boolean; default false
            toStartMsg: 'counting to start timer', // string; default: '';
            toEndMsg: 'counting to end timer', // string; default: '';
            errMsg: 'time is over' // string; default: '';
        }
    });
</script>
```
### Callback  
Для состояния по окончанию **Timer** или на период паузы (зависит от установленного типа **Timer**) будет вызвана функция `timerCallback()` с телом функции переданым в неё.
```javascript
timer({
    idTimer: '#timer_block',
    deadLine: {
        startDate: 'default', // [DD, MM, YYYY]; array of numbers; default: current date
        startTime: [0, 0], // [HH, MM]; array of numbers; default: [0, 0]
        endDate: [28, 2, 2021], // [DD, MM, YYYY]; array of numbers; default: current date
        endTime: [24, 0] // [HH, MM]; array of numbers; default: [24, 0]
    },
    // function call when time is over | Вызов функции по завершению таймера
    timerCallback() {
        console.log('time is over'); // optional;
    }
});
```
В данном примере по окончанию **Timer** будет выведено соощение в консоль.