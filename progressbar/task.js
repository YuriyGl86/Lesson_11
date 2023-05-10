


const form = document.querySelector('#form')
console.log(form)
form.addEventListener('submit', sendFile)

function sendFile(event){
    event.preventDefault()
    const file = document.querySelector('#file').files[0]

    const formData = new FormData()
    formData.append('file', file, file.name)

    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = function(event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}, ${event.loaded * 100/event.total}%`);
        document.querySelector('#progress').value = (event.loaded/event.total)

        xhr.onloadend = function() {
            if (xhr.status == 201) {
            console.log("готово");
            } else {
            console.log("Ошибка " + this.status);
            }
        };  

    };

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(formData);
}