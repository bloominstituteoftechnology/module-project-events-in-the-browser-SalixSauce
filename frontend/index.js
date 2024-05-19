// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  // let header = document.querySelector('header')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© S A L I X S A U C E ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }
// console.log(keys)
// console.log(footer)
// console.log(currentYear)
// console.log(header)


  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 8; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 8; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        if(!square.classList.contains('targeted')) {
          // getAllSquares().forEach(sq => {
          //   sq.classList.remove('targeted')
          // })
          document.querySelector('.targeted').classList.remove(['targeted'])
          square.classList.add('targeted')
        }
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 8) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // console.log(evt.key)
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    console.log(evt.key)
    let isUp = evt.key === keys.up
    let isDown = evt.key === keys.down
    let isLeft = evt.key === keys.left
    let isRight = evt.key === keys.right
    let isSpacebar = evt.key === keys.space

    let targeted = document.querySelector('.targeted')

    if (isUp) {
      if (targeted.parentElement.previousElementSibling) {
        let idx = Array.from(targeted.parentElement.children).indexOf(targeted);
        targeted.classList.remove('targeted');
        targeted.parentElement.previousElementSibling.children[idx].classList.add('targeted');
      }
    } else if (isDown) {
      if (targeted.parentElement.nextElementSibling) {
        let idx = Array.from(targeted.parentElement.children).indexOf(targeted);
        targeted.classList.remove('targeted');
        targeted.parentElement.nextElementSibling.children[idx].classList.add('targeted');
      }
    } else if (isLeft) {
      if (targeted.previousElementSibling) {
        targeted.classList.remove('targeted');
        targeted.previousElementSibling.classList.add('targeted');
      }
    } else if (isRight) {
      if (targeted.nextElementSibling) {
        targeted.classList.remove('targeted');
        targeted.nextElementSibling.classList.add('targeted');
      }
    } else if (isSpacebar) {
      let mosquito = targeted.firstChild;
      if (mosquito && mosquito.dataset.status === 'alive') {
        mosquito.dataset.status = 'dead';
        mosquito.parentElement.style.backgroundColor = 'red';
      }

      let liveMosquitoes = document.querySelectorAll('[data-status="alive"]');
      if (!liveMosquitoes.length) {
        let elapsed = getTimeElapsed();
        document.querySelector('p.info').textContent = `Extermination completed in ${elapsed / 1000} seconds!`;

        if (!document.querySelector('button#restart')) {
          let restartButton = document.createElement('button');
          restartButton.id = 'restart';
          restartButton.textContent = 'Restart';
          restartButton.addEventListener('click', () => {
            location.reload();
          });
          document.querySelector('h2').insertAdjacentElement('beforeend', restartButton);
          restartButton.focus();
        }
      }
    }
  });
} 

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
