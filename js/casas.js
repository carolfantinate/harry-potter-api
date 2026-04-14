const casas = [
    {
        nome: "Grifinória",
        valor: "Gryffindor",
        descricao: "Coragem, bravura e determinação",
        fundador: "Godric Gryffindor",
        animal: "Leão",
        cores: "Vermelho e Dourado",
        imagem: "../assets/imgs/gryffindor.png",
        classe: "grifinoria"
    },
    {
        nome: "Sonserina",
        valor: "Slytherin",
        descricao: "Ambição, astúcia e liderança",
        fundador: "Salazar Slytherin",
        animal: "Serpente",
        cores: "Verde e Prata",
        imagem: "../assets/imgs/slytherin.png",
        classe: "sonserina"
    },
    {
        nome: "Corvinal",
        valor: "Ravenclaw",
        descricao: "Inteligência e criatividade",
        fundador: "Rowena Ravenclaw",
        animal: "Águia",
        cores: "Azul e Bronze",
        imagem: "../assets/imgs/ravenclaw.png",
        classe: "corvinal"
    },
    {
        nome: "Lufa-Lufa",
        valor: "Hufflepuff",
        descricao: "Lealdade e trabalho duro",
        fundador: "Helga Hufflepuff",
        animal: "Texugo",
        cores: "Amarelo e Preto",
        imagem: "../assets/imgs/hufflepuff.png",
        classe: "lufalufa"
    }
]

const containerCasas = document.getElementById('container-casas')

casas.forEach(casa => {
    const card = document.createElement('div')
    card.classList.add('card-casa', casa.classe)

    card.innerHTML = `
                <div class="card-topo">
                    <img src="${casa.imagem}" class="casa-logo">
                    <h3>${casa.nome}</h3>
                </div>

                <div class="card-info">
                    <p class="descricao">${casa.descricao}</p>

                    <p><strong>Fundador:</strong> ${casa.fundador}</p>
                    <p><strong>Animal:</strong> ${casa.animal}</p>
                    <p><strong>Cores:</strong> ${casa.cores}</p>
                </div>

                <a href="personagens.html?casa=${casa.valor}" class="btn">
                    Ver personagens
                </a>
            `

    containerCasas.appendChild(card)
})