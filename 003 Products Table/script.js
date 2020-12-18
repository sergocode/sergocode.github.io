document.querySelector('.control > button').addEventListener('click', getResponse);

async function getResponse() {
    let score = "NaN";
    let minPrice = document.querySelector('.minPrice').value
    let maxPrice = document.querySelector('.maxPrice').value
    if (minPrice < 0 || maxPrice < 0) {
        alert("Цена не может быть меньше 0")
    }

    const  response = await fetch('http://exercise.develop.maximaster.ru/service/products/')
    const content = await response.json()
    let items = document.querySelector('.items')

    items.innerHTML = `        
        <tr class="head">
            <td>ID</td>
            <td>Название</td>
            <td>Количество</td>
            <td>Цена за единицу</td>
            <td>Сумма</td>
        </tr>`

    let key

    for (key in content) {
        let summ = `${content[key].quantity}` * `${content[key].price}`;
        let id = `${key}` * 1 + 1
        let price = `${content[key].price}`*1
        if (price >= minPrice && price <= maxPrice) {
            score = "yes";
            console.log(score);
            items.innerHTML += `        
            <tr class="item">
                <td>${id}</td>
                <td>${content[key].name}</td>
                <td>${content[key].quantity}</td>
                <td>${price}</td>
                <td>${summ}</td>
            </tr>`
        }
        if (0 == minPrice && 0 == maxPrice) {
            score = "start"
            items.innerHTML += `        
            <tr class="item">
                <td>${id}</td>
                <td>${content[key].name}</td>
                <td>${content[key].quantity}</td>
                <td>${price}</td>
                <td>${summ}</td>
            </tr>`
        }
    }
    if (score == "NaN") {
        console.log("Нет данных, попадающих под условие фильтра")
        items.innerHTML = `        
            <tr class="item">
                <div class="NaN">Нет данных, попадающих под условие фильтра</div>
            </tr>`
    }
}
getResponse()

