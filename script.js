'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const formBtn = document.querySelector('.country-btn')
const input = document.querySelector('.country-input')
const errort = document.querySelector('.error')

///////////////////////////////////////


const renderCountry = function (data, className) {
    let html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`
    countriesContainer.insertAdjacentHTML("beforeend", html)
    countriesContainer.style.opacity = 1;
}

//// Request trought XML

// const dataCountry = function (conutry) {
//     const request = new XMLHttpRequest()
//     request.open('GET', `https://restcountries.com/v2/name/${conutry}`)
//     request.send()

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);
//         renderCountry(data)

//         const neighbours = data.borders?.forEach(c => {
//             console.log(c);
//             const requestNeighbours = new XMLHttpRequest()
//             requestNeighbours.open('GET', `https://restcountries.com/v2/alpha/${c}`)
//             requestNeighbours.send()

//             requestNeighbours.addEventListener('load', function () {
//                 const data2 = JSON.parse(this.responseText)
//                 renderCountry(data2, 'neighbour')
//             })
//         });

//     })
// }
// // dataCountry('uzb')
// dataCountry('usa')

//// Request trought AJAX

const dataCountry = async function (conutry) {
    try {
        const request = await fetch(`https://restcountries.com/v2/name/${conutry}`).then(res => {
            if (!res.ok) throw new Error(`Samthing went wrong ${res.status}`)
            return res.json()
        }).then(data => {
            renderCountry(data[0])

            // const neighbourRequest = data[0].borders?.forEach(c => {
            //     const request2 = fetch(`https://restcountries.com/v2/alpha/${c}`).then(res => {
            //         if (!res.ok) throw new Error(`${res.status}`)
            //         return res.json()
            //     }).then(data2 => {
            //         renderCountry(data2)
            //     })
            // })
        })

    } catch (err) {
        console.error(err);
        errort.textContent = `${err.message}💥💥! Pleace, check your request.`
    }
}

formBtn.addEventListener('click', function (e) {
    e.preventDefault()

    if (input.value == "") {
        input.style.borderColor = "red"
        input.placeholder = "Please, full this area"

    } else {
        dataCountry(input.value)
        errort.textContent = ''
        input.value = ""
        input.placeholder = ""
        input.style.borderColor = "#999"
    }
})