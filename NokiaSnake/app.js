document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0
  let appleIndex = 0
  let currentSnake = [2, 1, 0]
  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0


  //Iniciar e/ou reiniciar o jogo
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }


  //Função que lida com os resultados da cobrinha
  function moveOutcomes() {

    //Trata as colisões com as bordas do mapa
    if (
      (currentSnake[0] + width >= (width * width) && direction === width) || //Bater no chão
      (currentSnake[0] % width === width - 1 && direction === 1) || //Parede direita
      (currentSnake[0] % width === 0 && direction === -1) || //Parede esquerda
      (currentSnake[0] - width < 0 && direction === -width) ||  //Bater no teto
      squares[currentSnake[0] + direction].classList.contains('snake') //se colidir
    ) {
      return clearInterval(interval) //Limpa caso aconteça algo a cima
    }

    const tail = currentSnake.pop() //Remove o ultimo item da array
    squares[tail].classList.remove('snake')  //remove o rabo
    currentSnake.unshift(currentSnake[0] + direction) //guia a cabeça

    //Tratamento da cobra pegando a maça
    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }


  //Cria uma nova maça em um lugar aleatorio
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake')) //Impede que as maças nasçam na cobra
    squares[appleIndex].classList.add('apple')
  }


  //atribui a funcionalidade das teclas
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39) {
      direction = 1 //Seta para a direita, faz com que a cobra se mova para a esquerda
    } else if (e.keyCode === 38) {
      direction = -width //Seta para cima, faz a cobra subir
    } else if (e.keyCode === 37) {
      direction = -1 //Seta para a esquerda, faz a cobra ir para a esquerda
    } else if (e.keyCode === 40) {
      direction = +width //Seta para baixo
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})