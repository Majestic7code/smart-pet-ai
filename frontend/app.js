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

async function carregarPet() {
    try {
        const response = await fetch("http://127.0.0.1:8000/pet")
        const data = await response.json()
    
        console.log("Pet recebido com sucesso", data)
        
        if (data && !data.message) {
             pet = {
                vivo: data.vivo ?? true,
                fome: data.fome ?? 100,
                energia: data.energia ?? 100,
                humor: data.humor ?? 100,
                xp: data.xp ?? 0,
                level: data.level ?? 1,
                minutosProdutivos: data.minutosProdutivos ?? 0,
            }
        } else {
            console.log("Nenhum PET salvo no Backend, cirando um novo...")
            await salvarPetNoBackend() // cria pet no backend caso não tenha
        }

        atualizarStatus()

    } catch (error) {
        console.error("Erro ao conectar com o Backend", error)
    }
}
async function salvarPetNoBackend() {
    try {
        const response = await fetch ("http://127.0.0.1:8000/pet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pet)
        })

        const data = await response.json()
        console.log("Resposta do servidor:", data)

    } catch (error) {
        console.error("Erro ao salvar no Backend:", error)
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
    atualizarVisualPet()

}

function alimentar() {
    console.log("Pet vivo?", pet.vivo)
    if (!pet.vivo) return
    pet.fome = Math.min(100, pet.fome + 10)
    atualizarStatus()
    //salvarPet()
    salvarPetNoBackend()
}

function dormir() {
    pet.energia = Math.min(100, pet.energia + 10)
    if (!pet.vivo) return
    atualizarStatus()
    //salvarPet()
    salvarPetNoBackend()
}
let humorProdutivo = 0 // humor interativo 
function brincar() {
    if (pet.minutosProdutivos < 100){  //Verificação para o humor ficar interativo
        humorProdutivo = pet.minutosProdutivos / 4
    } else if (pet.minutosProdutivos >= 100) {
        humorProdutivo = pet.minutosProdutivos/6
    }
    pet.humor = Math.min(100, pet.humor + 3 + Math.round(humorProdutivo))
    if (!pet.vivo) return
    atualizarStatus()
    //salvarPet()
    salvarPetNoBackend()
}

btnAlimentar.addEventListener('click', alimentar)
btnDormir.addEventListener('click',dormir)
btnBrincar.addEventListener('click', brincar)

async function decairStatus() {
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

    try {
        await salvarPetNoBackend()
    } catch (error) {
        console.error("Erro ao sincronizar decaimento")
    }
    
}

function verificarMorte() {
    if (pet.fome === 0 || pet.energia === 0 || pet.humor === 0){
        console.log("💀 SEU PET MORREU! ")
        alert("💀 SEU PET MORREU!!")
        reiniciarPet()
        //pet.vivo = false
    }
}

function reiniciarPet() {
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
    salvarPetNoBackend()
}

const loop = setInterval( async () => { 
    await decairStatus()
    verificarMorte() 
}, 10000)

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
    salvarPetNoBackend()
}

document.addEventListener("DOMContentLoaded", async () => {
    cronometro()
    await carregarPet()
    atualizarStatus()
    atualizarPomodoro()
})