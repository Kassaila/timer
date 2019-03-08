![timer](https://user-images.githubusercontent.com/38295556/53374997-5193ee80-395a-11e9-929b-de1603b70123.png)
# Timer
## Краткое описание
**Timer** - это плагин обратного отсчета времени для использования на web ресурсах. Написан на JavaScript без дополнительных библиотек. Как основу использует встроенный класс `Date` и его привязку ко времени установленному в ОС (среде запуска).
## Расположение файлов
* Файл с исходным кодом и комментариями к нему - находится в папке [/src](https://github.com/Kassaila/timer/tree/master/src) . Можете использовать его для вашего проекта и подробного ознакомления
* Файл со сжатым исходным кодом - находится в папке [/dist](https://github.com/Kassaila/timer/tree/master/dist)
* Файлы с примерами и комментариями по настройке параметров плагина - находятся в папке [/docs](https://github.com/Kassaila/timer/tree/master/docs). [Примеры](https://kassaila.github.io/timer/)
## Использование
Для инициализации **Timer** вам нужно скопировать файл плагина *[/dist](https://github.com/Kassaila/timer/tree/master/dist)/timer.min.js* или *[/src](https://github.com/Kassaila/timer/tree/master/src)/timer.js* в директорию вашего проекта.
Потом подключить его, указав путь к этому файлу и вызвать функцию `timer()` с минимальными аргументами. Предварительно создав блок таймера и элементы вывода его данных:
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
      idTimer: 'timer_block',
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
Ниже будет написано подробное руководство по настройке параметров функции `timer()`.
Пока для настройки `timer()` используйте примеры с комментариями, расположенные в папке [/docs](https://github.com/Kassaila/timer/tree/master/docs)