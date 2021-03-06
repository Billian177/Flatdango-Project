// Your code here
document.addEventListener("DOMContentLoaded", ()=>{
    let button = document.getElementById("buy-ticket")

    button.addEventListener('click', () => {
        ticketNum.innerText = ticketsBuy(parseInt(ticketNum.innerText, 10))
    } )
})

function getMoviesData(){
    fetch("http://localhost:3000/films")
        .then(resp => resp.json())
        .then (data => {
            displayMoviesT(data)
            displayMoviesPoster(data[0])
            displayMoviesInfo(data[0])
    })
    
}

getMoviesData()

let sideList=document.querySelector("#films")

function displayMoviesT(data) {
    data.forEach(movie => {
        let movieT= document.createElement("li")
        movieT.className= "film item"
        movieT.innerHTML= `${movie.title} <button id="delete", style="width:40px;height:20px;background-color:#f44336;font-size:10px;border-radius:8px;position:absolute;left:90%">delete</button>`
        sideList.append(movieT)
        movieT.addEventListener('click', () => {
            displayMoviesPoster(movie)
            displayMoviesInfo(movie)
        })
    });
}

function displayMoviesPoster(data){
    poster.src = data.poster
}

let poster = document.getElementById("poster")
let title = document.getElementById("title")
let runtime = document.getElementById("runtime")
let filmInfo = document.getElementById("film-info") 
let showtime = document.getElementById("showtime")
let ticketNum = document.getElementById("ticket-num")


function displayMoviesInfo(data) {
    title.innerText= data.title
    runtime.innerText= `${data.runtime} minutes`
    filmInfo.innerText= data.description
    showtime.innerText= data.showtime
    ticketNum.innerText= `${data.capacity- data.tickets_sold}`
}

function ticketsBuy(tickets){
    tickets--
    if (tickets >0){
        return `${tickets}`
    }else if (tickets < 1){
        return 'Sold Out!'
    }
}
