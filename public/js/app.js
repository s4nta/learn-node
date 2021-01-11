console.log('client side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMessage = document.querySelector('#location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/weather?address=' + search.value).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                locationMessage.textContent = data.location
            }
        })
    })
})