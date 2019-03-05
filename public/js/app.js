console.log('Client side javascript')

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
        response.json().then((data)=>{
            console.log(data)
        })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

//messageOne.textContent='From javascript'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent= ''
    messageTwo.textContent= ''

    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent= data.error
            } else{
            messageOne.textContent= 'Location:  '+ data.location
            messageTwo.textContent= 'Prediction:  '+data.forecast
            console.log(data.location)
            console.log(data.forecast)
            }
        })
})
})