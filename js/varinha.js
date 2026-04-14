const wand = document.getElementById('wand')

// troca imagem quando passa em algo clicável
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button')) {
        wand.classList.add('pointer')
    } else {
        wand.classList.remove('pointer')
    }
})

// movimento da varinha
document.addEventListener('mousemove', (e) => {
    wand.style.left = e.clientX + 'px'
    wand.style.top = e.clientY + 'px'
})

// efeito ao clicar
document.addEventListener('click', (e) => {
    const x = e.clientX
    const y = e.clientY

    // cria várias partículas
    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div')
        spark.classList.add('spark')

        // posição ajustada pra ponta da varinha (mais pra esquerda e um pouco acima)
        const offsetX = -25 + Math.random() * 20
        const offsetY = -25 + Math.random() * 20

        spark.style.left = (x + offsetX) + 'px'
        spark.style.top = (y + offsetY) + 'px'

        // movimento aleatório
        const moveX = (Math.random() - 0.5) * 100
        const moveY = (Math.random() - 0.5) * 100

        spark.style.setProperty('--x', moveX + 'px')
        spark.style.setProperty('--y', moveY + 'px')

        document.body.appendChild(spark)

        setTimeout(() => {
            spark.remove()
        }, 600)
    }
})