//Área de variáveis
const fomeValor = document.querySelector('#fome-valor')
const energiaValor = document.querySelector('#energia-valor')
const humorValor = document.querySelector('#humor-valor')
const btnAlimentar = document.querySelector('#btn-alimentar')
const btnDormir = document.querySelector('#btn-dormir')
const btnBrincar = document.querySelector('#btn-brincar')
const fomeBarra = document.querySelector('#fome-barra')
const energiaBarra = document.querySelector('#energia-barra')
const humorBarra = document.querySelector('#humor-barra')
const petVisual = document.querySelector('.pet-visual')
//Objeto - PET
const pet = { 
    fome: 100,
    energia: 100,
    humor: 100,
}
//Funções de ações
function atualizarStatus() {
    fomeValor.textContent = pet.fome
    energiaValor.textContent = pet.energia
    humorValor.textContent = pet.humor

    if (fomeBarra) fomeBarra.value = pet.fome
    if (energiaBarra) energiaBarra.value = pet.energia
    if (humorBarra) humorBarra.value = pet.humor
    atualizarVisualPet()
}
atualizarStatus()

function alimentar() {
    pet.fome = Math.min(100, pet.fome + 10)
    atualizarStatus()
}

function dormir() {
    pet.energia = Math.min(100, pet.energia + 10)
    atualizarStatus()
}

function brincar() {
    pet.humor = Math.min(100, pet.humor + 10)
    atualizarStatus()
}

btnAlimentar.addEventListener('click', alimentar)
btnDormir.addEventListener('click',dormir)
btnBrincar.addEventListener('click', brincar)

function decairStatus() {
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
}

function verificarMorte() {
    if (pet.fome === 0 || pet.energia === 0 || pet.humor === 0){
        console.log("💀 SEU PET MORREU! ")
        clearInterval(loop)
    }
}

const loop = setInterval(() => { 
    decairStatus() 
    verificarMorte() 
}, 2000)

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