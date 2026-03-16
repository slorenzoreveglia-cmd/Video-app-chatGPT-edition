let database = []

let watched =
JSON.parse(localStorage.getItem("watched") || "[]")


async function loadDatabase(){

const res =
await fetch("database.json")

database =
await res.json()

render()

}

loadDatabase()



function render(){

const container =
document.getElementById("seasons")

container.innerHTML = ""

const seasons = {}

database.forEach(ep=>{

const s =
ep.season

if(!seasons[s])
seasons[s] = []

seasons[s].push(ep)

})


Object.keys(seasons)
.sort()
.forEach(season=>{

const div =
document.createElement("div")

div.className="season"

const title =
document.createElement("div")

title.className="season-title"

title.textContent =
"Stagione "+season

const list =
document.createElement("div")

list.className="episodes"

title.onclick=()=>{

list.style.display =
list.style.display==="block"
?"none":"block"

}


seasons[season].forEach(ep=>{

const row =
document.createElement("div")

row.className="episode"

if(watched.includes(ep.id))
row.classList.add("watched")

row.innerHTML=`
<span>🎬 ${ep.title}</span>
<span>${ep.code}</span>
`

row.onclick=()=>{

openVideo(ep)

}

list.appendChild(row)

})


div.appendChild(title)
div.appendChild(list)

container.appendChild(div)

})

}


function openVideo(ep){

const modal =
document.getElementById("player-modal")

const player =
document.getElementById("player")

player.src = ep.url

modal.style.display="flex"

player.onended=()=>{

markWatched(ep.id)

}

}



function markWatched(id){

if(!watched.includes(id)){

watched.push(id)

localStorage.setItem(
"watched",
JSON.stringify(watched)
)

}

}



document
.getElementById("close-player")
.onclick=()=>{

document
.getElementById("player-modal")
.style.display="none"

const player =
document.getElementById("player")

player.pause()

}


document
.getElementById("search")
.addEventListener("input", e=>{

const q =
e.target.value.toLowerCase()

document
.querySelectorAll(".episode")
.forEach(ep=>{

ep.style.display =
ep.textContent
.toLowerCase()
.includes(q)
?"flex":"none"

})

})
