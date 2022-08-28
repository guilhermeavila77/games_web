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
    } while (squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple')
  }


  //assign functions to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39) {
      direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
    } else if (e.keyCode === 38) {
      direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1 // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})