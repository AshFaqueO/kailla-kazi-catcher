const screens = document.querySelectorAll('.screen');
const choose_kailla_btns = document.querySelectorAll('.choose-kailla-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_kailla = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_kailla_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_kailla = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createkailla, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createkailla() {
    const kailla = document.createElement('div')
    kailla.classList.add('kailla')
    const { x, y } = getRandomLocation()
    kailla.style.top = `${y}px`
    kailla.style.left = `${x}px`
    kailla.innerHTML = `<img src="${selected_kailla.src}" alt="${selected_kailla.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    kailla.addEventListener('click', catchkailla)

    game_container.appendChild(kailla)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchkailla() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addkaillas()
}

function addkaillas() {
    setTimeout(createkailla, 1000)
    setTimeout(createkailla, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}
// Background music autoplay fix
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.querySelector("audio");

    document.body.addEventListener("click", () => {
        if (audio && audio.paused) {
            audio.play().catch(error => console.log("Autoplay blocked:", error));
        }
    });
});