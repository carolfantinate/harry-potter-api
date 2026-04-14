let listaPersonagens = []
let casaSelecionada = ''

function pegarCasaDaURL() {
    const params = new URLSearchParams(window.location.search)
    return params.get('casa')
}

async function carregarPersonagens() {
    const containerPersonagens = document.getElementById('container-personagens')
    containerPersonagens.innerHTML = '<p>Carregando...</p>'

    try {
        const resposta = await fetch('https://potterhead-api.vercel.app/api/characters')
        listaPersonagens = await resposta.json()

        aplicarFiltros()
    } catch (error) {
        console.error(error)
    }
}

function mostrarPersonagens(personagens) {
    const containerPersonagens = document.getElementById('container-personagens')
    containerPersonagens.innerHTML = ''

    if (personagens.length === 0) {
        containerPersonagens.innerHTML = '<p>Nenhum personagem encontrado.</p>'
        return
    }

    personagens.forEach(personagem => {
        const card = document.createElement('div')
        card.classList.add('card-personagem')

        card.innerHTML = `
            <img src="${personagem.image || "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square.jpg"}" class="personagem-imagem">
            <h3>${personagem.name}</h3>
            <p><strong>Casa:</strong> ${personagem.house || "Desconhecida"}</p>
            <p><strong>Espécie:</strong> ${personagem.species || "Desconhecida"}</p>
            <p><strong>Gênero:</strong> ${personagem.gender || "Desconhecido"}</p>
            <p><strong>Patrono:</strong> ${personagem.patronus || "Desconhecido"}</p>
        `

        containerPersonagens.appendChild(card)
    })
}

function aplicarFiltros() {
    const termo = document.getElementById('search').value.toLowerCase()

    let resultado = listaPersonagens

    // filtro por nome
    if (termo !== '') {
        resultado = resultado.filter(p =>
            (p.name || "").toLowerCase().includes(termo)
        )
    }

    // filtro por casa 
    if (casaSelecionada !== '') {
        resultado = resultado.filter(p =>
            (p.house || "").toLowerCase().trim() === casaSelecionada.toLowerCase().trim()
        )
    }

    mostrarPersonagens(resultado)
}

function filtrarCasa(casa) {
    casaSelecionada = casa

    document.querySelectorAll('.filtros button').forEach(btn => {
        btn.classList.remove('ativo')
    })

    const botoes = document.querySelectorAll('.filtros button')
    botoes.forEach(btn => {
        if (btn.getAttribute('onclick') === `filtrarCasa('${casa}')`) {
            btn.classList.add('ativo')
        }
    })

    aplicarFiltros()
}

document.addEventListener('DOMContentLoaded', () => {
    const casaURL = pegarCasaDaURL()

    if (casaURL) {
        casaSelecionada = casaURL

        const botoes = document.querySelectorAll('.filtros button')

        botoes.forEach(btn => {
            if (btn.getAttribute('onclick') === `filtrarCasa('${casaURL}')`) {
                btn.classList.add('ativo')
            } else {
                btn.classList.remove('ativo')
            }
        })
    }

    carregarPersonagens()

    document.getElementById('search').addEventListener('input', aplicarFiltros)
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