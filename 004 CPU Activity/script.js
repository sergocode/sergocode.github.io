// Поместим весь код в window.onload, чтобы не выдавало ошибку в консоли (на работу кода не влияет, но приятнее видеть чистую консоль)
window.onload = function() {
    var ctx = document.getElementById('CPU').getContext('2d');
    var chart = new Chart(ctx, {
        // Тип диаграммы, которую мы хотим создать
        type: 'line',

        // Данные и параметры для графика
        data: {
            labels: ['', '', '', '', '', ''],
            datasets: [{
                label: 'Загрузка ЦПУ',
                // taskmgr.exe low cost cosplay
                backgroundColor: '#F1F6FA',
                borderColor: '#1F84BF',
                data: [],
                pointRadius: 0,
                update: 0,
                lineTension: 0,
                borderWidth: 1
            }]
        },

        // Параметры конфигурации
        options: {
            // Убираем анимацию при обновлении графика
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    ticks: {
                        // Указываем интервал по оси Y
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }]
            }
        }
    });

    array = [  ,  ,  ,  ,  ,  ,  ]

    async function getResponse() {

        const  response = await fetch('http://exercise.develop.maximaster.ru/service/cpu/')
        let newActivity = await response.json()
        array.shift()
        let lastObject = array[array.length-1];
        if (newActivity === 0) {
            newActivity = lastObject;
            array.push(newActivity);
            console.log("Ошибка! Вывод предыдущего показателя!")
        } else {
            array.push(newActivity)
        }
        chart.data.datasets[0].data = array;
        chart.update();
    }
    setInterval (getResponse, 5000);
}
