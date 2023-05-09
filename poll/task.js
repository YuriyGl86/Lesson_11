const question = document.querySelector('#poll__title')
const answers = document.querySelector('#poll__answers')

function renderQuestion(response){
    question.innerText = response.data.title
    question.dataset.id = response.id
    response.data.answers.forEach(element => {
        renderButton(element)
    });
}

function renderButton(txt){
    const button = document.createElement('button')
    button.classList.add('poll__answer')
    button.innerText = txt
    button.addEventListener('click', buttonClickHandler)            
    answers.appendChild(button)
}

function buttonClickHandler(event){
    alert('Спасибо, ваш голос засчитан!')
    const answerIndex = findIndex(event.target)
    const questionId = question.dataset.id
    showStats(questionId, answerIndex)
}


function findIndex(elem){
    buttonList = Array.from(document.querySelectorAll('.poll__answer'))
    return buttonList.findIndex(button => button == elem)
}

function showStats(questionId, answerIndex){
    const URL = 'https://students.netoservices.ru/nestjs-backend/poll'
    const params = new URLSearchParams()
    params.set('vote', questionId)
    params.set('answer', answerIndex)
    fetch(URL, {
            method: "POST",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',            
            },
            'body': params,
        })
    .then(resp => resp.json())
    .then(resp => {
        answers.classList.remove('poll__answers_active')
        resp.stat.forEach(stat => renderStat(stat))
    })

}

function renderStat(stat){
    const div = document.createElement('div')
    div.innerText = `${stat.answer}: ${stat.votes}%`
    question.insertAdjacentElement('afterend', div)

}


fetch('https://students.netoservices.ru/nestjs-backend/poll')
    .then(response => response.json())
    .then(response => renderQuestion(response))