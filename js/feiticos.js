let listaSpells = []

async function carregarSpells() {
    const container = document.getElementById('container-spells')
    container.innerHTML = '<p style="color:white">Carregando...</p>'

    try {
        const resposta = await fetch('https://potterapi-fedeperin.vercel.app/pt/spells')
        listaSpells = await resposta.json()

        mostrarSpells(listaSpells)
    } catch (erro) {
        console.error(erro)
    }
}

function mostrarSpells(spells) {
    const container = document.getElementById('container-spells')
    container.innerHTML = ''

    if (spells.length === 0) {
        container.innerHTML = '<p style="color:white">Nenhum feitiço encontrado.</p>'
        return
    }

    spells.forEach(spell => {
        const card = document.createElement('div')
        card.classList.add('card-spell')

        card.innerHTML = `
                <h3>${spell.spell}</h3>
                <p>${spell.use || "Sem descrição"}</p>
            `

        container.appendChild(card)
    })
}

function aplicarBusca() {
    const termo = document.getElementById('search').value.toLowerCase()

    const filtrados = listaSpells.filter(spell =>
        spell.spell.toLowerCase().includes(termo) ||
        (spell.use && spell.use.toLowerCase().includes(termo))
    )

    mostrarSpells(filtrados)
}

document.addEventListener('DOMContentLoaded', () => {
    carregarSpells()
    document.getElementById('search').addEventListener('input', aplicarBusca)
})

window.onscroll = function () {
    let btn = document.getElementById("btnTopo")
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        btn.style.display = "block"
    } else {
        btn.style.display = "none"
    }
}

function voltarTopo() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

function classificarSpell(spell) {
    const desc = (spell.description || "").toLowerCase()

    if (desc.includes("damage") || desc.includes("attack") || desc.includes("harm")) {
        return "ataque"
    }

    if (desc.includes("protect") || desc.includes("shield") || desc.includes("defense")) {
        return "defesa"
    }

    if (desc.includes("control") || desc.includes("stop") || desc.includes("freeze")) {
        return "controle"
    }

    return "utilidade"
}