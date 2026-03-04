//Área de variáveis
const fomeValor = document.querySelector('#fome-valor')
const energiaValor = document.querySelector('#energia-valor')
const humorValor = document.querySelector('#humor-valor')
const XPvalor = document.querySelector('#xp-valor')
const levelValor = document.querySelector('#level-valor')
const btnAlimentar = document.querySelector('#btn-alimentar')
const btnDormir = document.querySelector('#btn-dormir')
const btnBrincar = document.querySelector('#btn-brincar')
const fomeBarra = document.querySelector('#fome-barra')
const energiaBarra = document.querySelector('#energia-barra')
const humorBarra = document.querySelector('#humor-barra')
const petVisual = document.querySelector('.pet-visual')
//Variaveis do pomodoro
const pomodoroTempo = document.querySelector('#pomodoro-tempo')
const btnIniciar = document.querySelector('#btn-iniciar')
const btnReiniciar = document.querySelector('#btn-reiniciar')
const pomodoroLevel = document.querySelector('#pomodoro-level')

//Objeto - PET
let pet = {
    vivo: true,
    fome: 100,
    energia: 100,
    humor: 100,
    xp: 0,
    level: 1,
    minutosProdutivos: 0,
}

function definirCor(barra, valor) {
    if (valor>60) {
        barra.style.setProperty("--cor-barra", "linear-gradient(90deg,#2ecc71, #27ae60)")
    }
    else if (valor > 30) {
        barra.style.setProperty("--cor-barra", "linear-gradient(90deg, #f1c40f, #f39c12")
    }
    else {
        barra.style.setProperty("--cor-barra","linear-gradient(90deg, #e74c3c, #c0392b)")
    }
}

async function carregarPet() {
    try {
        const response = await fetch("http://127.0.0.1:8000/pet")
        const data = await response.json()
    
        console.log("Pet recebido com sucesso", data)
        
        pet = {
                vivo: data.vivo ?? true,
                fome: data.fome ?? 100,
                energia: data.energia ?? 100,
                humor: data.humor ?? 100,
                xp: data.xp ?? 0,
                level: data.level ?? 1,
                minutosProdutivos: data.minutosProdutivos ?? 0,
            }
        
        atualizarStatus()

    } catch (error) {
        console.error("Erro ao conectar com o Backend", error)
    }
}

//Funções de ações
function atualizarStatus() {
    console.log("PET ATUAL:", pet)
    fomeValor.textContent = pet.fome
    energiaValor.textContent = pet.energia
    humorValor.textContent = pet.humor
    XPvalor.textContent = pet.xp
    levelValor.textContent = pet.level
    pomodoroLevel.textContent = pet.minutosProdutivos

    if (fomeBarra) fomeBarra.value = pet.fome
    if (energiaBarra) energiaBarra.value = pet.energia
    if (humorBarra) humorBarra.value = pet.humor
    
    if (fomeBarra) {
        fomeBarra.value = Number(pet.fome) || 0
        definirCor(fomeBarra, pet.fome)
    }
    if (energiaBarra) {
        energiaBarra.value = Number(pet.energia) || 0
        definirCor(energiaBarra, pet.energia)
    }
    if (humorBarra) {
        humorBarra.value = Number(pet.humor) || 0
        definirCor(humorBarra, pet.humor)
    }
    atualizarVisualPet()

}

async function alimentar() {
    try {
        const response = await fetch("http://127.0.0.1:8000/alimentar", {
            method: "POST"
        })

        const data = await response.json()
        pet = data
        atualizarStatus()

    } catch (error) {
        console.error("Erro ao alimentar:", error)
    }
}

async function dormir() {
    const response = await fetch("http://127.0.0.1:8000/dormir", {
        method: "POST"
    })

    const data = await response.json()
    pet = data
    atualizarStatus()
}

async function brincar() {
    const response = await fetch("http://127.0.0.1:8000/brincar", {
        method: "POST"
    })

    const data = await response.json()
    pet = data
    atualizarStatus()
}

async function trabalhar() {
    try {
        const response = await fetch("http://127.0.0.1:8000/trabalhar", {
            method: "POST"
        })

        const data = await response.json()
        pet = data
        atualizarStatus()

    } catch (error) {
        console.error("Erro ao trabalhar:", error)
    }
}

