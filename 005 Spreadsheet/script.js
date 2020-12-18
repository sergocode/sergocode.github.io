window.onload = function() {
    document.querySelector('.bottom_panel > .plus').addEventListener('click', plusRow);
    document.querySelector('.bottom_panel > .minus').addEventListener('click', minusRowCheker);

    document.querySelector('.right_panel > .plus').addEventListener('click', plusСolumn);
    document.querySelector('.right_panel > .minus').addEventListener('click', minusСolumn);
    const tbody = document.querySelector("tbody")

    if (localStorage.getItem(`array`) == null) {
        array = [
            ["1","","","",""],
            ["","","","",""],
            ["","","","",""],
            ["","","","",""],
            ["","","","",""]
        ];
    } else {
        array = JSON.parse(localStorage.getItem(`array`))
    }

    let N = ''
    let amountRow = array.length
    newRow = []
    let amountСolumn = array[0].length

    function tableBuilder() {
        tbody.textContent = ""
        for (i = 0; i < array.length; i++) {
            var tr = document.createElement('tr')
            for (j = 0; j < array[i].length; j++) {
                var td = document.createElement('td')
                var script = document.createElement('script')
                td.innerHTML = `<input readonly class="editable" id="` + i + `_` + j + `" type="text" value="` + array[i][j] + `">`
                script.innerHTML = `
                document.getElementById("`+ i + `_` + j +`").addEventListener('input', function() {
                    array[`+ i + `][`+ j +`] = document.getElementById("`+ i + `_` + j +`").value
                    array = localStorage.setItem('array', JSON.stringify(array))
                    array = JSON.parse(localStorage.getItem(\`array\`))
                });
                `
                tr.appendChild(td)
                tr.appendChild(script)
            }
            tbody.appendChild(tr)
        }
        array = localStorage.setItem('array', JSON.stringify(array))
        array = JSON.parse(localStorage.getItem(`array`))
    }
    tableBuilder()

    function minusRowCheker() {

        voidRow = "true"
        lastRow = array.length - 1
        for (y = 0; y < array[lastRow].length; y++) {
            if (array[lastRow][y] != "") {
                voidRow = "false"
            }
        }
        if (voidRow === "true") {
            array.pop()
            tableBuilder()
        }
        if (voidRow === "false") {
            if (array.length > 1) {
                if (confirm("Строка содержит данные! Удалить?")) {
                    array.pop()
                    tableBuilder()
                    amountСolumn = array[0].length
                }
            } else {
                console.log("Невозможно удалить первый столбец таблицы!")
            }
        }
    }

    function minusСolumnCheker() {
        p = -1
        g = 0
        voidColumn = "true"

        for (k = 0; k < array.length; k++) {
            if (array[k][array[k].length -1] != "") {
                voidColumn = "false"
            }
        }

        if (voidColumn === "false") {
            ppp()
        } else {
            for ( i = 0; i < array.length; i++) {
                array[i].pop()
            }
            amountСolumn = array[0].length
            tableBuilder()
            return
        }

        function ppp() {
            if (p < array.length) {
                p = p + 1
                if (array[p][array[p].length -1] != "") {
                    if (confirm("Столбец содержит данные! Удалить?")) {
                        for ( i = 0; i < array.length; i++) {
                            array[i].pop()
                        }
                        amountСolumn = array[0].length
                        tableBuilder()
                        return
                    } else {
                        return
                    }
                }
                ppp()
            }
        }
    }

    function plusRow() {
        for (i = 0; i < array[0].length; i++) {
            newRow.push('')
        }
        array.push(newRow)
        amountRow = array.length
        newRow = []
        tableBuilder()
    }

    function minusRow() {
        if (amountRow > 1) {
            array.pop()
            amountRow = array.length
        } else {
            alert("Невозможно удалить первую строку таблицы!")
        }
        tableBuilder()
    }

    function plusСolumn() {
        for ( i = 0; i < array.length; i++) {
            array[i].push(N)
        }
        amountСolumn = array[0].length
        tableBuilder()
    }

    function minusСolumn() {
        if (amountСolumn > 1) {
            minusСolumnCheker()
        } else {
            console.log("Невозможно удалить первый столбец таблицы!")
        }
    }
}

window.addEventListener("load", ()=>{
    const inputs = document.querySelectorAll("input.editable");
    for(let input of inputs){
        input.addEventListener("dblclick", (e) =>{
            e.target.removeAttribute("readonly");
        })
        input.addEventListener("touchstart", (e) => {
            e.target.removeAttribute("readonly");
        })

        input.addEventListener("blur", (e) => {
            e.target.setAttribute("readonly", "true")
        })
    }
})