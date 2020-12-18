const errorName = document.querySelector(".name-error");
const errorNumber = document.querySelector(".number-error");
const errorEmail = document.querySelector(".email-error");
const errorMap = document.querySelector(".map-error");
const completed = document.querySelector(".mailForm__completed");
//Добавим прослушиватель событий с помощью JS, т.к. встроенные обработчики собитий имеют ряд проблем.
document.querySelector('.mailForm > button').addEventListener('click', viodChecker);
let coordinates = "void";

function viodChecker() {
    const name = document.querySelector(".mailForm__name").value;
    const number = document.querySelector(".mailForm__number").value;
    const email = document.querySelector(".mailForm__email").value;
    // Выполнение проверок для создания собственный блоков ошибок
    // используем условный (тернарный) оператор, чтобы избавиться от over8000 if в коде
    const a = errorName.style.display = name !== "" ? 'none' : 'block';
    const b = errorNumber.style.display = number !== "" ? 'none' : 'block';
    const c = errorEmail.style.display = email.includes('@') ? 'none' : 'block';
    const d = errorMap.style.display = coordinates === "void" ? 'block' : 'none';
    if (a === 'none' && b === 'none' && c === 'none' && d === 'none')  {
        completed.style.display = "block";
    }
}

//КОД ИЗ ДОКУМЕНТАЦИИ ЯНДЕКС КАРТ НЕМНОГО ПОПРАВИЛ (91 строка) ДЛЯ ВЫВОДА КООРДИНАТ, А НЕ АДРЕСА https://yandex.ru/dev/maps/jsbox/2.1/event_reverse_geocode/
ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [54.19430625928039, 37.61382331526477],
            zoom: 16,
            controls: ['geolocationControl', 'searchControl']
        });

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Видоизменил строку для вывода координат, а не адреса!
                        firstGeoObject.geometry.getCoordinates(),
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject
                });
            document.querySelector(".coords").textContent = firstGeoObject.geometry.getCoordinates();
            // Меняем значение глобальной функции, чтобы функция voidChecker корректно сработала
            coordinates = firstGeoObject.geometry.getCoordinates();
        });
    }
}

