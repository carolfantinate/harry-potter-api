const perguntas = [
    {
        pergunta: "Em uma situação difícil, você…",
        respostas: [
            { texto: "Enfrenta de cabeça, mesmo com medo", casa: "A" },
            { texto: "Pensa em um plano antes de agir", casa: "B" },
            { texto: "Analisa tudo e busca a melhor solução possível", casa: "C" },
            { texto: "Procura ajudar todos e manter a harmonia", casa: "D" }
        ]
    },
    {
        pergunta: "O que mais te motiva?",
        respostas: [
            { texto: "Fazer o que é certo", casa: "A" },
            { texto: "Alcançar seus objetivos", casa: "B" },
            { texto: "Aprender coisas novas", casa: "C" },
            { texto: "Construir boas relações", casa: "D" }
        ]
    },
    {
        pergunta: "O que você faria se tivesse a chance de conseguir algo muito importante, mas de forma meio injusta?",
        respostas: [
            { texto: "Não faria — prefiro conquistar do jeito certo", casa: "A" },
            { texto: "Faria, se isso me ajudasse a chegar onde quero", casa: "B" },
            { texto: "Depende da situação — preciso entender tudo antes", casa: "C" },
            { texto: "Não faria — não quero prejudicar ninguém", casa: "D" }
        ]
    },
    {
        pergunta: "Em um trabalho em grupo, você…",
        respostas: [
            { texto: "Assume a liderança naturalmente", casa: "A" },
            { texto: "Organiza estratégias para vencer", casa: "B" },
            { texto: "Dá ideias criativas e analisa tudo", casa: "C" },
            { texto: "Garante que todos participem e se sintam bem", casa: "D" }
        ]
    },
    {
        pergunta: "Qual dessas qualidades você mais valoriza?",
        respostas: [
            { texto: "Bravura", casa: "A" },
            { texto: "Ambição", casa: "B" },
            { texto: "Sabedoria", casa: "C" },
            { texto: "Lealdade", casa: "D" }
        ]
    },
    {
        pergunta: "Se alguém precisa de ajuda, você…",
        respostas: [
            { texto: "Defende a pessoa sem pensar duas vezes", casa: "A" },
            { texto: "Ajuda se fizer sentido na situação", casa: "B" },
            { texto: "Tenta entender o problema antes de agir", casa: "C" },
            { texto: "Ajuda sempre, independente de qualquer coisa", casa: "D" }
        ]
    },
    {
        pergunta: "Qual dessas frases mais combina com você?",
        respostas: [
            { texto: "Prefiro tentar e falhar do que não tentar.", casa: "A" },
            { texto: "O sucesso vem para quem sabe jogar o jogo.", casa: "B" },
            { texto: "Conhecimento é poder.", casa: "C" },
            { texto: "O importante é estar ao lado de quem importa.", casa: "D" }
        ]
    },
    {
        pergunta: "Qual ambiente você prefere?",
        respostas: [
            { texto: "Lugares cheios de ação e desafios", casa: "A" },
            { texto: "Ambientes competitivos e estratégicos", casa: "B" },
            { texto: "Lugares tranquilos para pensar e aprender", casa: "C" },
            { texto: "Ambientes acolhedores e amigáveis", casa: "D" }
        ]
    }
]

let perguntaAtual = 0

let pontuacao = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
}

function atualizarProgresso() {
    const total = perguntas.length
    const atual = perguntaAtual

    const porcentagem = (atual / total) * 100

    document.getElementById('barra').style.width = porcentagem + "%"

    document.getElementById('progresso-texto').innerText =
        `Pergunta ${atual + 1} de ${total}`
}

function mostrarPergunta() {
    atualizarProgresso()

    const p = perguntas[perguntaAtual]

    document.getElementById('pergunta').innerText = p.pergunta

    const respostasDiv = document.getElementById('respostas')
    respostasDiv.innerHTML = ''

    p.respostas.forEach(r => {
        const btn = document.createElement('button')
        btn.innerText = r.texto

        btn.onclick = () => {
            pontuacao[r.casa]++
            proximaPergunta()
        }

        respostasDiv.appendChild(btn)
    })
}

function proximaPergunta() {
    perguntaAtual++

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta()
    } else {
        mostrarResultado()
    }
}

function mostrarResultado() {
    let maior = ""
    let max = 0

    for (let letra in pontuacao) {
        if (pontuacao[letra] > max) {
            max = pontuacao[letra]
            maior = letra
        }
    }

    const nomesEN = {
        grifinoria: "Gryffindor",
        sonserina: "Slytherin",
        corvinal: "Ravenclaw",
        lufalufa: "Hufflepuff"
    }

    const mapaClasse = {
        A: "grifinoria",
        B: "sonserina",
        C: "corvinal",
        D: "lufalufa"
    }

    const classe = mapaClasse[maior]

    // nomes bonitos (PT)
    const nomes = {
        grifinoria: "Grifinória",
        sonserina: "Sonserina",
        corvinal: "Corvinal",
        lufalufa: "Lufa-Lufa"
    }

    // nomes dos arquivos (EN)
    const imagens = {
        grifinoria: "gryffindor.png",
        sonserina: "slytherin.png",
        corvinal: "ravenclaw.png",
        lufalufa: "hufflepuff.png"
    }

    const casaNome = nomes[classe]
    const casaEN = nomesEN[classe]
    const imagem = `../assets/imgs/${imagens[classe]}`

    document.getElementById('quiz').innerHTML = `
                <div class="resultado ${classe}">
                    <h2>Você pertence à casa:</h2>
                    <h1>${casaNome}</h1>

                    <img src="${imagem}">

                    <div class="links-resultado">
                        <a href="casas.html">
                            Conhecer a casa
                        </a>
                        
                        <a href="personagens.html?casa=${encodeURIComponent(casaEN)}">
                            Ver personagens
                        </a>
                    </div>

                    <button class="refazer" onclick="refazerQuiz()">
                        Refazer quiz
                    </button>
                </div>
            `
}

function refazerQuiz() {
    perguntaAtual = 0

    pontuacao = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
    }

    document.getElementById('quiz').innerHTML = `
        <h2>Descubra sua casa</h2>

        <div id="progresso-texto"></div>

        <div class="barra-progresso">
            <div class="barra" id="barra"></div>
        </div>

        <div id="pergunta"></div>
        <div id="respostas"></div>
    `

    mostrarPergunta()
}

document.addEventListener('DOMContentLoaded', mostrarPergunta)