btnAlimentar.addEventListener('click', alimentar)
btnDormir.addEventListener('click',dormir)
btnBrincar.addEventListener('click', brincar)

/*async function decairStatus() {
    pet.fome = Math.max(0, pet.fome - 5)
    pet.energia = Math.max(0, pet.energia - 8)
    pet.humor = Math.max(0, pet.humor - 7)
    if (pet.fome < 20) {
        console.log("⚠️ PET COM FOME! ")
    }
    if (pet.energia < 25) {
        console.log("😴 PET COM SONO!")
    }
    if (pet.humor < 22) {
        console.log("🫩 PET ENTEDIADO!")
    }

    atualizarStatus()
    
}*/

/*function verificarMorte() {
    if (pet.fome === 0 || pet.energia === 0 || pet.humor === 0){
        console.log("💀 SEU PET MORREU! ")
        alert("💀 SEU PET MORREU!!")
        reiniciarPet()
        //pet.vivo = false
    }
}*/

/*function reiniciarPet() {
    pet = {
        vivo: true,
        fome: 100,
        energia: 100,
        humor: 100,
        xp: 0,
        level: 1,
        minutosProdutivos: 0
    }
    atualizarStatus()
    //salvarPet()
}*/

/*const loop = setInterval( async () => { 
    await decairStatus()
    verificarMorte() 
}, 10000)*/

function atualizarVisualPet() {
    if (!petVisual) return
    if (pet.fome === 0 ||pet.energia === 0 || pet.humor === 0) {
        petVisual.textContent = "💀"
    }
    else if (pet.fome < 15){
        petVisual.textContent = "😵‍💫"
    }
    else if (pet.energia < 40) {
        petVisual.textContent = "🥱"
    }
    else if (pet.humor > 70) {
        petVisual.textContent = "😁"
    }
    else {
        petVisual.textContent = "🙂"
    }
}

/*function salvarPet(){
    const petSalvo = JSON.stringify(pet)
    localStorage.setItem('smartPet', petSalvo)
}*/

function verificarLevelUp() {
    while (pet.xp >= pet.level * 50){
        pet.xp -= pet.level * 50
        pet.level++
        alert("Seu pet evoluiu para o nivel" + pet.level + "!")
    }
}

function ganharXP(valor) {
    pet.xp += valor
    verificarLevelUp()
    atualizarStatus()

}

//POMODORO SETTINGS 
btnIniciar.addEventListener('click',iniciarPausarPomo)
btnReiniciar.addEventListener('click', reiniciarPomo)

let tempoCont = 0
let tempo = null
let contandoPomo = false

function iniciarPausarPomo() {
    contandoPomo ? pausarCrono() : iniciarCrono()
}

function reiniciarPomo() {
    pausarCrono()
    cronometro()
    atualizarPomodoro()
}

function cronometro() { 
    tempoCont = 25 * 60
    tempo = null
}

function atualizarPomodoro() {
    const minutos = Math.floor(tempoCont / 60)
        .toString()
        .padStart(2, "0")
    const segundos = (tempoCont % 60)
        .toString()
        .padStart(2, "0")
    pomodoroTempo.textContent = `${minutos}:${segundos}`
}

function atualizarCronometro() {
    if (tempoCont > 0) {
        tempoCont--
        atualizarPomodoro()
    } else if (tempoCont === 0) {
        pausarCrono()
        pomodoroConcluido()
        atualizarPomodoro()
        reiniciarPomo()
    }
}

function iniciarCrono() {
    contandoPomo = true
    btnIniciar.textContent = 'Pausar'
    tempo = setInterval(atualizarCronometro, 1000)
}

function pausarCrono() {
    contandoPomo = false
    btnIniciar.textContent = 'Iniciar'
    clearInterval(tempo)
}


function pomodoroConcluido() {
    ganharXP(10)
    pet.humor = Math.min(100, pet.humor + 50)
    pet.energia = Math.min(100, pet.energia + 50)
    pet.minutosProdutivos += 25
    alert("Pomodoro concluído! +10 XP")
    atualizarStatus()
    //salvarPet()
}

document.addEventListener("DOMContentLoaded", async () => {
    cronometro()
    await carregarPet()
    atualizarStatus()
    atualizarPomodoro()
})