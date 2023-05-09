function hideLoader (){
    const loader = document.querySelector('#loader')
    loader.classList.remove('loader_active')
}

function renderValute(valute){
    const code = valute.CharCode
    const value = valute.Value
    const container = document.querySelector('#items')
    
    const newValute = `<div class="item">
            <div class="item__code">
                    ${code}
                </div>
                <div class="item__value">
                    ${value}
                </div>
                <div class="item__currency">
                    руб.
                </div>
          </div>`

    container.insertAdjacentHTML('beforeend', newValute)    
}

function showExchangeRates(response, hideloader=true){
    resetValutes()
    const valutes = response.response.Valute
    if(hideloader){hideLoader()}
    for(let valute in valutes){
        renderValute(valutes[valute])
    }

}

function saveCash(response){
    localStorage.setItem('valutes', JSON.stringify(response))
}

function loadPrevious(){
    const response = JSON.parse(localStorage.getItem('valutes'))
    if(response)showExchangeRates(response, false)
}

function resetValutes(){
    const valutes = document.querySelector('#items')
    valutes.innerHTML = ''
}


loadPrevious()
fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => response.json())
    .then(response => {
        showExchangeRates(response)
        saveCash(response)
    })


